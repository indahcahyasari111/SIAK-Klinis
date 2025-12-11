import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Stethoscope, Wallet, FileText, Activity } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const menuItems = [
    { id: 'DASHBOARD', label: 'Dashboard Utama', icon: LayoutDashboard },
    { id: 'CLINICAL', label: 'Analisis Klinis (Vertex AI)', icon: Stethoscope },
    { id: 'FINANCIAL', label: 'Otomasi Pendapatan (BLU)', icon: Wallet },
    { id: 'RME', label: 'Rekam Medis (RME)', icon: FileText },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 shadow-xl z-50">
      <div className="p-6 border-b border-slate-700 flex items-center space-x-3">
        <div className="p-2 bg-teal-500 rounded-lg">
          <Activity size={24} className="text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight">SIAK-Klinis</h1>
          <p className="text-xs text-slate-400">Koordinator Sistem</p>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id as ViewState)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/50' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 p-3 rounded text-xs text-slate-400">
          <p className="font-semibold text-slate-300">Status Sistem:</p>
          <div className="flex items-center mt-2 space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Online & Aman</span>
          </div>
          <p className="mt-1">Ver: 1.0.4 (Beta)</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
