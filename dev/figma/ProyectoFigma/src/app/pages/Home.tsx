import { MapPin, Navigation, Navigation2, Star, Hotel, Coffee } from "lucide-react";
import { cn } from "../../lib/utils";

export function Home() {
  return (
    <div className="relative w-full h-full bg-gray-950 overflow-hidden">
      {/* Map Background Mock */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1518783211485-10fd3bfb2ce2?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      {/* Dark Overlay to make neon pop */}
      <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-[2px]" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      {/* Map Content Container */}
      <div className="absolute inset-0 z-10 p-4 lg:p-8">
        
        {/* Floating Search / Filter */}
        <div className="max-w-md mx-auto bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-2 flex items-center gap-2 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <input 
            type="text" 
            placeholder="Buscar rutas, usuarios, hoteles..." 
            className="flex-1 bg-transparent border-none text-sm text-gray-200 px-4 py-2 focus:outline-none placeholder-gray-500"
          />
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-2 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            <Navigation2 size={20} className="fill-white/20" />
          </button>
        </div>

        {/* Mock Map Pins */}
        <MapMarker top="30%" left="40%" type="event" label="Concentración JDM" />
        <MapMarker top="50%" left="60%" type="route" label="Ruta de Montaña" />
        <MapMarker top="20%" left="70%" type="hotel" label="Hotel Motor-Friendly" />
        <MapMarker top="70%" left="30%" type="restaurant" label="Pit Stop Cafe" />
        
        {/* Current Location */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-12 h-12 bg-cyan-500/20 rounded-full animate-ping" />
            <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] ring-4 ring-cyan-500/30" />
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-20 lg:bottom-8 right-4 lg:right-8 flex flex-col gap-2">
          <button className="w-12 h-12 bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors">
            <Navigation size={24} />
          </button>
        </div>

        {/* Quick Info Card (Simulating clicking a pin) */}
        <div className="absolute bottom-24 lg:bottom-12 left-4 lg:left-8 right-4 lg:right-auto lg:w-80 bg-gray-900/90 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-4 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="text-xs font-bold tracking-wider text-purple-400 uppercase bg-purple-500/10 px-2 py-1 rounded-md">Evento Activo</span>
              <h3 className="text-lg font-bold text-white mt-1">Concentración JDM</h3>
            </div>
            <div className="bg-gray-800 p-2 rounded-lg">
              <Star className="text-yellow-400 w-5 h-5" />
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-4 line-clamp-2">
            Reunión de coches japoneses. Parking norte del estadio. ¡Trae tu mejor máquina!
          </p>
          <div className="flex gap-2">
            <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-2 rounded-xl text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:opacity-90 transition-opacity">
              Unirse
            </button>
            <button className="flex-1 bg-gray-800 text-gray-300 font-medium py-2 rounded-xl text-sm border border-gray-700 hover:border-gray-600 transition-colors">
              Ver Detalles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapMarker({ top, left, type, label }: { top: string; left: string; type: 'event' | 'route' | 'hotel' | 'restaurant'; label: string }) {
  const getColors = () => {
    switch (type) {
      case 'event': return 'bg-purple-500 text-purple-100 shadow-[0_0_20px_rgba(168,85,247,0.6)] ring-purple-500/30';
      case 'route': return 'bg-cyan-500 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.6)] ring-cyan-500/30';
      case 'hotel': return 'bg-yellow-500 text-yellow-100 shadow-[0_0_20px_rgba(234,179,8,0.6)] ring-yellow-500/30';
      case 'restaurant': return 'bg-orange-500 text-orange-100 shadow-[0_0_20px_rgba(249,115,22,0.6)] ring-orange-500/30';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'event': return <Star size={16} />;
      case 'route': return <Navigation2 size={16} className="rotate-45" />;
      case 'hotel': return <Hotel size={16} />;
      case 'restaurant': return <Coffee size={16} />;
    }
  };

  return (
    <div className="absolute group cursor-pointer" style={{ top, left, transform: 'translate(-50%, -100%)' }}>
      <div className={cn("relative flex items-center justify-center w-10 h-10 rounded-full ring-4 z-10 transition-transform group-hover:scale-110", getColors())}>
        {getIcon()}
      </div>
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-current opacity-80" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-gray-900 border border-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <span className="text-xs font-semibold text-white">{label}</span>
      </div>
    </div>
  );
}
