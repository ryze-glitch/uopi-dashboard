# 🔑 COME TROVARE LE CHIAVI SUPABASE - GUIDA RAPIDA

## ✅ Ho trovato il tuo Project ID Supabase: `mdalzdfseeqrnnkxnonm`

## 📍 PASSI PER TROVARE LE CHIAVI:

### 1. Vai su Supabase Dashboard
- Apri: https://supabase.com/dashboard
- **Accedi** con lo stesso account che hai usato su Lovable.dev

### 2. Trova il tuo progetto
- Cerca il progetto con ID: `mdalzdfseeqrnnkxnonm`
- Oppure cerca un progetto chiamato "U.O.P.I." o simile
- **Clicca sul progetto**

### 3. Vai alle impostazioni API
- Nel menu laterale sinistro, clicca su **"Settings"** (⚙️)
- Poi clicca su **"API"**

### 4. Copia le chiavi che ti servono

Vedrai una sezione chiamata **"Project API keys"** con queste chiavi:

#### ✅ CHIAVE 1: Project URL
- **Nome da usare**: `VITE_SUPABASE_URL`
- **Valore**: Cerca "Project URL" o "URL"
- Dovrebbe essere qualcosa come: `https://mdalzdfseeqrnnkxnonm.supabase.co`
- **COPIA QUESTO VALORE**

#### ✅ CHIAVE 2: anon public key
- **Nome da usare**: `VITE_SUPABASE_PUBLISHABLE_KEY`
- **Valore**: Cerca "anon public" o "anon" key
- Inizia con `eyJhbGc...` (è molto lunga)
- **COPIA QUESTO VALORE**

#### ✅ CHIAVE 3: service_role key (per Edge Functions)
- **Nome da usare**: `SUPABASE_SERVICE_ROLE_KEY`
- **Valore**: Cerca "service_role" key (è segreta, non esporla mai!)
- Inizia con `eyJhbGc...` (è molto lunga)
- **⚠️ ATTENZIONE**: Questa chiave è SEGRETA, non metterla mai nel frontend!

---

## 🚀 COSA FARE DOPO:

### Per GitHub Pages (deploy):

1. Vai su: https://github.com/ryze-glitch/uopi-dashboard/settings/secrets/actions

2. Aggiungi questi 2 secrets:
   - **Nome**: `VITE_SUPABASE_URL`
     - **Valore**: Il Project URL che hai copiato (es: `https://mdalzdfseeqrnnkxnonm.supabase.co`)
   
   - **Nome**: `VITE_SUPABASE_PUBLISHABLE_KEY`
     - **Valore**: La chiave "anon public" che hai copiato

3. Triggera un nuovo deploy:
   - Vai su: https://github.com/ryze-glitch/uopi-dashboard/actions
   - Clicca "Run workflow"

### Per Supabase Edge Functions:

1. Vai su: Supabase Dashboard > Edge Functions > Settings > Secrets

2. Aggiungi:
   - **Nome**: `SUPABASE_URL`
     - **Valore**: Lo stesso Project URL di prima
   
   - **Nome**: `SUPABASE_SERVICE_ROLE_KEY`
     - **Valore**: La chiave "service_role" che hai copiato

---

## ❓ SE NON TROVI IL PROGETTO:

1. Controlla se sei loggato con l'account giusto
2. Prova a cercare progetti con nomi diversi
3. Se non lo trovi, potrebbe essere stato creato con un altro account

---

## 📸 DOVE TROVARE LE CHIAVI (screenshot mentale):

```
Supabase Dashboard
  └── [Il tuo progetto]
      └── Settings (⚙️)
          └── API
              ├── Project URL: https://xxxxx.supabase.co  ← COPIA QUESTO
              ├── anon public: eyJhbGc...                 ← COPIA QUESTO
              └── service_role: eyJhbGc...                ← COPIA QUESTO (per Edge Functions)
```

---

## ✅ VERIFICA:

Dopo aver configurato i secrets, apri la console del browser e dovresti vedere:
```
VITE_SUPABASE_URL: ✅ Set
VITE_SUPABASE_PUBLISHABLE_KEY: ✅ Set
```

Invece di:
```
VITE_SUPABASE_URL: ❌ Missing
VITE_SUPABASE_PUBLISHABLE_KEY: ❌ Missing
```

