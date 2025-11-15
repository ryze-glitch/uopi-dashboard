import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[DISCORD-AUTH] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Discord auth request started");

    const { code } = await req.json();
    
    // Input validation for Discord authorization code
    if (!code || typeof code !== 'string' || code.length < 20 || code.length > 50) {
      return new Response(
        JSON.stringify({ error: "Richiesta non valida." }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    const clientId = Deno.env.get("DISCORD_CLIENT_ID");
    const clientSecret = Deno.env.get("DISCORD_CLIENT_SECRET");
    // Use PROJECT_URL instead of SUPABASE_URL (Supabase doesn't allow SUPABASE_ prefix)
    const supabaseUrl = Deno.env.get("PROJECT_URL") || Deno.env.get("SUPABASE_URL");
    // Use SERVICE_ROLE_KEY instead of SUPABASE_SERVICE_ROLE_KEY
    const supabaseServiceKey = Deno.env.get("SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    // Use fixed redirect URI to match exactly what's configured in Discord Developer Portal
    // This should be: https://ryze-glitch.github.io/uopi-dashboard/auth
    const redirectUri = Deno.env.get("DISCORD_REDIRECT_URI") || 
      `${req.headers.get("origin") || "https://ryze-glitch.github.io"}/uopi-dashboard/auth`;

    // Check all required environment variables
    if (!clientId || !clientSecret) {
      logStep("Missing Discord credentials", { 
        hasClientId: !!clientId, 
        hasClientSecret: !!clientSecret 
      });
      return new Response(
        JSON.stringify({ 
          error: "Configurazione mancante",
          message: "Le credenziali Discord non sono configurate nelle Edge Functions. Contatta l'amministratore."
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      logStep("Missing Supabase credentials", { 
        hasUrl: !!supabaseUrl, 
        hasServiceKey: !!supabaseServiceKey 
      });
      return new Response(
        JSON.stringify({ 
          error: "Configurazione mancante",
          message: "Le credenziali Supabase non sono configurate nelle Edge Functions. Contatta l'amministratore."
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    logStep("Exchanging code for Discord token");

    // Exchange code for access token
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      logStep("Discord token exchange failed", { 
        status: tokenResponse.status, 
        statusText: tokenResponse.statusText,
        error: errorText,
        redirectUri: redirectUri
      });
      return new Response(
        JSON.stringify({ 
          error: "Errore nell'autenticazione con Discord. Riprova o contatta l'amministratore." 
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    const tokenData = await tokenResponse.json();
    logStep("Token received", { hasToken: !!tokenData.access_token });

    // Get Discord user info
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error("Failed to get Discord user info");
    }

    const discordUser = await userResponse.json();
    const discordTag = `${discordUser.username}`;
    const discordId = discordUser.id;
    logStep("Discord user retrieved", { discordTag, discordId });

    // Create Supabase client with service role to check authorization
    const supabaseClient = createClient(
      supabaseUrl,
      supabaseServiceKey
    );

    // Check if user is authorized by querying user_roles table
    const { data: roleData, error: authCheckError } = await supabaseClient
      .from("user_roles")
      .select("role, user_id")
      .eq("discord_id", discordId)
      .maybeSingle();

    if (authCheckError) {
      logStep("Error checking user authorization", { error: authCheckError.message });
      return new Response(
        JSON.stringify({ error: "Errore durante la verifica dell'autorizzazione." }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    if (!roleData) {
      logStep("Unauthorized user attempted login", { discordTag, discordId });
      return new Response(
        JSON.stringify({ 
          error: "Accesso Negato", 
          message: "Il tuo account Discord non è autorizzato. Contatta l'amministratore per richiedere l'accesso."
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 403,
        }
      );
    }

    logStep("User authorized", { discordTag, role: roleData.role });

    // Get or create user
    const email = discordUser.email || `${discordId}@discord.local`;
    const avatarUrl = discordUser.avatar
      ? `https://cdn.discordapp.com/avatars/${discordId}/${discordUser.avatar}.png`
      : null;

    let authUser;
    let isNewUser = false;

    // Check if user already exists
    if (roleData.user_id) {
      const { data: existingUser, error: getUserError } = await supabaseClient.auth.admin.getUserById(
        roleData.user_id
      );

      if (getUserError) {
        logStep("Error getting existing user", { error: getUserError.message });
      } else if (existingUser.user) {
        authUser = existingUser.user;
        logStep("Found existing user", { userId: authUser.id });
      }
    }

    // If no user found via roleData.user_id, try to find by email
    if (!authUser) {
      const { data: usersList, error: listError } = await supabaseClient.auth.admin.listUsers();
      
      if (!listError && usersList) {
        const existingUserByEmail = usersList.users.find(u => u.email === email);
        if (existingUserByEmail) {
          authUser = existingUserByEmail;
          logStep("Found existing user by email", { userId: authUser.id });
          
          // Link the user_id to the role record if not already linked
          if (!roleData.user_id) {
            const { error: linkError } = await supabaseClient
              .from("user_roles")
              .update({ user_id: authUser.id })
              .eq("discord_id", discordId);

            if (linkError) {
              logStep("Error linking user to role", { error: linkError.message });
            }
          }
        }
      }
    }

    // Create new user only if not found
    if (!authUser) {
      isNewUser = true;
      const { data: newUser, error: createError } = await supabaseClient.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: {
          discord_id: discordId,
          discord_tag: discordTag,
          discord_avatar_url: avatarUrl,
          full_name: discordTag,
        },
      });

      if (createError) {
        logStep("Error creating user", { error: createError.message });
        throw createError;
      }

      authUser = newUser.user;
      logStep("Created new user", { userId: authUser.id });

      // Link the user_id to the role record
      const { error: linkError } = await supabaseClient
        .from("user_roles")
        .update({ user_id: authUser.id })
        .eq("discord_id", discordId);

      if (linkError) {
        logStep("Error linking user to role", { error: linkError.message });
      }
    }

    // Update or create profile
    const { error: profileError } = await supabaseClient
      .from("profiles")
      .upsert({
        id: authUser.id,
        discord_id: discordId,
        discord_tag: discordTag,
        discord_avatar_url: avatarUrl,
        email: email,
        full_name: discordTag,
        updated_at: new Date().toISOString(),
      });

    if (profileError) {
      logStep("Error upserting profile", { error: profileError.message });
    }

    // Update user_roles discord_tag if it changed
    const { error: updateTagError } = await supabaseClient
      .from("user_roles")
      .update({
        discord_tag: discordTag,
      })
      .eq("user_id", authUser.id);

    if (updateTagError) {
      logStep("Error updating user role", { error: updateTagError.message });
    }

    // Generate OTP for instant sign-in
    // Use hash router format for GitHub Pages compatibility
    const origin = req.headers.get("origin") || "https://ryze-glitch.github.io";
    const basePath = "/uopi-dashboard";
    const redirectTo = `${origin}${basePath}/#/dashboard`;
    
    const { data: otpData, error: otpError } = await supabaseClient.auth.admin.generateLink({
      type: 'magiclink',
      email: authUser.email || email,
      options: {
        redirectTo: redirectTo
      }
    });

    if (otpError) {
      logStep("Error generating OTP", { error: otpError.message });
      throw otpError;
    }

    logStep("Auth link generated successfully", { 
      userId: authUser.id,
      isNewUser 
    });

    // Return the instant redirect URL
    return new Response(
      JSON.stringify({
        redirect_url: otpData.properties.action_link,
        user: {
          id: authUser.id,
          email: authUser.email,
          discord_tag: discordTag,
          discord_id: discordId,
          role: roleData.role,
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    logStep("ERROR", { 
      message: errorMessage,
      stack: errorStack,
      type: error?.constructor?.name
    });
    
    // Return more detailed error in development, generic in production
    const isDevelopment = Deno.env.get("ENVIRONMENT") === "development";
    return new Response(
      JSON.stringify({ 
        error: "Si è verificato un errore durante l'autenticazione.",
        ...(isDevelopment && { details: errorMessage, stack: errorStack })
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
