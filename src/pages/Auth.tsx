import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import uopiLogo from "@/assets/uopi-logo.png";
const Auth = () => {
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const {
    toast
  } = useToast();
  const [searchParams] = useSearchParams();
  const redirectHandled = useRef(false);
  
  useEffect(() => {
    // Immediate redirect if user is logged in
    if (user && !redirectHandled.current) {
      console.log("User detected, redirecting to dashboard");
      redirectHandled.current = true;
      sessionStorage.removeItem('discord_auth_pending');
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);
  
  // Check on mount if we're returning from Discord auth
  useEffect(() => {
    const isPending = sessionStorage.getItem('discord_auth_pending');
    if (isPending && !user) {
      console.log("Pending Discord auth detected, checking session...");
      // Check session immediately
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user && !redirectHandled.current) {
          console.log("Session found after Discord auth, redirecting");
          redirectHandled.current = true;
          sessionStorage.removeItem('discord_auth_pending');
          navigate('/dashboard', { replace: true });
        }
      });
    }
  }, [user, navigate]);
  
  // Set up auth state listener to catch authentication after magic link
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        if (event === 'SIGNED_IN' && session?.user && !redirectHandled.current) {
          console.log("User signed in, redirecting to dashboard");
          redirectHandled.current = true;
          // Small delay to ensure state is fully updated
          setTimeout(() => {
            navigate('/dashboard', { replace: true });
          }, 100);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);
  
  // Additional check: continuously monitor auth state as fallback
  useEffect(() => {
    if (redirectHandled.current) return;
    
    const checkAuthInterval = setInterval(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user && !redirectHandled.current) {
          console.log("Fallback: User authenticated, redirecting");
          redirectHandled.current = true;
          clearInterval(checkAuthInterval);
          navigate('/dashboard', { replace: true });
        }
      });
    }, 1000);
    
    // Stop checking after 30 seconds
    setTimeout(() => {
      clearInterval(checkAuthInterval);
    }, 30000);
    
    return () => {
      clearInterval(checkAuthInterval);
    };
  }, [navigate]);
  
  useEffect(() => {
    // Handle Discord OAuth callback - Discord redirects to /auth?code=... (no hash)
    const code = searchParams.get("code");
    if (code && !user && !redirectHandled.current) {
      // Clear the URL and convert to hash router format
      const basePath = window.location.pathname.split('/').slice(0, -1).join('/') || '';
      const hashUrl = `${basePath}/#/auth`;
      window.history.replaceState({}, document.title, hashUrl);
      // Execute callback
      handleDiscordCallback(code);
    }
    
    // Also check if we're returning from a magic link redirect
    // Supabase magic links might redirect here with hash fragments containing tokens
    const hash = window.location.hash;
    const hasAuthToken = hash && (
      hash.includes('access_token') || 
      hash.includes('type=recovery') || 
      hash.includes('#access_token=') ||
      hash.includes('type=magiclink') ||
      hash.includes('token=')
    );
    
    if (hasAuthToken && !user && !redirectHandled.current) {
      console.log("Detected magic link hash:", hash.substring(0, 50) + "...");
      // Force Supabase to process the hash by triggering a page reload simulation
      // or wait for it to process automatically
      let attempts = 0;
      const maxAttempts = 40; // 20 seconds
      
      const checkAuth = setInterval(() => {
        attempts++;
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session?.user && !redirectHandled.current) {
            console.log("Magic link authentication successful, navigating to dashboard");
            clearInterval(checkAuth);
            redirectHandled.current = true;
            // Clear the hash and navigate
            const baseUrl = window.location.href.split('#')[0];
            window.history.replaceState({}, document.title, baseUrl + '#/auth');
            // Small delay to ensure state is updated
            setTimeout(() => {
              navigate('/dashboard', { replace: true });
            }, 200);
          } else if (attempts >= maxAttempts) {
            console.log("Timeout waiting for magic link authentication. Current hash:", hash);
            clearInterval(checkAuth);
            // Try one last time after a longer delay
            setTimeout(() => {
              supabase.auth.getSession().then(({ data: { session } }) => {
                if (session?.user && !redirectHandled.current) {
                  redirectHandled.current = true;
                  navigate('/dashboard', { replace: true });
                } else {
                  toast({
                    title: "Errore",
                    description: "Impossibile completare l'autenticazione. Riprova.",
                    variant: "destructive"
                  });
                }
              });
            }, 2000);
          }
        });
      }, 500);
      
      return () => clearInterval(checkAuth);
    }
  }, [searchParams, user, navigate]);
  const handleDiscordLogin = () => {
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
    if (!clientId) {
      toast({
        title: "Configurazione mancante",
        description: "Discord Client ID non configurato. Contatta l'amministratore.",
        variant: "destructive"
      });
      return;
    }
    // Use hash router compatible URL for GitHub Pages
    // Discord OAuth doesn't support hash fragments, so we use the path and handle it in the callback
    // IMPORTANT: This must match EXACTLY the redirect URI configured in Discord Developer Portal
    // For GitHub Pages with subdirectory, use the full path
    const redirectUri = import.meta.env.VITE_DISCORD_REDIRECT_URI || 
      "https://ryze-glitch.github.io/uopi-dashboard/auth";
    
    // Ensure exact match - no trailing slash, no spaces, exact casing
    const cleanRedirectUri = redirectUri.trim().replace(/\/+$/, '');
    
    const scope = "identify email";
    const encodedRedirectUri = encodeURIComponent(cleanRedirectUri);
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodedRedirectUri}&response_type=code&scope=${encodeURIComponent(scope)}`;
    
    window.location.href = discordAuthUrl;
  };
  const handleDiscordCallback = async (code: string, retryCount = 0) => {
    const maxRetries = 3;
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke("discord-auth", {
        body: {
          code
        }
      });
      if (error) {
        console.error("Discord auth error:", error);
        // Retry on network errors (might be blocked by adblocker)
        if (retryCount < maxRetries && (
          error.message?.includes('Failed to fetch') ||
          error.message?.includes('network') ||
          error.message?.includes('ERR_BLOCKED')
        )) {
          console.log(`Retrying Discord auth (attempt ${retryCount + 1}/${maxRetries})...`);
          await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
          return handleDiscordCallback(code, retryCount + 1);
        }
        throw error;
      }
      if (data.error) {
        toast({
          title: data.error === "Accesso Negato" ? "Accesso Negato" : "Errore di autenticazione",
          description: data.message || data.error,
          variant: "destructive",
        });
        navigate("/auth", { replace: true });
        return;
      }

      // Use the magic link for instant authentication
      if (data.redirect_url) {
        console.log("Following magic link:", data.redirect_url.substring(0, 100) + "...");
        // Store a flag in sessionStorage to indicate we're expecting auth
        sessionStorage.setItem('discord_auth_pending', 'true');
        // The magic link will authenticate the user and redirect
        // When the page reloads after the magic link, the useEffect hooks will detect
        // the authenticated user and navigate to dashboard
        // Just follow the link - Supabase will handle authentication
        window.location.href = data.redirect_url;
      } else {
        // No redirect URL, wait for auth state update and navigate
        let attempts = 0;
        const maxAttempts = 20; // 10 seconds max
        
        const checkAuth = setInterval(() => {
          attempts++;
          supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user && !redirectHandled.current) {
              clearInterval(checkAuth);
              redirectHandled.current = true;
              navigate('/dashboard', { replace: true });
            } else if (attempts >= maxAttempts) {
              clearInterval(checkAuth);
              toast({
                title: "Errore",
                description: "Impossibile completare l'autenticazione. Riprova.",
                variant: "destructive"
              });
            }
          });
        }, 500);
      }
    } catch (error: any) {
      console.error("Discord callback error:", error);
      // Check if it's a network error that might be caused by adblocker
      const isNetworkError = error?.message?.includes('Failed to fetch') ||
        error?.message?.includes('network') ||
        error?.message?.includes('ERR_BLOCKED') ||
        error?.message?.includes('blocked');
      
      if (isNetworkError) {
        toast({
          title: "Errore di connessione",
          description: "Impossibile connettersi al server. Verifica la connessione internet o disabilita temporaneamente l'adblocker se attivo.",
          variant: "destructive",
          duration: 5000
        });
      } else {
        toast({
          title: "Errore durante l'accesso",
          description: "Si è verificato un errore durante l'autenticazione con Discord",
          variant: "destructive"
        });
      }
    }
  };
  return <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-background via-card to-background">
      {/* Animated background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8 space-y-6">
          <img src={uopiLogo} alt="U.O.P.I. Logo" className="w-32 h-32 mx-auto mb-4 object-contain drop-shadow-2xl" />
          <h1 className="text-5xl font-lexend font-bold text-foreground tracking-wide">
            U.O.P.I. DASHBOARD
          </h1>
          
        </div>

        <div className="glass-strong rounded-2xl p-8 space-y-6 shadow-2xl">
          <Button onClick={handleDiscordLogin} size="lg" className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-6 text-lg">
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            Accedi con Discord
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>🔐 Accesso sicuro riservato ai membri autorizzati</p>
          </div>
        </div>
      </div>
    </div>;
};
export default Auth;