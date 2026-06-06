-- Enable PostGIS for location data (required for routes, events, pois)
CREATE EXTENSION IF NOT EXISTS postgis;

--------------------------------------------------------------------------------
-- 1. PROFILES & SOCIAL
--------------------------------------------------------------------------------

CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 1.5 USER TRIGGER
--------------------------------------------------------------------------------

-- Trigger para crear perfil automáticamente al registrar usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'username'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Phase 2: Followers
CREATE TABLE public.followers (
    follower_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    following_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (follower_id, following_id)
);

-- Phase 3: Direct Messages
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 2. GARAGE & MAINTENANCE
--------------------------------------------------------------------------------

CREATE TYPE vehicle_type AS ENUM ('car', 'motorcycle');

CREATE TABLE public.vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    type vehicle_type NOT NULL,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    year INT NOT NULL,
    color TEXT,
    displacement_cc INT,
    engine_specs TEXT,
    main_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Phase 2: Likes
CREATE TABLE public.vehicle_likes (
    vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (vehicle_id, user_id)
);

-- Phase 3: Maintenance Logs
CREATE TABLE public.maintenance_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    cost DECIMAL(10, 2),
    date DATE NOT NULL,
    mileage INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 3. ROUTES & EVENTS
--------------------------------------------------------------------------------

CREATE TABLE public.routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    -- path_coords guardará la línea de la ruta
    path_coords GEOMETRY(LineString, 4326),
    distance_km FLOAT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Phase 2: Saved Routes
CREATE TABLE public.route_bookmarks (
    route_id UUID REFERENCES public.routes(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (route_id, user_id)
);

CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organizer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    route_id UUID REFERENCES public.routes(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    -- location_coords guardará el punto de encuentro
    location_coords GEOMETRY(Point, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.event_attendees (
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (event_id, user_id)
);

--------------------------------------------------------------------------------
-- 4. MEDIA & ALBUMS
--------------------------------------------------------------------------------

-- Phase 2: Albums
CREATE TABLE public.albums (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    route_id UUID REFERENCES public.routes(id) ON DELETE SET NULL,
    event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.album_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    album_id UUID REFERENCES public.albums(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    location_coords GEOMETRY(Point, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 5. GAMIFICATION & POIs
--------------------------------------------------------------------------------

CREATE TYPE poi_type AS ENUM ('restaurant', 'workshop', 'viewpoint');

CREATE TABLE public.pois (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    type poi_type NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    location_coords GEOMETRY(Point, 4326) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Phase 3: Badges
CREATE TABLE public.badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    icon_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.user_badges (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE,
    awarded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (user_id, badge_id)
);

--------------------------------------------------------------------------------
-- 6. SECURITY POLICIES (RLS)
--------------------------------------------------------------------------------

-- Enable RLS en tablas principales de MVP
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Profiles: Todos pueden ver, pero solo el dueño puede editar
CREATE POLICY "Profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Vehicles: Todos pueden ver el garaje, pero solo el dueño modifica
CREATE POLICY "Vehicles are viewable by everyone." ON public.vehicles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own vehicle." ON public.vehicles FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update own vehicle." ON public.vehicles FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Users can delete own vehicle." ON public.vehicles FOR DELETE USING (auth.uid() = owner_id);

-- En el futuro se pueden añadir políticas para las demás tablas.
