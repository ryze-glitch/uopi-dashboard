# 🚀 Guida alla Configurazione - U.O.P.I. Dashboard

Questa guida ti aiuterà a configurare tutte le variabili d'ambiente necessarie per far funzionare l'applicazione.

## 📋 Indice

1. [Configurazione Locale](#configurazione-locale)
2. [Configurazione GitHub Pages](#configurazione-github-pages)
3. [Configurazione Supabase Edge Functions](#configurazione-supabase-edge-functions)
4. [Configurazione Discord OAuth](#configurazione-discord-oauth)

---

## 🏠 Configurazione Locale

### Passo 1: Crea il file `.env`

```bash
cp .env.example .env
```

### Passo 2: Compila le variabili nel file `.env`

Apri il file `.env` e compila tutti i valori:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-public-key-here
VITE_DISCORD_CLIENT_ID=your-discord-client-id-here
VITE_DISCORD_REDIRECT_URI=http://localhost:8080/auth
```

### Passo 3: Avvia il server di sviluppo

```bash
npm install
npm run dev
```

---

## 🌐 Configurazione GitHub Pages

Per far funzionare l'applicazione su GitHub Pages, devi configurare i **GitHub Secrets**.

### Passo 1: Vai alle impostazioni del repository

1. Vai su: `https://github.com/ryze-glitch/uopi-dashboard/settings/secrets/actions`
2. Clicca su **"New repository secret"**

### Passo 2: Aggiungi questi secrets

Aggiungi **uno per uno** questi secrets:

| Nome Secret | Valore | Dove trovarlo |
|------------|--------|---------------|
| `VITE_SUPABASE_URL` | `https://your-project.supabase.co` | Supabase Dashboard > Settings > API |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `eyJhbGc...` (anon/public key) | Supabase Dashboard > Settings > API |
| `VITE_DISCORD_CLIENT_ID` | `1234567890` | Discord Developer Portal > OAuth2 |
| `VITE_DISCORD_REDIRECT_URI` | `https://ryze-glitch.github.io/uopi-dashboard/auth` | URL fisso per GitHub Pages |

### Passo 3: Triggera un nuovo deploy

Dopo aver aggiunto i secrets:

1. Vai su: `https://github.com/ryze-glitch/uopi-dashboard/actions`
2. Clicca su **"Deploy to GitHub Pages"**
3. Clicca su **"Run workflow"** > **"Run workflow"**

Oppure fai un commit qualsiasi per triggerare automaticamente il deploy.

---

## ⚡ Configurazione Supabase Edge Functions

Le Edge Functions di Supabase hanno bisogno di secrets separati.

### Passo 1: Vai alle impostazioni delle Edge Functions

1. Vai su: Supabase Dashboard > Edge Functions > Settings
2. Clicca su **"Secrets"**

### Passo 2: Aggiungi questi secrets

Aggiungi **uno per uno** questi secrets:

| Nome Secret | Valore | Dove trovarlo |
|------------|--------|---------------|
| `DISCORD_CLIENT_ID` | `1234567890` | Discord Developer Portal > OAuth2 |
| `DISCORD_CLIENT_SECRET` | `your-secret-here` | Discord Developer Portal > OAuth2 > Client Secret |
| `DISCORD_REDIRECT_URI` | `https://ryze-glitch.github.io/uopi-dashboard/auth` | URL fisso per GitHub Pages |
| `SUPABASE_URL` | `https://your-project.supabase.co` | Supabase Dashboard > Settings > API |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGc...` (service_role key) | Supabase Dashboard > Settings > API > service_role key |
| `SUPABASE_ANON_KEY` | `eyJhbGc...` (anon key) | Supabase Dashboard > Settings > API > anon key |
| `STRIPE_SECRET_KEY` | `sk_live_...` o `sk_test_...` | Stripe Dashboard (opzionale, solo se usi pagamenti) |

⚠️ **IMPORTANTE**: Non confondere `SUPABASE_SERVICE_ROLE_KEY` con `SUPABASE_PUBLISHABLE_KEY`!
- `SUPABASE_PUBLISHABLE_KEY` = anon/public key (per il frontend)
- `SUPABASE_SERVICE_ROLE_KEY` = service_role key (solo per le Edge Functions, mai esporla nel frontend!)

---

## 🎮 Configurazione Discord OAuth

### Passo 1: Crea un'applicazione Discord

1. Vai su: https://discord.com/developers/applications
2. Clicca su **"New Application"**
3. Dai un nome all'applicazione (es: "U.O.P.I. Dashboard")

### Passo 2: Configura OAuth2

1. Vai su **"OAuth2"** nel menu laterale
2. In **"Redirects"**, aggiungi:
   - Per sviluppo locale: `http://localhost:8080/auth`
   - Per produzione: `https://ryze-glitch.github.io/uopi-dashboard/auth`
3. Copia il **Client ID** e il **Client Secret**

### Passo 3: Configura le variabili

- **Client ID**: Usalo in `VITE_DISCORD_CLIENT_ID` (frontend) e `DISCORD_CLIENT_ID` (Edge Functions)
- **Client Secret**: Usalo SOLO in `DISCORD_CLIENT_SECRET` (Edge Functions, mai nel frontend!)

---

## ✅ Verifica della Configurazione

### Controlla i log della console

Dopo il deploy, apri la console del browser (F12) e verifica:

✅ **Configurazione corretta:**
```
VITE_SUPABASE_URL: ✅ Set
VITE_SUPABASE_PUBLISHABLE_KEY: ✅ Set
```

❌ **Configurazione mancante:**
```
VITE_SUPABASE_URL: ❌ Missing
VITE_SUPABASE_PUBLISHABLE_KEY: ❌ Missing
```

### Test del login

1. Vai su: `https://ryze-glitch.github.io/uopi-dashboard/#/auth`
2. Clicca su **"Accedi con Discord"**
3. Dovresti essere reindirizzato a Discord per l'autorizzazione
4. Dopo l'autorizzazione, dovresti essere reindirizzato alla dashboard

---

## 🆘 Risoluzione Problemi

### Errore: "ERR_NAME_NOT_RESOLVED" su "placeholder.supabase.co"

**Causa**: Le variabili d'ambiente Supabase non sono configurate.

**Soluzione**: 
1. Verifica che i GitHub Secrets siano configurati correttamente
2. Triggera un nuovo deploy dopo aver aggiunto i secrets
3. Verifica che i nomi dei secrets siano esatti (case-sensitive!)

### Errore: "Failed to send a request to the Edge Function"

**Causa**: Le Edge Functions non hanno i secrets configurati.

**Soluzione**:
1. Vai su Supabase Dashboard > Edge Functions > Settings > Secrets
2. Verifica che tutti i secrets siano presenti
3. Riavvia le Edge Functions se necessario

### Il login funziona ma non reindirizza alla dashboard

**Causa**: Problema con il redirect dopo l'autenticazione.

**Soluzione**:
1. Apri la console del browser (F12)
2. Controlla i log per vedere dove si blocca
3. Verifica che `VITE_DISCORD_REDIRECT_URI` sia esattamente: `https://ryze-glitch.github.io/uopi-dashboard/auth` (senza trailing slash)

---

## 📞 Supporto

Se hai problemi, controlla:
1. I log della console del browser
2. I log delle Supabase Edge Functions (Dashboard > Edge Functions > Logs)
3. I log di GitHub Actions (per vedere se il build è riuscito)

