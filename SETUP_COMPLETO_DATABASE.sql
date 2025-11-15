-- ============================================
-- SETUP COMPLETO DATABASE UOPI DASHBOARD
-- Esegui questo script in Supabase SQL Editor
-- ============================================

-- 1. Crea profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Crea enum per i ruoli
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'user');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. Crea user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  discord_id TEXT NOT NULL,
  discord_tag TEXT,
  UNIQUE (user_id, role),
  UNIQUE (discord_id)
);

-- 4. Modifica user_roles per permettere user_id NULL inizialmente
ALTER TABLE public.user_roles ALTER COLUMN user_id DROP NOT NULL;

-- 5. Aggiungi colonne Discord a profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS discord_id TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS discord_tag TEXT,
ADD COLUMN IF NOT EXISTS discord_avatar_url TEXT;

-- 6. Abilita RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 7. Crea policies per profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 8. Crea policies per user_roles
DROP POLICY IF EXISTS "Users can view own role" ON public.user_roles;
CREATE POLICY "Users can view own role"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- 9. Crea funzione per gestire nuovi utenti
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

-- 10. Crea trigger per nuovi utenti
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 11. Crea funzione per aggiornare updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- 12. Crea funzione per verificare ruoli
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 13. Crea subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  stripe_price_id TEXT,
  status TEXT NOT NULL DEFAULT 'inactive',
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own subscription" ON public.subscriptions;
CREATE POLICY "Users can view own subscription"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- 14. Crea shifts table
CREATE TABLE IF NOT EXISTS public.shifts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  start_time timestamp with time zone NOT NULL,
  end_time timestamp with time zone NOT NULL,
  role text NOT NULL,
  status text NOT NULL DEFAULT 'scheduled',
  assigned_personnel jsonb DEFAULT '[]'::jsonb,
  created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.shifts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view all shifts" ON public.shifts;
CREATE POLICY "Users can view all shifts"
ON public.shifts
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Authenticated users can create shifts" ON public.shifts;
CREATE POLICY "Authenticated users can create shifts"
ON public.shifts
FOR INSERT
WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "Users can update their own shifts" ON public.shifts;
CREATE POLICY "Users can update their own shifts"
ON public.shifts
FOR UPDATE
USING (auth.uid() = created_by);

DROP POLICY IF EXISTS "Users can delete their own shifts" ON public.shifts;
CREATE POLICY "Users can delete their own shifts"
ON public.shifts
FOR DELETE
USING (auth.uid() = created_by);

-- 15. Crea trigger per updated_at su shifts
DROP TRIGGER IF EXISTS update_shifts_updated_at ON public.shifts;
CREATE TRIGGER update_shifts_updated_at
BEFORE UPDATE ON public.shifts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 16. Abilita realtime per shifts
DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.shifts;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 17. INSERISCI UTENTI AUTORIZZATI
INSERT INTO public.user_roles (discord_id, discord_tag, role, user_id)
VALUES
  -- Admin users (Dirigenziale)
  ('817121576217870348', '_frascones_', 'admin', NULL),
  ('1387684968536477756', 'dxrk.ryze', 'admin', NULL),
  ('814941325916241930', '0_matte_0', 'admin', NULL),
  ('796078170176487454', 'estensione', 'admin', NULL),
  ('1249738701081153658', 'fastweb.mvp', 'admin', NULL),
  ('1062981395644948550', 'kekkozalone89', 'admin', NULL),
  ('1336335921968058399', 'ghostfede', 'admin', NULL),
  -- User role (Amministrativo e Operativo)
  ('732317078559653909', 'marcucx', 'user', NULL),
  ('1221123387254898820', 'zeccast', 'user', NULL),
  ('1308498635889311869', 'lupix.14', 'user', NULL),
  ('888053326640447508', 'fluca20', 'user', NULL),
  ('966703649378140161', 'il_lingio', 'user', NULL),
  ('707550585775194124', 'fakeghost_', 'user', NULL),
  ('744290799101149326', 'grankio99', 'user', NULL),
  ('711261063844331560', 'jolen._.', 'user', NULL),
  ('876123305952817224', 'giulsza', 'user', NULL),
  ('931640368448045107', 'dennaonfire', 'user', NULL),
  ('1103342962118754427', '7aviglia.gg', 'user', NULL),
  ('602146684453126165', 'alexx__', 'user', NULL),
  ('1077976224208531508', 'lightywolf_', 'user', NULL),
  ('664812743202701332', 'salvo115', 'user', NULL),
  ('573502537265577994', 'didyouknow.', 'user', NULL),
  ('872144738248183839', 'damy_97', 'user', NULL),
  ('900713565915349022', 'gabrieleliderdelladgg', 'user', NULL),
  ('989918527257452564', 'samuele_yt', 'user', NULL),
  ('825835180312887316', 'the_real_king_29', 'user', NULL),
  ('867697195532025856', 'bomberhino', 'user', NULL),
  ('1178771628260331560', 'gessux', 'user', NULL),
  ('245914276198350860', 'peppe2528', 'user', NULL),
  ('521411586926313473', 'lorenzogef8171', 'user', NULL),
  ('677815494366986270', '_tfall', 'user', NULL),
  ('691293154137342003', 'andrea_pacifico', 'user', NULL),
  ('457974905904824331', 'whitecontrol__', 'user', NULL),
  ('1344355420072050720', 'mirco_85314', 'user', NULL),
  ('879338438934011906', '.ilgiocatore', 'user', NULL),
  ('759064435284639795', 'lory26487', 'user', NULL),
  ('1352306418610471014', 'russ0000_', 'user', NULL),
  ('870414870917574686', 'he_112.', 'user', NULL)
ON CONFLICT (discord_id) DO UPDATE
SET discord_tag = EXCLUDED.discord_tag,
    role = EXCLUDED.role;

-- ============================================
-- FINE SETUP
-- ============================================

