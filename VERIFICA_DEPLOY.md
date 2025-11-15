# 🔍 VERIFICA SE IL DEPLOY È STATO FATTO CORRETTAMENTE

## ⚠️ IL PROBLEMA
Il browser sta cercando `src/main.tsx` invece dei file compilati. Questo significa che GitHub Pages sta servendo l'`index.html` sbagliato.

---

## ✅ COME VERIFICARE

### 1. Controlla se il Workflow è stato eseguito
1. Vai su: https://github.com/ryze-glitch/uopi-dashboard/actions
2. Cerca l'ultimo workflow "Deploy to GitHub Pages"
3. Verifica che sia **verde** (completato con successo)
4. Se è **rosso** (fallito), clicca e leggi l'errore

### 2. Controlla le Impostazioni di GitHub Pages
1. Vai su: https://github.com/ryze-glitch/uopi-dashboard/settings/pages
2. Verifica che:
   - **Source** sia impostato su **"GitHub Actions"** (NON su "Deploy from a branch")
   - Se è impostato su "Deploy from a branch", cambialo in **"GitHub Actions"**

### 3. Forza un Nuovo Deploy
1. Vai su: https://github.com/ryze-glitch/uopi-dashboard/actions
2. Clicca su **"Deploy to GitHub Pages"** nel menu laterale
3. Clicca su **"Run workflow"** (in alto a destra)
4. Seleziona il branch **"main"**
5. Clicca **"Run workflow"**

### 4. Verifica il File Deployato
Dopo il deploy (aspetta 1-2 minuti):
1. Vai su: https://ryze-glitch.github.io/uopi-dashboard/
2. Apri gli **Developer Tools** (F12)
3. Vai su **Network**
4. Ricarica la pagina
5. Cerca `index.html` nella lista
6. Clicca su `index.html`
7. Verifica che il contenuto abbia:
   ```html
   <script type="module" crossorigin src="/uopi-dashboard/assets/index-XXXXX.js"></script>
   ```
   **NON** dovrebbe avere:
   ```html
   <script type="module" src="/src/main.tsx"></script>
   ```

---

## 🆘 SE IL DEPLOY NON FUNZIONA

### Opzione 1: Verifica i Secrets
Assicurati che questi secrets siano configurati:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_DISCORD_CLIENT_ID`
- `VITE_DISCORD_REDIRECT_URI`

Vai su: https://github.com/ryze-glitch/uopi-dashboard/settings/secrets/actions

### Opzione 2: Controlla i Log del Workflow
1. Vai su: https://github.com/ryze-glitch/uopi-dashboard/actions
2. Clicca sull'ultimo workflow
3. Clicca su **"build"** (il job)
4. Espandi i log e cerca errori

### Opzione 3: Deploy Manuale
Se il workflow continua a fallire, puoi fare un deploy manuale:
1. Esegui localmente: `npm run build`
2. Vai nella cartella `dist`
3. Carica tutti i file su GitHub Pages manualmente

---

## 💡 NOTA IMPORTANTE

GitHub Pages deve essere configurato per usare **"GitHub Actions"** come source, NON "Deploy from a branch". Questo è fondamentale per far funzionare il workflow!

