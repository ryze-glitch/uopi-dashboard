# ✅ CHIAVI SUPABASE TROVATE!

Ho trovato tutte le chiavi nel file `.env`! Ecco cosa devi fare:

## 🔑 CHIAVI TROVATE:

### 1. VITE_SUPABASE_URL
```
https://mdalzdfseeqrnnkxnonm.supabase.co
```

### 2. VITE_SUPABASE_PUBLISHABLE_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kYWx6ZGZzZWVxcm5ua3hub25tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDU1MjEsImV4cCI6MjA3ODYyMTUyMX0.1Iqqak_PGV8yTck8GjUtwyJuGNhf7GVK18QUCmgEcwM
```

### 3. VITE_DISCORD_CLIENT_ID
```
1387801645743869982
```

---

## 🚀 COSA FARE ORA:

### Passo 1: Vai ai GitHub Secrets
Apri: https://github.com/ryze-glitch/uopi-dashboard/settings/secrets/actions

### Passo 2: Aggiungi i 4 secrets (uno alla volta)

#### Secret 1:
- **Nome**: `VITE_SUPABASE_URL`
- **Valore**: `https://mdalzdfseeqrnnkxnonm.supabase.co`
- Clicca "Add secret"

#### Secret 2:
- **Nome**: `VITE_SUPABASE_PUBLISHABLE_KEY`
- **Valore**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kYWx6ZGZzZWVxcm5ua3hub25tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDU1MjEsImV4cCI6MjA3ODYyMTUyMX0.1Iqqak_PGV8yTck8GjUtwyJuGNhf7GVK18QUCmgEcwM`
- Clicca "Add secret"

#### Secret 3:
- **Nome**: `VITE_DISCORD_CLIENT_ID`
- **Valore**: `1387801645743869982`
- Clicca "Add secret"

#### Secret 4:
- **Nome**: `VITE_DISCORD_REDIRECT_URI`
- **Valore**: `https://ryze-glitch.github.io/uopi-dashboard/auth`
- Clicca "Add secret"

### Passo 3: Triggera il deploy
1. Vai su: https://github.com/ryze-glitch/uopi-dashboard/actions
2. Clicca su **"Deploy to GitHub Pages"**
3. Clicca su **"Run workflow"** > **"Run workflow"**

### Passo 4: Attendi 2-3 minuti
Il deploy si completerà automaticamente.

### Passo 5: Testa!
Vai su: https://ryze-glitch.github.io/uopi-dashboard/#/auth

---

## ⚠️ IMPORTANTE:

Il file `.env` contiene le chiavi ma **NON viene committato su GitHub** (è nel .gitignore per sicurezza).

Le chiavi devono essere aggiunte come **GitHub Secrets** per far funzionare il deploy su GitHub Pages.

---

## ✅ DOPO IL DEPLOY:

Apri la console del browser (F12) e dovresti vedere:
```
VITE_SUPABASE_URL: ✅ Set
VITE_SUPABASE_PUBLISHABLE_KEY: ✅ Set
```

Invece di:
```
VITE_SUPABASE_URL: ❌ Missing
VITE_SUPABASE_PUBLISHABLE_KEY: ❌ Missing
```

