# 🔧 CONFIGURA EDGE FUNCTIONS SECRETS - PASSO PASSO

## ⚠️ ERRORE 500 = SECRETS MANCANTI

L'errore 500 significa che le Edge Functions non hanno i secrets configurati.

---

## 📍 PASSI DA SEGUIRE (SUPER SEMPLICE)

### PASSO 1: Vai su Supabase Dashboard
1. Apri: https://supabase.com/dashboard
2. **Accedi** con il tuo account
3. Seleziona il progetto: `jtrysdnbijycermezrrg` (o cerca "UOPI Dashboard")

### PASSO 2: Vai alle Edge Functions
1. Nel menu laterale sinistro, cerca **"Edge Functions"**
2. Clicca su **"Edge Functions"**

### PASSO 3: Vai alle impostazioni
1. In alto a destra, cerca il pulsante **"Settings"** (⚙️) o **"Project Settings"**
2. Clicca su **"Settings"**
3. Nel menu laterale delle impostazioni, cerca **"Secrets"** o **"Environment variables"**
4. Clicca su **"Secrets"**

### PASSO 4: Aggiungi i secrets (uno alla volta)

Clicca su **"Add new secret"** o **"New secret"** e aggiungi questi 5 secrets:

---

#### 🔑 SECRET 1: `DISCORD_CLIENT_ID`
1. Clicca **"Add new secret"**
2. **Name**: `DISCORD_CLIENT_ID`
3. **Value**: `1387801645743869982`
4. Clicca **"Add"** o **"Save"**

---

#### 🔑 SECRET 2: `DISCORD_CLIENT_SECRET`
1. Clicca **"Add new secret"**
2. **Name**: `DISCORD_CLIENT_SECRET`
3. **Value**: (devi trovarlo su Discord Developer Portal)
   - Vai su: https://discord.com/developers/applications
   - Seleziona la tua app (quella con Client ID: `1387801645743869982`)
   - Vai su **"OAuth2"** nel menu laterale
   - Cerca **"Client Secret"**
   - Se non lo vedi, clicca su **"Reset Secret"** (⚠️ ATTENZIONE: questo resetta il secret!)
   - Copia il **Client Secret** (è una stringa lunga)
4. Incolla il valore nel campo **Value**
5. Clicca **"Add"** o **"Save"**

---

#### 🔑 SECRET 3: `DISCORD_REDIRECT_URI`
1. Clicca **"Add new secret"**
2. **Name**: `DISCORD_REDIRECT_URI`
3. **Value**: `https://ryze-glitch.github.io/uopi-dashboard/auth`
4. Clicca **"Add"** o **"Save"**

---

#### 🔑 SECRET 4: `PROJECT_URL` ⚠️ IMPORTANTE
1. Clicca **"Add new secret"**
2. **Name**: `PROJECT_URL` (⚠️ NON usare `SUPABASE_URL` - Supabase non lo permette!)
3. **Value**: `https://jtrysdnbijycermezrrg.supabase.co`
4. Clicca **"Add"** o **"Save"**

---

#### 🔑 SECRET 5: `SERVICE_ROLE_KEY` ⚠️ IMPORTANTE
1. Clicca **"Add new secret"**
2. **Name**: `SERVICE_ROLE_KEY` (⚠️ NON usare `SUPABASE_SERVICE_ROLE_KEY` - Supabase non lo permette!)
3. **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0cnlzZG5iaWp5Y2VybWV6cnJnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzIwNTkxNywiZXhwIjoyMDc4NzgxOTE3fQ.Er-98vO6bGAVoUbwsWHKrn45GfMFwI4wpiSveIAQBKs`
4. Clicca **"Add"** o **"Save"**

---

## ✅ VERIFICA

Dopo aver aggiunto tutti i 5 secrets, dovresti vedere una lista con:
- ✅ `DISCORD_CLIENT_ID`
- ✅ `DISCORD_CLIENT_SECRET`
- ✅ `DISCORD_REDIRECT_URI`
- ✅ `PROJECT_URL` (⚠️ NON `SUPABASE_URL`)
- ✅ `SERVICE_ROLE_KEY` (⚠️ NON `SUPABASE_SERVICE_ROLE_KEY`)

---

## 🧪 TEST

1. Vai su: https://ryze-glitch.github.io/uopi-dashboard/#/auth
2. Clicca su **"Accedi con Discord"**
3. Autorizza l'applicazione
4. **Dovrebbe funzionare!** 🎉

Se vedi ancora l'errore 500:
- Controlla che tutti i 5 secrets siano presenti
- Verifica che i valori siano corretti (senza spazi extra)
- Aspetta 10-20 secondi e riprova (i secrets potrebbero impiegare qualche secondo per essere applicati)

---

## 🆘 SE NON TROVI LA SEZIONE "SECRETS"

1. Assicurati di essere nella pagina **"Edge Functions"**
2. Cerca un pulsante **"Settings"** o **"⚙️"** in alto a destra
3. Oppure cerca **"Environment variables"** o **"Secrets"** nel menu laterale
4. Se non la trovi, prova a cercare nella pagina principale del progetto: **Settings** > **API** > (cerca una sezione per Edge Functions)

---

## 💡 NOTA IMPORTANTE

I secrets delle Edge Functions sono **diversi** dai GitHub Secrets!
- **GitHub Secrets** → per il build del frontend
- **Supabase Edge Functions Secrets** → per le funzioni server-side

**Entrambi devono essere configurati!**

