# ✅ NUOVE CHIAVI SUPABASE - AGGIORNA I SECRETS

## 🔑 CHIAVI DEL NUOVO PROGETTO SUPABASE

### Project ID: `jtrysdnbijycermezrrg`

---

## 📋 AGGIORNA I GITHUB SECRETS

Vai su: https://github.com/ryze-glitch/uopi-dashboard/settings/secrets/actions

### Secret 1: `VITE_SUPABASE_URL`
**Valore:**
```
https://jtrysdnbijycermezrrg.supabase.co
```

### Secret 2: `VITE_SUPABASE_PUBLISHABLE_KEY`
**Valore:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0cnlzZG5iaWp5Y2VybWV6cnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMDU5MTcsImV4cCI6MjA3ODc4MTkxN30.kkqTjUb-xaGFlCv_KEB74XDrKMR5OPa99FhLciYrHYc
```

### Secret 3: `VITE_DISCORD_CLIENT_ID`
**Valore:**
```
1387801645743869982
```

### Secret 4: `VITE_DISCORD_REDIRECT_URI`
**Valore:**
```
https://ryze-glitch.github.io/uopi-dashboard/auth
```

---

## 🔧 AGGIORNA I SUPABASE EDGE FUNCTIONS SECRETS

Vai su: Supabase Dashboard > **Edge Functions** > **Settings** > **Secrets**

### Secret 1: `DISCORD_CLIENT_ID`
**Valore:**
```
1387801645743869982
```

### Secret 2: `DISCORD_CLIENT_SECRET`
**Valore:** (trovalo su Discord Developer Portal > OAuth2)

### Secret 3: `DISCORD_REDIRECT_URI`
**Valore:**
```
https://ryze-glitch.github.io/uopi-dashboard/auth
```

### Secret 4: `PROJECT_URL` ⚠️ IMPORTANTE
**Valore:**
```
https://jtrysdnbijycermezrrg.supabase.co
```
**⚠️ NOTA**: Supabase non permette nomi che iniziano con `SUPABASE_`, quindi usa `PROJECT_URL` invece di `SUPABASE_URL`!

### Secret 5: `SERVICE_ROLE_KEY` ⚠️ IMPORTANTE
**Valore:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0cnlzZG5iaWp5Y2VybWV6cnJnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzIwNTkxNywiZXhwIjoyMDc4NzgxOTE3fQ.Er-98vO6bGAVoUbwsWHKrn45GfMFwI4wpiSveIAQBKs
```
**⚠️ NOTA**: Supabase non permette nomi che iniziano con `SUPABASE_`, quindi usa `SERVICE_ROLE_KEY` invece di `SUPABASE_SERVICE_ROLE_KEY`!

---

## 🚀 DOPO AVER AGGIORNATO I SECRETS

1. **Triggera un nuovo deploy:**
   - Vai su: https://github.com/ryze-glitch/uopi-dashboard/actions
   - Clicca su **"Deploy to GitHub Pages"**
   - Clicca su **"Run workflow"** > **"Run workflow"**

2. **Deploya le Edge Functions:**
   ```bash
   npm install -g supabase
   supabase login
   supabase link --project-ref jtrysdnbijycermezrrg
   supabase functions deploy discord-auth
   supabase functions deploy check-subscription
   supabase functions deploy create-checkout
   supabase functions deploy customer-portal
   ```

3. **Aspetta 2-3 minuti** e prova il login!

---

## ✅ VERIFICA

Dopo il deploy, vai su: https://ryze-glitch.github.io/uopi-dashboard/#/auth

Il login dovrebbe funzionare e reindirizzarti automaticamente alla dashboard! 🎉

