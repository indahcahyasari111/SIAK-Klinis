import React from 'react';
import { ViewState } from '../types';
import { Activity, Users, AlertTriangle, CheckCircle } from 'lucide-react';

interface DashboardProps {
  onChangeView: (view: ViewState) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onChangeView }) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-teal-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Selamat Datang, Koordinator Sistem</h1>
        <p className="opacity-90 max-w-2xl">
          SIAK-Klinis siap membantu pengambilan keputusan strategis. Status operasional rumah sakit saat ini stabil dengan tingkat okupansi 82%.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
            onClick={() => onChangeView('CLINICAL')}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
              <Activity className="text-purple-600" size={24} />
            </div>
            <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">AI Ready</span>
          </div>
          <h3 className="font-semibold text-slate-700">Prediksi Klinis</h3>
          <p className="text-sm text-slate-500 mt-2">Analisis Citra Medis & Diagnosis Banding</p>
        </div>

        <div 
            onClick={() => onChangeView('FINANCIAL')}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <CheckCircle className="text-blue-600" size={24} />
            </div>
             <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-full">BLU</span>
          </div>
          <h3 className="font-semibold text-slate-700">Keuangan & Klaim</h3>
          <p className="text-sm text-slate-500 mt-2">Otomasi Rekonsiliasi JKN & Laporan BAV</p>
        </div>

        <div 
            onClick={() => onChangeView('RME')}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
              <Users className="text-orange-600" size={24} />
            </div>
          </div>
          <h3 className="font-semibold text-slate-700">RME & Data</h3>
          <p className="text-sm text-slate-500 mt-2">Kepatuhan Rekam Medis & Audit Trail</p>
        </div>

        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
           <div className="flex items-center text-red-700 font-semibold mb-2">
             <AlertTriangle size={20} className="mr-2" />
             Perlu Perhatian
           </div>
           <ul className="text-sm text-red-600 space-y-2 mt-2">
             <li>• 3 Klaim BPJS Pending (Dispute)</li>
             <li>• 2 Data RME Tidak Lengkap (2x24 Jam)</li>
           </ul>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Aktivitas Sistem Terbaru</h3>
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start pb-4 border-b border-slate-100 last:border-0">
                        <div className="w-2 h-2 mt-2 bg-slate-300 rounded-full mr-3"></div>
                        <div>
                            <p className="text-sm text-slate-700 font-medium">Analisis CRR Otomatis Selesai</p>
                            <p className="text-xs text-slate-500">Sistem berhasil memproses data transaksi bulan Oktober.</p>
                        </div>
                        <span className="ml-auto text-xs text-slate-400">10m lalu</span>
                    </div>
                ))}
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl shadow-sm text-white flex flex-col justify-center items-center text-center">
             <h3 className="text-lg font-bold mb-2">Gunakan Fitur AI</h3>
             <p className="text-sm text-slate-400 mb-6 max-w-sm">
                Optimalkan diagnosa dan efisiensi operasional dengan bantuan model Gemini Multimodal.
             </p>
             <button 
                onClick={() => onChangeView('CLINICAL')}
                className="bg-teal-500 hover:bg-teal-400 text-white px-6 py-2 rounded-full font-medium transition-colors"
             >
                Mulai Analisis Sekarang
             </button>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
