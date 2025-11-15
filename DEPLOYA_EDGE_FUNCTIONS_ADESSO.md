# 🚨 DEPLOYA LE EDGE FUNCTIONS ADESSO - SOLUZIONE RAPIDA

## ⚠️ IL PROBLEMA

L'errore 404 sulla preflight significa che l'Edge Function `discord-auth` **NON è deployata** sul nuovo progetto Supabase!

---

## ✅ SOLUZIONE IMMEDIATA

### Passo 1: Apri il terminale
Apri PowerShell o CMD nella cartella del progetto.

### Passo 2: Installa Supabase CLI (se non ce l'hai)
```bash
npm install -g supabase
```

### Passo 3: Fai login
```bash
supabase login
```
Ti aprirà il browser per autenticarti.

### Passo 4: Linka il progetto
```bash
supabase link --project-ref jtrysdnbijycermezrrg
```

### Passo 5: Deploya le Edge Functions (UNA PER UNA)
```bash
supabase functions deploy discord-auth
```

Aspetta che finisca, poi:
```bash
supabase functions deploy check-subscription
```

Aspetta che finisca, poi:
```bash
supabase functions deploy create-checkout
```

Aspetta che finisca, poi:
```bash
supabase functions deploy customer-portal
```

---

## ✅ VERIFICA

Dopo il deploy, dovresti vedere messaggi tipo:
```
Deploying function discord-auth...
Function discord-auth deployed successfully
```

---

## 🧪 TEST

1. Aspetta 10-20 secondi dopo il deploy
2. Vai su: https://ryze-glitch.github.io/uopi-dashboard/#/auth
3. Clicca su **"Accedi con Discord"**
4. **Dovrebbe funzionare!** 🎉

---

## 🆘 SE IL DEPLOY FALLISCE

### Errore: "Project not found"
→ Verifica che il project ID sia corretto: `jtrysdnbijycermezrrg`

### Errore: "Not authenticated"
→ Esegui di nuovo `supabase login`

### Errore: "Function not found"
→ Assicurati di essere nella cartella del progetto (dove c'è la cartella `supabase`)

---

## 💡 NOTA IMPORTANTE

Il 404 significa che l'endpoint non esiste. Deployare le Edge Functions è **OBBLIGATORIO** per far funzionare il login!

