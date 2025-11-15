# ⚡ SOLUZIONE RAPIDA - ERRORE 500

## 🔴 IL PROBLEMA
L'errore 500 viene dalle **Edge Functions** che non hanno i secrets configurati.

---

## ✅ SOLUZIONE IN 3 PASSI

### PASSO 1: Vai ai Logs delle Edge Functions
1. Apri: https://supabase.com/dashboard
2. Seleziona il progetto: `mdalzdfseeqrnnkxnonm`
3. Vai su: **Edge Functions** > **discord-auth** > **Logs**
4. Cerca l'ultimo errore e leggi il messaggio

**Cosa cercare:**
- Se vedi `Missing Discord credentials` → vai al PASSO 2
- Se vedi `Missing Supabase credentials` → vai al PASSO 2
- Se vedi altro → mandami lo screenshot del log

---

### PASSO 2: Configura i Secrets
1. Vai su: **Edge Functions** > **Settings** > **Secrets**
2. Aggiungi questi 5 secrets (uno alla volta):

#### Secret 1: `DISCORD_CLIENT_ID`
- **Value**: `1387801645743869982`

#### Secret 2: `DISCORD_CLIENT_SECRET`
- **Come trovarlo:**
  1. Vai su: https://discord.com/developers/applications
  2. Seleziona la tua app
  3. Vai su **OAuth2**
  4. Copia il **Client Secret** (se non lo vedi, clicca "Reset Secret")

#### Secret 3: `DISCORD_REDIRECT_URI`
- **Value**: `https://ryze-glitch.github.io/uopi-dashboard/auth`

#### Secret 4: `SUPABASE_URL`
- **Value**: `https://mdalzdfseeqrnnkxnonm.supabase.co`

#### Secret 5: `SUPABASE_SERVICE_ROLE_KEY`
- **Come trovarlo:**
  1. Vai su: **Settings** > **API**
  2. Cerca la chiave **service_role** (è quella segreta, inizia con `eyJhbGc...`)
  3. **⚠️ IMPORTANTE**: Usa quella **service_role**, NON quella anon/public!

---

### PASSO 3: Inserisci gli Utenti Autorizzati
1. Vai su: **SQL Editor**
2. Clicca **New query**
3. Copia tutto il contenuto del file: `supabase/migrations/20251115000000_insert_authorized_discord_users.sql`
4. Incolla e clicca **Run**

---

## 🧪 TEST
Dopo aver fatto tutti i passi:
1. Prova di nuovo il login
2. L'errore 500 dovrebbe sparire
3. Se vedi "Accesso Negato" → significa che il tuo Discord ID non è nella lista (controlla il file SQL)

---

## 🆘 SE NON FUNZIONA ANCORA

1. **Fai uno screenshot dei Logs** delle Edge Functions
2. **Fai uno screenshot della pagina Secrets** (nascondi i valori sensibili)
3. Mandami gli screenshot così posso vedere esattamente cosa manca

---

## 💡 NOTA IMPORTANTE

I secrets delle Edge Functions sono **diversi** dalle variabili d'ambiente di GitHub!
- **GitHub Secrets** → per il build (VITE_SUPABASE_URL, ecc.)
- **Supabase Edge Functions Secrets** → per le funzioni server-side (DISCORD_CLIENT_SECRET, SUPABASE_SERVICE_ROLE_KEY, ecc.)

**Entrambi devono essere configurati!**

