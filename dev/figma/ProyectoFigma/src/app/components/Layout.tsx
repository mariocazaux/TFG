import { Outlet, NavLink } from "react-router";
import { type ReactNode } from "react";
import { Map, Calendar, MapPin, User, Flame } from "lucide-react";
import { cn } from "../../lib/utils";

export function Layout() {
  return (
    <div className="flex flex-col h-screen bg-gray-950 text-gray-50 overflow-hidden font-sans">
      {/* Top Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-gray-800 bg-gray-950/80 backdrop-blur-md z-10 lg:pl-64 shrink-0">
        <div className="flex items-center gap-2 lg:hidden">
          <Flame className="text-cyan-400 h-6 w-6" />
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            RevUp
          </span>
        </div>
        <div className="hidden lg:flex items-center gap-2">
          {/* Empty spacer for desktop since sidebar handles logo */}
        </div>
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 rounded-full ring-2 ring-purple-500/50 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWtlciUyMHByb2ZpbGUlMjBwaG90b3xlbnwxfHx8fDE3ODAzMTc3NjN8MA&ixlib=rb-4.1.0&q=80&w=150" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-gray-800 bg-gray-950/50 backdrop-blur fixed top-0 bottom-0 left-0 z-20 pt-6">
          <div className="flex items-center gap-2 px-6 mb-8">
            <Flame className="text-cyan-400 h-8 w-8 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span className="font-bold text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
              RevUp
            </span>
          </div>

          <nav className="flex-1 px-4 flex flex-col gap-2">
            <NavItem to="/app" icon={<Map size={20} />} label="Mapa" />
            <NavItem to="/app/events" icon={<Calendar size={20} />} label="Eventos" />
            <NavItem to="/app/routes" icon={<MapPin size={20} />} label="Rutas" />
            <NavItem to="/app/profile" icon={<User size={20} />} label="Garaje" />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 relative overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden h-16 bg-gray-950/90 backdrop-blur-lg border-t border-gray-800 flex items-center justify-around px-2 shrink-0 z-50">
        <MobileNavItem to="/app" icon={<Map size={24} />} label="Mapa" />
        <MobileNavItem to="/app/events" icon={<Calendar size={24} />} label="Eventos" />
        <MobileNavItem to="/app/routes" icon={<MapPin size={24} />} label="Rutas" />
        <MobileNavItem to="/app/profile" icon={<User size={24} />} label="Garaje" />
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
          isActive
            ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
            : "text-gray-400 hover:text-gray-100 hover:bg-gray-800/50"
        )
      }
    >
      {icon}
      <span className="font-medium">{label}</span>
    </NavLink>
  );
}

function MobileNavItem({ to, icon, label }: { to: string; icon: ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
          isActive
            ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
            : "text-gray-500 hover:text-gray-300"
        )
      }
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </NavLink>
  );
}
