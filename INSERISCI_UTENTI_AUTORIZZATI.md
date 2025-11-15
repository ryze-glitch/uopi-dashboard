# ✅ INSERISCI GLI UTENTI AUTORIZZATI NEL DATABASE

Ho trovato tutti gli ID Discord dal file `operatori_reparto.json` e ho creato una migration SQL per inserirli nel database.

## 📋 COSA FARE:

### Opzione 1: Esegui la migration su Supabase (CONSIGLIATO)

1. Vai su: **Supabase Dashboard** > **SQL Editor**
2. Clicca su **"New query"**
3. Copia e incolla il contenuto del file: `supabase/migrations/20251115000000_insert_authorized_discord_users.sql`
4. Clicca su **"Run"**

Questo inserirà tutti gli utenti autorizzati nella tabella `user_roles`.

### Opzione 2: Esegui via CLI Supabase

Se hai Supabase CLI installato:

```bash
supabase db push
```

Questo eseguirà tutte le migration, inclusa quella nuova.

---

## 👥 UTENTI INSERITI:

### Admin (7 utenti):
- `_frascones_` (ID: 817121576217870348)
- `dxrk.ryze` (ID: 1387684968536477756) ← **TU SEI QUESTO!**
- `0_matte_0` (ID: 814941325916241930)
- `estensione` (ID: 796078170176487454)
- `fastweb.mvp` (ID: 1249738701081153658)
- `kekkozalone89` (ID: 1062981395644948550)
- `ghostfede` (ID: 1336335921968058399)

### User (30 utenti):
Tutti gli altri operatori con ruolo "user"

---

## ⚠️ IMPORTANTE:

Dopo aver inserito gli utenti, devi anche configurare i **secrets delle Edge Functions**:

1. Vai su: **Supabase Dashboard** > **Edge Functions** > **Settings** > **Secrets**
2. Aggiungi questi secrets:
   - `DISCORD_CLIENT_ID` = `1387801645743869982` (dal file .env)
   - `DISCORD_CLIENT_SECRET` = (devi trovarlo su Discord Developer Portal)
   - `DISCORD_REDIRECT_URI` = `https://ryze-glitch.github.io/uopi-dashboard/auth`
   - `SUPABASE_URL` = `https://mdalzdfseeqrnnkxnonm.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` = (chiave service_role da Supabase Dashboard > Settings > API)

---

## 🔍 VERIFICA:

Dopo aver inserito gli utenti, puoi verificare con questa query SQL:

```sql
SELECT discord_id, discord_tag, role 
FROM public.user_roles 
ORDER BY role, discord_tag;
```

Dovresti vedere tutti gli utenti autorizzati.

---

## 🚨 SE L'ERRORE 500 PERSISTE:

L'errore 500 potrebbe essere dovuto a:
1. **Secrets delle Edge Functions non configurati** ← **VERIFICA QUESTO PRIMA!**
2. Utente non autorizzato (ma questo darebbe 403, non 500)

Controlla i log delle Edge Functions:
- Vai su: **Supabase Dashboard** > **Edge Functions** > **discord-auth** > **Logs**

