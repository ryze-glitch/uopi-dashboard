# 🔓 RECUPERA ACCESSO A SUPABASE - GUIDA COMPLETA

## ⚠️ IL PROBLEMA
Il database Supabase è stato creato da Lovable.dev e non hai l'accesso. Devi recuperarlo o crearne uno nuovo.

---

## 🎯 SOLUZIONE 1: RECUPERA L'ACCESSO (SE POSSIBILE)

### Passo 1: Prova ad accedere con l'account Lovable.dev
1. Vai su: https://supabase.com/dashboard
2. Clicca su **"Sign in"**
3. Prova a fare login con:
   - **Google** (se hai usato Google per Lovable.dev)
   - **GitHub** (se hai usato GitHub per Lovable.dev)
   - **Email** (se ricordi l'email usata per Lovable.dev)

### Passo 2: Cerca il progetto
1. Dopo il login, cerca il progetto con ID: `mdalzdfseeqrnnkxnonm`
2. Oppure cerca progetti chiamati "U.O.P.I." o simili
3. Se lo trovi, **perfetto!** Vai alla sezione "CONFIGURA I SECRETS" qui sotto

### Passo 3: Se NON trovi il progetto
→ Vai alla **SOLUZIONE 2** (crea un nuovo progetto)

---

## 🆕 SOLUZIONE 2: CREA UN NUOVO PROGETTO SUPABASE

### Passo 1: Crea un account Supabase
1. Vai su: https://supabase.com/dashboard
2. Clicca su **"Start your project"** o **"Sign up"**
3. Crea un account (puoi usare Google/GitHub/Email)

### Passo 2: Crea un nuovo progetto
1. Clicca su **"New project"**
2. Compila il form:
   - **Name**: `UOPI Dashboard` (o qualsiasi nome)
   - **Database Password**: Scegli una password forte (SALVALA!)
   - **Region**: Scegli la più vicina (es: `West Europe`)
   - **Pricing Plan**: Seleziona **"Free"** (abbastanza per iniziare)
3. Clicca **"Create new project"**
4. **Aspetta 2-3 minuti** mentre Supabase crea il progetto

### Passo 3: Copia le chiavi
1. Quando il progetto è pronto, vai su: **Settings** > **API**
2. Copia questi valori:
   - **Project URL**: `https://xxxxx.supabase.co` ← COPIA QUESTO
   - **anon public key**: `eyJhbGc...` ← COPIA QUESTO
   - **service_role key**: `eyJhbGc...` ← COPIA QUESTO (è segreta!)

### Passo 4: Esegui le migrations
1. Vai su: **SQL Editor** (nel menu laterale)
2. Clicca su **"New query"**
3. Copia e incolla **TUTTE** le migrations dalla cartella `supabase/migrations/`:
   - Inizia con `20251113192829_17d677e2-6962-408d-a6b2-348cdbbc1ec2.sql`
   - Poi `20251113192950_742087dc-9ff0-41f3-a4e4-505686270627.sql`
   - E così via... (in ordine cronologico)
   - **IMPORTANTE**: Esegui anche `20251115000000_insert_authorized_discord_users.sql`
4. Per ogni file: incolla → clicca **"Run"** → aspetta che finisca

### Passo 5: Deploya le Edge Functions
1. Installa Supabase CLI (se non ce l'hai):
   ```bash
   npm install -g supabase
   ```
2. Fai login:
   ```bash
   supabase login
   ```
3. Linka il progetto:
   ```bash
   supabase link --project-ref IL_TUO_PROJECT_ID
   ```
   (Il Project ID è nella URL: `https://IL_TUO_PROJECT_ID.supabase.co`)
4. Deploya le funzioni:
   ```bash
   supabase functions deploy discord-auth
   supabase functions deploy check-subscription
   supabase functions deploy create-checkout
   supabase functions deploy customer-portal
   ```

---

## 🔑 CONFIGURA I SECRETS

### A. GitHub Secrets (per il deploy)
1. Vai su: https://github.com/ryze-glitch/uopi-dashboard/settings/secrets/actions
2. Aggiungi questi 4 secrets:

#### Secret 1: `VITE_SUPABASE_URL`
- **Valore**: Il Project URL (es: `https://xxxxx.supabase.co`)

#### Secret 2: `VITE_SUPABASE_PUBLISHABLE_KEY`
- **Valore**: La chiave "anon public"

#### Secret 3: `VITE_DISCORD_CLIENT_ID`
- **Valore**: `1387801645743869982`

#### Secret 4: `VITE_DISCORD_REDIRECT_URI`
- **Valore**: `https://ryze-glitch.github.io/uopi-dashboard/auth`

### B. Supabase Edge Functions Secrets
1. Vai su: Supabase Dashboard > **Edge Functions** > **Settings** > **Secrets**
2. Aggiungi questi 5 secrets:

#### Secret 1: `DISCORD_CLIENT_ID`
- **Valore**: `1387801645743869982`

#### Secret 2: `DISCORD_CLIENT_SECRET`
- **Come trovarlo**:
  1. Vai su: https://discord.com/developers/applications
  2. Seleziona la tua app
  3. Vai su **OAuth2**
  4. Copia il **Client Secret**

#### Secret 3: `DISCORD_REDIRECT_URI`
- **Valore**: `https://ryze-glitch.github.io/uopi-dashboard/auth`

#### Secret 4: `SUPABASE_URL`
- **Valore**: Il Project URL (es: `https://xxxxx.supabase.co`)

#### Secret 5: `SUPABASE_SERVICE_ROLE_KEY`
- **Valore**: La chiave "service_role" (da Settings > API)

---

## ✅ VERIFICA

Dopo aver configurato tutto:
1. Vai su: https://ryze-glitch.github.io/uopi-dashboard/#/auth
2. Prova a fare login con Discord
3. Se funziona, **perfetto!** 🎉
4. Se vedi ancora errori, controlla i log delle Edge Functions

---

## 🆘 SE HAI PROBLEMI

### Problema: "Non riesco a fare login su Supabase"
→ Crea un nuovo account con un'email diversa

### Problema: "Le migrations falliscono"
→ Eseguile una alla volta e controlla gli errori

### Problema: "Le Edge Functions non si deployano"
→ Assicurati di aver fatto `supabase login` e `supabase link` correttamente

### Problema: "Ancora errore 500"
→ Controlla i log delle Edge Functions su Supabase Dashboard

---

## 💡 NOTA IMPORTANTE

Se crei un nuovo progetto Supabase, devi aggiornare anche il file `supabase/config.toml` con il nuovo Project ID, ma questo non è critico per il funzionamento.

