# ⚡ SOLUZIONE RAPIDA - CREA NUOVO SUPABASE IN 5 MINUTI

## 🎯 SE NON HAI ACCESSO AL VECCHIO SUPABASE

### Passo 1: Crea nuovo progetto (2 minuti)
1. Vai su: https://supabase.com/dashboard
2. Clicca **"New project"**
3. Compila:
   - Name: `UOPI Dashboard`
   - Password: (scegli una password forte)
   - Region: `West Europe`
   - Plan: **Free**
4. Clicca **"Create new project"**
5. **Aspetta 2-3 minuti**

### Passo 2: Copia le chiavi (30 secondi)
1. Vai su: **Settings** > **API**
2. Copia:
   - **Project URL** (es: `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key

### Passo 3: Esegui le migrations (2 minuti)
1. Vai su: **SQL Editor**
2. Apri il file: `supabase/migrations/20251115000000_insert_authorized_discord_users.sql`
3. Copia tutto il contenuto
4. Incolla in SQL Editor
5. Clicca **"Run"**

**NOTA**: Le altre migrations sono già state eseguite automaticamente da Lovable, ma se vuoi essere sicuro, puoi eseguirle tutte in ordine.

### Passo 4: Configura i secrets (2 minuti)

#### A. GitHub Secrets:
Vai su: https://github.com/ryze-glitch/uopi-dashboard/settings/secrets/actions

Aggiungi:
- `VITE_SUPABASE_URL` = (il nuovo Project URL)
- `VITE_SUPABASE_PUBLISHABLE_KEY` = (la nuova anon public key)
- `VITE_DISCORD_CLIENT_ID` = `1387801645743869982`
- `VITE_DISCORD_REDIRECT_URI` = `https://ryze-glitch.github.io/uopi-dashboard/auth`

#### B. Supabase Edge Functions Secrets:
Vai su: Supabase Dashboard > **Edge Functions** > **Settings** > **Secrets**

Aggiungi:
- `DISCORD_CLIENT_ID` = `1387801645743869982`
- `DISCORD_CLIENT_SECRET` = (da Discord Developer Portal)
- `DISCORD_REDIRECT_URI` = `https://ryze-glitch.github.io/uopi-dashboard/auth`
- `SUPABASE_URL` = (il nuovo Project URL)
- `SUPABASE_SERVICE_ROLE_KEY` = (la nuova service_role key)

### Passo 5: Deploya le Edge Functions (1 minuto)
Apri il terminale e esegui:
```bash
npm install -g supabase
supabase login
supabase link --project-ref IL_TUO_NUOVO_PROJECT_ID
supabase functions deploy discord-auth
supabase functions deploy check-subscription
supabase functions deploy create-checkout
supabase functions deploy customer-portal
```

### Passo 6: Triggera nuovo deploy (30 secondi)
1. Vai su: https://github.com/ryze-glitch/uopi-dashboard/actions
2. Clicca **"Run workflow"** > **"Run workflow"**
3. Aspetta 2-3 minuti

---

## ✅ FATTO!

Ora prova il login su: https://ryze-glitch.github.io/uopi-dashboard/#/auth

---

## 🆘 SE NON FUNZIONA

Controlla i log:
- Supabase Dashboard > Edge Functions > discord-auth > Logs
- GitHub Actions > ultimo workflow > build job

