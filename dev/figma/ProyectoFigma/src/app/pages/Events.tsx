import { useState } from "react";
import { CalendarPlus, MapPin, Users, Clock, X, Image as ImageIcon } from "lucide-react";
import { cn } from "../../lib/utils";

const MOCK_EVENTS = [
  {
    id: 1,
    title: "Night Riders Meetup",
    date: "Hoy, 22:00",
    location: "Parking Estadio Norte",
    attendees: 156,
    type: "motorcycle",
    image: "https://images.unsplash.com/photo-1606927131353-c0ad17d60b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: 2,
    title: "Concentración JDM & Exóticos",
    date: "Mañana, 10:00",
    location: "Recinto Ferial",
    attendees: 432,
    type: "car",
    image: "https://images.unsplash.com/photo-1555532686-d0fccaccadcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    color: "from-purple-500 to-pink-500"
  }
];

export function Events() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 lg:p-8 pb-24 lg:pb-8 max-w-5xl mx-auto w-full relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Eventos
          </h1>
          <p className="text-gray-400 text-sm mt-1">Concentraciones y quedadas cerca de ti</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 transition-transform font-medium"
        >
          <CalendarPlus size={20} />
          <span className="hidden sm:inline">Crear Evento</span>
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        <FilterBadge label="Todos" active />
        <FilterBadge label="Coches" />
        <FilterBadge label="Motos" />
        <FilterBadge label="Fin de semana" />
        <FilterBadge label="Oficiales" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_EVENTS.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Modal Crear Evento */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-gray-900 border border-purple-500/30 rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-[0_0_40px_rgba(168,85,247,0.15)] relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-black text-white mb-6">Nuevo Evento</h2>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Título del Evento</label>
                <input 
                  type="text" 
                  placeholder="Ej. Kdd Nocturna"
                  className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Fecha y Hora</label>
                  <input 
                    type="datetime-local" 
                    className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Tipo</label>
                  <select className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none">
                    <option value="both">Coches y Motos</option>
                    <option value="car">Solo Coches</option>
                    <option value="moto">Solo Motos</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Ubicación</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={18} className="text-gray-500" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Buscar dirección o punto en el mapa..."
                    className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Foto de Portada</label>
                <div className="w-full h-32 border-2 border-dashed border-gray-800 hover:border-purple-500/50 rounded-xl bg-gray-950 flex flex-col items-center justify-center text-gray-500 hover:text-purple-400 transition-colors cursor-pointer group">
                  <ImageIcon size={32} className="mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Subir imagen</span>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3.5 rounded-xl mt-4 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all"
              >
                Publicar Evento
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterBadge({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={cn(
        "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
        active 
          ? "bg-purple-500/20 text-purple-300 border border-purple-500/50" 
          : "bg-gray-900 text-gray-400 border border-gray-800 hover:bg-gray-800"
      )}
    >
      {label}
    </button>
  );
}

function EventCard({ event }: { event: any }) {
  return (
    <div className="group rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden hover:border-gray-700 transition-all hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 z-20">
          <span className={cn("px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r shadow-lg", event.color)}>
            {event.type === 'car' ? 'Coches' : 'Motos'}
          </span>
        </div>
      </div>
      
      <div className="p-5 relative z-20 -mt-8">
        <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Clock size={16} className="text-cyan-400" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <MapPin size={16} className="text-pink-400" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Users size={16} className="text-purple-400" />
            <span>{event.attendees} asistentes confirmados</span>
          </div>
        </div>

        <button className={cn(
          "w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all hover:opacity-90 active:scale-95 bg-gradient-to-r",
          event.color
        )}>
          Unirse al Evento
        </button>
      </div>
    </div>
  );
}
