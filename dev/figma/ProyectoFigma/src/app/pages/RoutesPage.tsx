import { useState } from "react";
import { Plus, Navigation, Heart, Share2, Map as MapIcon, X, Route as RouteIcon } from "lucide-react";
import { cn } from "../../lib/utils";

const MOCK_ROUTES = [
  {
    id: 1,
    title: "Curvas de la Sierra",
    creator: "AlexRider",
    distance: "120 km",
    duration: "2h 15m",
    likes: 342,
    difficulty: "Alta",
    tags: ["Montaña", "Asfalto Bueno"],
    image: "https://images.unsplash.com/photo-1518783211485-10fd3bfb2ce2?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    title: "Ruta Costera Nocturna",
    creator: "JDM_King",
    distance: "45 km",
    duration: "45m",
    likes: 890,
    difficulty: "Baja",
    tags: ["Ciudad", "Costa", "Chill"],
    image: "https://images.unsplash.com/photo-1555532686-d0fccaccadcf?auto=format&fit=crop&q=80&w=600"
  }
];

export function RoutesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 lg:p-8 pb-24 lg:pb-8 max-w-5xl mx-auto w-full relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Rutas
          </h1>
          <p className="text-gray-400 text-sm mt-1">Descubre los mejores trazados de la comunidad</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105 transition-transform font-medium"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Nueva Ruta</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_ROUTES.map(route => (
          <RouteCard key={route.id} route={route} />
        ))}
      </div>

      {/* Modal Crear Ruta */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-gray-900 border border-cyan-500/30 rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-[0_0_40px_rgba(34,211,238,0.15)] relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-black text-white mb-6">Grabar Nueva Ruta</h2>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Nombre de la Ruta</label>
                <input 
                  type="text" 
                  placeholder="Ej. Tramos Nocturnos"
                  className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-gray-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Dificultad</label>
                  <select className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all appearance-none">
                    <option value="easy">Tranquila</option>
                    <option value="medium">Media</option>
                    <option value="hard">Exigente</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Tipo de asfalto</label>
                  <select className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all appearance-none">
                    <option value="good">Bueno / Autovía</option>
                    <option value="mixed">Mixto / Nacional</option>
                    <option value="curves">Puerto / Curvas</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Descripción o Etiquetas</label>
                <input 
                  type="text" 
                  placeholder="Montaña, Vistas increíbles, Cuidado con radares..."
                  className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-gray-600"
                />
              </div>

              <div className="mt-6 flex flex-col items-center justify-center p-6 bg-gray-950 border-2 border-dashed border-gray-800 rounded-xl">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mb-3">
                  <RouteIcon size={32} className="text-cyan-400" />
                </div>
                <h3 className="font-bold text-white mb-1">Dibuja o graba el trazado</h3>
                <p className="text-sm text-gray-500 text-center mb-4">Abre el mapa para marcar los puntos o dale a grabar mientras conduces.</p>
                <button type="button" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm border border-gray-700">
                  Abrir Editor de Mapa
                </button>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3.5 rounded-xl mt-4 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all"
              >
                Guardar Ruta
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function RouteCard({ route }: { route: any }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all group">
      <div className="flex flex-col sm:flex-row h-full">
        <div className="sm:w-2/5 h-48 sm:h-auto relative">
          <img src={route.image} alt={route.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-gray-900 to-transparent" />
          
          <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-cyan-400 border border-cyan-500/30">
            <MapIcon size={12} />
            {route.distance}
          </div>
        </div>
        
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-white leading-tight">{route.title}</h3>
              <button className="text-gray-500 hover:text-pink-500 transition-colors">
                <Heart size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-400 mb-3">por <span className="text-cyan-400 font-medium">@{route.creator}</span></p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {route.tags.map((tag: string) => (
                <span key={tag} className="text-[10px] uppercase tracking-wider bg-gray-800 text-gray-300 px-2 py-1 rounded-md border border-gray-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-auto">
            <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
              <Navigation size={16} className="text-cyan-400" />
              Navegar
            </button>
            <button className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center text-gray-400 transition-colors">
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
