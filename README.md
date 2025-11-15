# 🚀 U.O.P.I. Dashboard

Sistema di gestione operativa integrato per U.O.P.I. - Gestione personale, comunicazioni e coordinamento.

## ⚙️ Configurazione Iniziale

**⚠️ IMPORTANTE**: Prima di avviare l'applicazione, devi configurare le variabili d'ambiente!

### Setup Rapido

1. **Crea il file `.env`** (copia da `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. **Compila le variabili** nel file `.env`:
   - `VITE_SUPABASE_URL` - URL del tuo progetto Supabase
   - `VITE_SUPABASE_PUBLISHABLE_KEY` - Chiave pubblica Supabase
   - `VITE_DISCORD_CLIENT_ID` - Client ID Discord OAuth
   - `VITE_DISCORD_REDIRECT_URI` - Redirect URI Discord

3. **Per GitHub Pages**: Configura i GitHub Secrets (vedi [SETUP.md](./SETUP.md))

📖 **Guida completa**: Vedi [SETUP.md](./SETUP.md) per istruzioni dettagliate su:
- Configurazione locale
- Configurazione GitHub Pages
- Configurazione Supabase Edge Functions
- Configurazione Discord OAuth

## 🛠️ Come modificare il codice

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/e5ffe78b-1333-4c0c-8032-c9983784cfc8) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/e5ffe78b-1333-4c0c-8032-c9983784cfc8) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
