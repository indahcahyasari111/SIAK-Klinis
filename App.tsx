import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ClinicalAgent from './components/ClinicalAgent';
import FinancialAgent from './components/FinancialAgent';
import RMEAgent from './components/RMEAgent';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('DASHBOARD');

  const renderContent = () => {
    switch (currentView) {
      case 'DASHBOARD':
        return <Dashboard onChangeView={setCurrentView} />;
      case 'CLINICAL':
        return <ClinicalAgent />;
      case 'FINANCIAL':
        return <FinancialAgent />;
      case 'RME':
        return <RMEAgent />;
      default:
        return <Dashboard onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar Navigation */}
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />

      {/* Main Content Area */}
      <main className="ml-64 flex-1 overflow-x-hidden">
        {/* Top Header - Purely visual/functional for user context */}
        <header className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
           <div className="flex items-center text-slate-500 text-sm">
             <span className="font-semibold text-slate-700">Rumah Sakit Umum Pusat (Demo)</span>
             <span className="mx-2">/</span>
             <span>{currentView === 'DASHBOARD' ? 'Overview' : currentView}</span>
           </div>
           <div className="flex items-center space-x-4">
             <div className="text-right hidden md:block">
               <p className="text-sm font-medium text-slate-700">dr. Koordinator</p>
               <p className="text-xs text-slate-400">ID: SUPER-ADMIN</p>
             </div>
             <div className="h-8 w-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-xs">
               DK
             </div>
           </div>
        </header>

        {/* Dynamic Content */}
        <div className="py-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
