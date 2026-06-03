import { Settings, Edit2, Plus } from "lucide-react";
import { cn } from "../../lib/utils";

export function Profile() {
  return (
    <div className="p-4 lg:p-8 pb-24 lg:pb-8 max-w-4xl mx-auto w-full">
      {/* Profile Header */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="relative">
            <div className="w-32 h-32 rounded-full ring-4 ring-cyan-500/30 overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.2)]">
              <img 
                src="https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?auto=format&fit=crop&q=80&w=300" 
                alt="AlexRider" 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-gray-800 border-2 border-gray-900 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <Edit2 size={16} />
            </button>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-3xl font-black text-white">AlexRider</h1>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                Pro
              </span>
            </div>
            <p className="text-gray-400 mb-4">Málaga, España • Amante de las curvas y el asfalto nocturno.</p>
            
            <div className="flex items-center justify-center md:justify-start gap-6">
              <div className="text-center md:text-left">
                <div className="text-2xl font-black text-white">12</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Rutas</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-2xl font-black text-white">45</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Eventos</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-2xl font-black text-white">2.4k</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Seguidores</div>
              </div>
            </div>
          </div>
          
          <button className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
            <Settings size={24} />
          </button>
        </div>
      </div>

      {/* Garage Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Mi Garaje</h2>
          <button className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-sm font-medium">
            <Plus size={16} /> Añadir Vehículo
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <VehicleCard 
            brand="Honda"
            model="CBR 600RR"
            year="2018"
            type="motorcycle"
            image="https://images.unsplash.com/photo-1606927131353-c0ad17d60b56?auto=format&fit=crop&q=80&w=400"
          />
          <VehicleCard 
            brand="Nissan"
            model="Silvia S15"
            year="2002"
            type="car"
            image="https://images.unsplash.com/photo-1555532686-d0fccaccadcf?auto=format&fit=crop&q=80&w=400"
          />
        </div>
      </div>
    </div>
  );
}

function VehicleCard({ brand, model, year, type, image }: { brand: string; model: string; year: string; type: string; image: string }) {
  return (
    <div className="group relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all">
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
      <img src={image} alt={`${brand} ${model}`} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
      
      <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
        <div className="flex items-center justify-between mb-1">
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider">{brand}</span>
          <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded border border-gray-700">{year}</span>
        </div>
        <h3 className="text-xl font-bold text-white">{model}</h3>
      </div>
    </div>
  );
}
