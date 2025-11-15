# 🔧 RISOLVI ERRORE 500 DOPO AVER CONFIGURATO I SECRETS

## ⚠️ IL PROBLEMA

Hai configurato tutti i secrets ma l'errore 500 persiste. L'URL nell'errore mostra ancora il vecchio project ID.

---

## 🔍 VERIFICA QUESTE 3 COSE

### 1. ✅ I Secrets delle Edge Functions sono configurati
Hai già fatto questo! Vedo che hai:
- ✅ `DISCORD_CLIENT_ID`
- ✅ `DISCORD_CLIENT_SECRET`
- ✅ `DISCORD_REDIRECT_URI`
- ✅ `PROJECT_URL`
- ✅ `SERVICE_ROLE_KEY`

### 2. ❌ I GitHub Secrets DEVONO essere aggiornati
Il frontend sta ancora usando il vecchio URL! Devi aggiornare i GitHub Secrets.

**Vai su:** https://github.com/ryze-glitch/uopi-dashboard/settings/secrets/actions

**Aggiorna questi 2 secrets:**

#### Secret 1: `VITE_SUPABASE_URL`
- **Valore VECCHIO**: `https://mdalzdfseeqrnnkxnonm.supabase.co` ❌
- **Valore NUOVO**: `https://jtrysdnbijycermezrrg.supabase.co` ✅

#### Secret 2: `VITE_SUPABASE_PUBLISHABLE_KEY`
- **Valore VECCHIO**: (la vecchia anon key) ❌
- **Valore NUOVO**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0cnlzZG5iaWp5Y2VybWV6cnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMDU5MTcsImV4cCI6MjA3ODc4MTkxN30.kkqTjUb-xaGFlCv_KEB74XDrKMR5OPa99FhLciYrHYc` ✅

**Come aggiornare:**
1. Clicca sul secret esistente
2. Clicca su **"Update"** o **"Edit"**
3. Sostituisci il valore vecchio con quello nuovo
4. Clicca **"Update secret"**

### 3. ❌ Le Edge Functions DEVONO essere deployate sul nuovo progetto
Le Edge Functions potrebbero non essere deployate sul nuovo progetto Supabase.

**Deploya le Edge Functions:**
```bash
npm install -g supabase
supabase login
supabase link --project-ref jtrysdnbijycermezrrg
supabase functions deploy discord-auth
supabase functions deploy check-subscription
supabase functions deploy create-checkout
supabase functions deploy customer-portal
```

---

## 🚀 DOPO AVER FATTO TUTTO

### 1. Triggera un nuovo deploy di GitHub Pages
1. Vai su: https://github.com/ryze-glitch/uopi-dashboard/actions
2. Clicca su **"Deploy to GitHub Pages"**
3. Clicca su **"Run workflow"** > **"Run workflow"**
4. Aspetta 2-3 minuti

### 2. Verifica i log delle Edge Functions
1. Vai su: Supabase Dashboard > Edge Functions > discord-auth > Logs
2. Cerca l'ultimo errore
3. Leggi il messaggio per capire cosa manca

---

## 🆘 SE ANCORA NON FUNZIONA

### Controlla i log delle Edge Functions
1. Vai su: Supabase Dashboard > Edge Functions > discord-auth
2. Clicca su **"Logs"**
3. Cerca l'ultimo errore (quello più recente)
4. Leggi il messaggio - ti dirà esattamente cosa manca

**Errori comuni:**
- `Missing Discord credentials` → Verifica che `DISCORD_CLIENT_ID` e `DISCORD_CLIENT_SECRET` siano corretti
- `Missing Supabase credentials` → Verifica che `PROJECT_URL` e `SERVICE_ROLE_KEY` siano corretti
- `Error checking user authorization` → La tabella `user_roles` potrebbe non esistere (esegui `SETUP_COMPLETO_DATABASE.sql`)

### Verifica che il DISCORD_CLIENT_SECRET sia aggiornato
Assicurati che il secret `DISCORD_CLIENT_SECRET` su Supabase corrisponda a quello su Discord Developer Portal:
- **Valore attuale**: `3bVYtMbyCn2Ob7C44ALBfJqtxzpkk3HV`

---

## ✅ CHECKLIST FINALE

Prima di riprovare, verifica:
- [ ] GitHub Secrets aggiornati con il nuovo URL (`jtrysdnbijycermezrrg`)
- [ ] Edge Functions deployate sul nuovo progetto
- [ ] Tutti i 5 secrets delle Edge Functions configurati
- [ ] `DISCORD_CLIENT_SECRET` corrisponde a quello su Discord (`3bVYtMbyCn2Ob7C44ALBfJqtxzpkk3HV`)
- [ ] Database configurato (eseguito `SETUP_COMPLETO_DATABASE.sql`)

---

## 💡 NOTA IMPORTANTE

Il problema principale è che il **frontend sta ancora usando il vecchio URL di Supabase**. Devi aggiornare i **GitHub Secrets** per far funzionare il deploy!

