import { Link } from "react-router";
import { Flame, Map, Users, Star } from "lucide-react";

export function Landing() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col relative overflow-hidden font-sans">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 opacity-30 mix-blend-screen z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1555532686-d0fccaccadcf?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/40 via-gray-950/80 to-gray-950 z-0" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 lg:px-12">
        <div className="flex items-center gap-2">
          <Flame className="text-cyan-400 h-8 w-8 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <span className="font-bold text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            RevUp
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            to="/auth" 
            className="text-gray-300 hover:text-white font-medium transition-colors"
          >
            Iniciar Sesión
          </Link>
          <Link 
            to="/auth?tab=register" 
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-5 py-2 rounded-xl font-medium shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105 transition-transform"
          >
            Registrarse
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto w-full mt-12 mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-medium mb-8 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
          <Star size={14} />
          <span>La red social para amantes del motor</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
          Encuentra tu próxima <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 filter drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            Ruta y Concentración
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl">
          Únete a miles de moteros y apasionados de los coches. Descubre trazados épicos, asiste a eventos locales y comparte tu garaje con el mundo.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/auth?tab=register" 
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <Users size={20} />
            Únete a la Comunidad
          </Link>
          <Link 
            to="/app" 
            className="px-8 py-4 rounded-xl bg-gray-900 border border-gray-700 text-white font-bold text-lg hover:border-gray-500 hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
          >
            <Map size={20} />
            Explorar Mapa
          </Link>
        </div>
      </main>
    </div>
  );
}
