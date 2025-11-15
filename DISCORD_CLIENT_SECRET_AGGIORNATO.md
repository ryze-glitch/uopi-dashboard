# 🔑 DISCORD CLIENT SECRET AGGIORNATO

## ⚠️ IMPORTANTE: Nuovo Client Secret

Il `DISCORD_CLIENT_SECRET` è stato rigenerato. Usa questo nuovo valore:

---

## 🔑 NUOVO SECRET

### `DISCORD_CLIENT_SECRET`
**Valore:**
```
3bVYtMbyCn2Ob7C44ALBfJqtxzpkk3HV
```

---

## 📍 COSA FARE

### 1. Vai su Supabase Dashboard
- Apri: https://supabase.com/dashboard
- Seleziona il progetto: `jtrysdnbijycermezrrg`

### 2. Vai alle Edge Functions Secrets
- Edge Functions > Settings > Secrets

### 3. Aggiorna il secret `DISCORD_CLIENT_SECRET`
1. Trova `DISCORD_CLIENT_SECRET` nella lista
2. Clicca sui tre puntini (⋮) a destra
3. Clicca su **"Update"** o **"Edit"**
4. Sostituisci il valore vecchio con: `3bVYtMbyCn2Ob7C44ALBfJqtxzpkk3HV`
5. Clicca **"Save"**

**OPPURE** se non esiste ancora:
1. Clicca **"Add new secret"**
2. **Name**: `DISCORD_CLIENT_SECRET`
3. **Value**: `3bVYtMbyCn2Ob7C44ALBfJqtxzpkk3HV`
4. Clicca **"Add"**

---

## ⚠️ IMPORTANTE

Dopo aver aggiornato il secret su Supabase, devi anche aggiornarlo su **Discord Developer Portal** se non l'hai già fatto:

1. Vai su: https://discord.com/developers/applications
2. Seleziona la tua app
3. Vai su **OAuth2**
4. Verifica che il **Client Secret** corrisponda a: `3bVYtMbyCn2Ob7C44ALBfJqtxzpkk3HV`

**⚠️ Il Client Secret su Discord Developer Portal e su Supabase Edge Functions Secrets DEVE essere lo stesso!**

---

## ✅ VERIFICA

Dopo aver aggiornato:
1. Aspetta 10-20 secondi (i secrets potrebbero impiegare qualche secondo per essere applicati)
2. Prova il login su: https://ryze-glitch.github.io/uopi-dashboard/#/auth
3. Dovrebbe funzionare! 🎉

---

## 🆘 SE NON FUNZIONA

- Controlla che il secret sia stato salvato correttamente su Supabase
- Verifica che il valore sia esattamente: `3bVYtMbyCn2Ob7C44ALBfJqtxzpkk3HV` (senza spazi)
- Assicurati che sia lo stesso su Discord Developer Portal

