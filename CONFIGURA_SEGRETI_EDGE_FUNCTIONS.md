# 🔧 CONFIGURA I SECRETS DELLE EDGE FUNCTIONS - GUIDA SEMPLICE

## ⚠️ IL PROBLEMA

L'errore 500 viene dalle **Edge Functions** che non hanno i secrets configurati. Devi configurarli su Supabase.

---

## 📍 PASSI DA SEGUIRE (SUPER SEMPLICE)

### 1. Vai su Supabase Dashboard
- Apri: https://supabase.com/dashboard
- **Accedi** con il tuo account
- Seleziona il progetto: `mdalzdfseeqrnnkxnonm` (o cerca "U.O.P.I.")

### 2. Vai alle Edge Functions
- Nel menu laterale sinistro, cerca **"Edge Functions"**
- Clicca su **"Edge Functions"**

### 3. Vai alle impostazioni
- Clicca su **"Settings"** (⚙️) in alto a destra o nel menu
- Clicca su **"Secrets"** (o "Environment variables")

### 4. Aggiungi i secrets (uno alla volta)

Clicca su **"Add new secret"** e aggiungi questi 5 secrets:

#### Secret 1:
- **Name**: `DISCORD_CLIENT_ID`
- **Value**: `1387801645743869982`
- Clicca **"Add"**

#### Secret 2:
- **Name**: `DISCORD_CLIENT_SECRET`
- **Value**: (devi trovarlo su Discord Developer Portal)
  - Vai su: https://discord.com/developers/applications
  - Seleziona la tua app
  - Vai su **"OAuth2"**
  - Copia il **"Client Secret"** (clicca "Reset Secret" se non lo vedi)
- Clicca **"Add"**

#### Secret 3:
- **Name**: `DISCORD_REDIRECT_URI`
- **Value**: `https://ryze-glitch.github.io/uopi-dashboard/auth`
- Clicca **"Add"**

#### Secret 4:
- **Name**: `SUPABASE_URL`
- **Value**: `https://mdalzdfseeqrnnkxnonm.supabase.co`
- Clicca **"Add"**

#### Secret 5:
- **Name**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: (devi trovarlo su Supabase)
  - Vai su: **Settings** > **API**
  - Cerca **"service_role"** key (è segreta, inizia con `eyJhbGc...`)
  - **⚠️ ATTENZIONE**: Usa la chiave **service_role**, NON quella anon/public!
- Clicca **"Add"**

---

## ✅ VERIFICA

Dopo aver aggiunto tutti i secrets, prova di nuovo il login. L'errore 500 dovrebbe sparire.

---

## 🆘 SE NON TROVI IL CLIENT SECRET DI DISCORD

1. Vai su: https://discord.com/developers/applications
2. Seleziona la tua app (quella con Client ID: `1387801645743869982`)
3. Vai su **"OAuth2"**
4. Se non vedi il Client Secret, clicca su **"Reset Secret"**
5. **⚠️ IMPORTANTE**: Dopo aver resettato, devi aggiornare anche il secret nelle Edge Functions!

---

## 🆘 SE NON TROVI IL SERVICE_ROLE_KEY

1. Vai su: Supabase Dashboard > **Settings** > **API**
2. Cerca la sezione **"Project API keys"**
3. Trova la chiave **"service_role"** (è quella segreta)
4. Copiala e incollala nel secret

---

## 📝 NOTA

Dopo aver aggiunto i secrets, le Edge Functions si aggiornano automaticamente. Non serve riavviare nulla!

