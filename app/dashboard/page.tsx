import React from "react";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  HardDrive, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  ChevronRight,
  Plus
} from "lucide-react";

/**
 * Composant de Carte Statistique (Premium Design)
 */
const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        {trend && (
          <p className="text-xs font-medium text-emerald-600 mt-2 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> {trend}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
  </div>
);

/**
 * Page Principale du Dashboard
 * Note: Dans une version réelle, nous récupérerions ici la session NextAuth
 * pour filtrer par tenantId.
 */
export default function DashboardPage() {
  // Données factices (Mock) pour la démonstration du design
  const projects = [
    { id: 1, name: "Villa Cap Ferret", client: "M. Martin", phase: "APD", progress: 65 },
    { id: 2, name: "Extension Loft Bordeaux", client: "Mme. Leroy", phase: "PC", progress: 40 },
    { id: 3, name: "Rénovation Chai", client: "Domaine de l'Ô", phase: "CHANTIER", progress: 85 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Simple */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">C</div>
            <span className="font-bold text-slate-900">Cobalt ERP</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center space-x-3 p-3 bg-slate-900 text-white rounded-xl">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium text-sm">Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 text-slate-500 hover:bg-slate-50 rounded-xl transition">
            <FileText className="w-5 h-5" />
            <span className="font-medium text-sm">Projets</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 text-slate-500 hover:bg-slate-50 rounded-xl transition">
            <Users className="w-5 h-5" />
            <span className="font-medium text-sm">Portail Client</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 text-slate-500 hover:bg-slate-50 rounded-xl transition">
            <HardDrive className="w-5 h-5" />
            <span className="font-medium text-sm">Matériel</span>
          </a>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="p-4 bg-slate-50 rounded-xl">
            <p className="text-xs text-slate-400">SSD GAMBI_FAST_1TO</p>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2">
              <div className="bg-slate-900 h-1.5 rounded-full w-3/4"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Bonjour, Gambi 👋</h2>
            <p className="text-slate-500">Voici l'état actuel de votre agence aujourd'hui.</p>
          </div>
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium flex items-center shadow-lg hover:shadow-xl transition active:scale-95">
            <Plus className="w-5 h-5 mr-2" /> Nouveau Projet
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            title="Honoraires (Mois)" 
            value="12,450 €" 
            icon={TrendingUp} 
            trend="+12% vs mois dernier" 
            color="bg-emerald-500" 
          />
          <StatCard 
            title="Projets Actifs" 
            value="8" 
            icon={FileText} 
            color="bg-blue-500" 
          />
          <StatCard 
            title="Validations Client" 
            value="3" 
            icon={Clock} 
            color="bg-amber-500" 
          />
          <StatCard 
            title="Facturées" 
            value="5" 
            icon={CheckCircle2} 
            color="bg-indigo-500" 
          />
        </div>

        {/* Projects Section */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Projets en cours</h3>
            <button className="text-sm text-slate-500 font-medium hover:text-slate-900">Voir tout</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                  <th className="px-6 py-4">Projet</th>
                  <th className="px-6 py-4">Phase</th>
                  <th className="px-6 py-4">Avancement</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{p.name}</p>
                      <p className="text-xs text-slate-500">{p.client}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                        {p.phase}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-slate-100 h-2 rounded-full">
                          <div 
                            className="bg-slate-900 h-2 rounded-full transition-all" 
                            style={{ width: `${p.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-500">{p.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition shadow-none hover:shadow-sm">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}