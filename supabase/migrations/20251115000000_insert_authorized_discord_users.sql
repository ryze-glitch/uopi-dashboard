-- Insert authorized Discord users into user_roles table
-- These users are extracted from operatori_reparto.json
-- Discord IDs are extracted from avatar URLs
-- Generated automatically from src/data/operatori_reparto.json

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

