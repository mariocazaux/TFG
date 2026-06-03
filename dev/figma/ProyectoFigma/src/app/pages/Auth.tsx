import { useState, useEffect, type FormEvent } from "react";
import { useNavigate, useSearchParams, Link } from "react-router";
import { Flame, ArrowRight, Mail, Lock, User } from "lucide-react";
import { cn } from "../../lib/utils";

export function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (searchParams.get("tab") === "register") {
      setIsLogin(false);
    }
  }, [searchParams]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate auth success
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Neon Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 group z-20">
        <Flame className="text-cyan-400 h-8 w-8 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all" />
        <span className="font-bold text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
          RevUp
        </span>
      </Link>

      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 relative z-10 shadow-2xl">
        {/* Toggle Login/Register */}
        <div className="flex bg-gray-950/50 p-1 rounded-xl mb-8 border border-gray-800">
          <button
            onClick={() => setIsLogin(true)}
            className={cn(
              "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
              isLogin 
                ? "bg-gray-800 text-white shadow-md" 
                : "text-gray-400 hover:text-gray-200"
            )}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={cn(
              "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
              !isLogin 
                ? "bg-gray-800 text-white shadow-md" 
                : "text-gray-400 hover:text-gray-200"
            )}
          >
            Registrarse
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-black text-white mb-2">
            {isLogin ? "Bienvenido de nuevo" : "Únete a la ruta"}
          </h2>
          <p className="text-gray-400 text-sm">
            {isLogin 
              ? "Introduce tus credenciales para acceder a tu garaje." 
              : "Crea tu cuenta y empieza a descubrir los mejores trazados."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Nombre de Usuario</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-500" />
                </div>
                <input 
                  type="text" 
                  required
                  placeholder="Ej. AlexRider"
                  className="w-full bg-gray-950/50 border border-gray-800 text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-gray-600"
                />
              </div>
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Correo Electrónico</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-500" />
              </div>
              <input 
                type="email" 
                required
                placeholder="tu@email.com"
                className="w-full bg-gray-950/50 border border-gray-800 text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-gray-600"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contraseña</label>
              {isLogin && <a href="#" className="text-xs text-cyan-400 hover:underline">¿Olvidaste tu contraseña?</a>}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-500" />
              </div>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full bg-gray-950/50 border border-gray-800 text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-gray-600"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-3.5 rounded-xl mt-6 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all flex items-center justify-center gap-2 group"
          >
            {isLogin ? "Acceder" : "Comenzar Motor"}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}
