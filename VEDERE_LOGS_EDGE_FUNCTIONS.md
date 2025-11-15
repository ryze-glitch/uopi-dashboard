# 🔍 COME VEDERE I LOG DELLE EDGE FUNCTIONS

## Per capire esattamente cosa sta causando l'errore 500:

### 1. Vai su Supabase Dashboard
- Apri: https://supabase.com/dashboard
- Seleziona il progetto: `mdalzdfseeqrnnkxnonm`

### 2. Vai alle Edge Functions
- Nel menu laterale, clicca su **"Edge Functions"**

### 3. Apri la funzione discord-auth
- Clicca sulla funzione **"discord-auth"**

### 4. Vai ai Logs
- Clicca sulla tab **"Logs"** (o "Invocation logs")
- Dovresti vedere tutti gli errori con i dettagli

### 5. Cerca l'errore più recente
- Cerca l'ultimo errore (quello con timestamp più recente)
- Dovresti vedere messaggi come:
  - `[DISCORD-AUTH] Missing Discord credentials`
  - `[DISCORD-AUTH] Missing Supabase credentials`
  - `[DISCORD-AUTH] ERROR` con i dettagli

---

## 📋 COSA CERCARE NEI LOG

### Se vedi: `Missing Discord credentials`
→ Devi aggiungere i secrets `DISCORD_CLIENT_ID` e `DISCORD_CLIENT_SECRET`

### Se vedi: `Missing Supabase credentials`
→ Devi aggiungere i secrets `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`

### Se vedi: `Error checking user authorization`
→ La tabella `user_roles` potrebbe non esistere o non essere accessibile

### Se vedi: `Error creating user`
→ Problema con la creazione dell'utente in Supabase Auth

### Se vedi: `Error generating OTP`
→ Problema con la generazione del magic link

---

## 🆘 SE NON VEDI LOG

1. Prova a fare di nuovo il login
2. Aspetta qualche secondo
3. Ricarica la pagina dei log
4. I log potrebbero impiegare qualche secondo per apparire

---

## 💡 TIP

I log mostrano esattamente dove fallisce il codice. Usali per capire quale secret manca o quale operazione fallisce!

