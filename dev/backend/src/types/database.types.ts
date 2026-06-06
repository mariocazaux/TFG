export interface Profile {
  id: string; // UUID
  username: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
}

export type VehicleType = 'car' | 'motorcycle';

export interface Vehicle {
  id: string; // UUID
  owner_id: string; // UUID
  type: VehicleType;
  brand: string;
  model: string;
  year: number;
  color?: string;
  displacement_cc?: number;
  engine_specs?: string;
  main_image_url?: string;
  created_at: string;
}

export interface Route {
  id: string; // UUID
  creator_id: string; // UUID
  title: string;
  description?: string;
  path_coords?: string; // GeoJSON LineString representation or raw EWKB
  distance_km?: number;
  created_at: string;
}

export interface Event {
  id: string; // UUID
  organizer_id: string; // UUID
  route_id?: string; // UUID
  title: string;
  description?: string;
  event_date: string;
  location_coords?: string; // GeoJSON Point representation or raw EWKB
  created_at: string;
}

export interface EventAttendee {
  event_id: string; // UUID
  user_id: string; // UUID
  created_at: string;
}

export type POIType = 'restaurant' | 'workshop' | 'viewpoint';

export interface POI {
  id: string; // UUID
  creator_id?: string; // UUID
  type: POIType;
  name: string;
  description?: string;
  location_coords: string; // GeoJSON Point
  created_at: string;
}

// Phase 2 & 3 Models
export interface Follower {
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface MaintenanceLog {
  id: string;
  vehicle_id: string;
  title: string;
  description?: string;
  cost?: number;
  date: string;
  mileage?: number;
  created_at: string;
}

export interface Album {
  id: string;
  user_id: string;
  route_id?: string;
  event_id?: string;
  name: string;
  description?: string;
  created_at: string;
}

export interface AlbumPhoto {
  id: string;
  album_id: string;
  photo_url: string;
  location_coords?: string;
  created_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description?: string;
  icon_url?: string;
  created_at: string;
}

export interface UserBadge {
  user_id: string;
  badge_id: string;
  awarded_at: string;
}
