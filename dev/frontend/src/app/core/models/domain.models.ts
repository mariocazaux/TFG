export interface Profile {
  id: string; // UUID
  username: string;
  fullName?: string; // Mapped from full_name
  avatarUrl?: string; // Mapped from avatar_url
  bio?: string;
  createdAt: string; // Mapped from created_at
}

export type VehicleType = 'car' | 'motorcycle';

export interface Vehicle {
  id: string; // UUID
  ownerId: string; // Mapped from owner_id
  type: VehicleType;
  brand: string;
  model: string;
  year: number;
  color?: string;
  displacementCc?: number; // Mapped from displacement_cc
  engineSpecs?: string; // Mapped from engine_specs
  mainImageUrl?: string; // Mapped from main_image_url
  createdAt: string; // Mapped from created_at
}

export interface Route {
  id: string; // UUID
  creatorId: string; // UUID
  title: string;
  description?: string;
  pathCoords?: string; // GeoJSON
  distanceKm?: number;
  createdAt: string;
}

export interface Event {
  id: string; // UUID
  organizerId: string; // UUID
  routeId?: string; // UUID
  title: string;
  description?: string;
  eventDate: string; // Mapped from event_date
  locationCoords?: string; // GeoJSON Point
  createdAt: string;
}

export type POIType = 'restaurant' | 'workshop' | 'viewpoint';

export interface POI {
  id: string; // UUID
  creatorId?: string; // UUID
  type: POIType;
  name: string;
  description?: string;
  locationCoords: string; // GeoJSON Point
  createdAt: string;
}

// Phase 2 & 3 Models
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface MaintenanceLog {
  id: string;
  vehicleId: string;
  title: string;
  description?: string;
  cost?: number;
  date: string;
  mileage?: number;
  createdAt: string;
}

export interface Album {
  id: string;
  userId: string;
  routeId?: string;
  eventId?: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface AlbumPhoto {
  id: string;
  albumId: string;
  photoUrl: string;
  locationCoords?: string;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description?: string;
  iconUrl?: string;
  createdAt: string;
}
