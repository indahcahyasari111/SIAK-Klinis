import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Wallet, TrendingUp, AlertCircle, FileCheck, RefreshCw } from 'lucide-react';
import { FinancialMetric } from '../types';
import { generateFinancialSummary } from '../services/geminiService';

const mockFinancialData: FinancialMetric[] = [
  { month: 'Jan', claimed: 4500000000, verified: 4200000000, pending: 300000000 },
  { month: 'Feb', claimed: 4800000000, verified: 4600000000, pending: 200000000 },
  { month: 'Mar', claimed: 5100000000, verified: 4700000000, pending: 400000000 },
  { month: 'Apr', claimed: 4200000000, verified: 4150000000, pending: 50000000 },
];

const FinancialAgent: React.FC = () => {
  const [aiSummary, setAiSummary] = useState<string>('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
  };

  const generateReport = async () => {
    setLoadingSummary(true);
    const summary = await generateFinancialSummary(mockFinancialData);
    setAiSummary(summary);
    setLoadingSummary(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
       <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center">
            <Wallet className="mr-2 text-teal-600" /> 
            Sub-Agen Otomasi Siklus Pendapatan
          </h2>
          <p className="text-slate-500">SIA BLU Compliance & Rekonsiliasi Klaim JKN</p>
        </div>
        <button 
          onClick={generateReport}
          disabled={loadingSummary}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors"
        >
          {loadingSummary ? <RefreshCw className="animate-spin mr-2" size={16} /> : <FileCheck className="mr-2" size={16} />}
          Generate Analisis CRR & BAV
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Key Metrics Cards */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-500">Total Klaim (YTD)</h3>
            <div className="p-2 bg-blue-100 rounded-full text-blue-600"><TrendingUp size={16} /></div>
          </div>
          <p className="text-2xl font-bold text-slate-800">Rp 18.6 M</p>
          <p className="text-xs text-green-600 mt-1">+12% vs tahun lalu</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-500">Lolos Verifikasi (BAV)</h3>
            <div className="p-2 bg-green-100 rounded-full text-green-600"><FileCheck size={16} /></div>
          </div>
          <p className="text-2xl font-bold text-slate-800">Rp 17.65 M</p>
          <p className="text-xs text-slate-500 mt-1">94.8% Acceptance Rate</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-500">Pending / Dispute</h3>
            <div className="p-2 bg-red-100 rounded-full text-red-600"><AlertCircle size={16} /></div>
          </div>
          <p className="text-2xl font-bold text-slate-800">Rp 950 Jt</p>
          <p className="text-xs text-red-600 mt-1">Perlu Tindak Lanjut Segera</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="font-semibold text-lg mb-6 text-slate-700">Rekonsiliasi: Klaim RS vs BAV BPJS</h3>
          <div className="flex-1 w-full h-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockFinancialData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value / 1000000000}M`} />
                <Tooltip 
                  formatter={(value: number) => formatRupiah(value)}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Legend />
                <Bar dataKey="claimed" name="Total Klaim RS" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="verified" name="BAV (Lolos)" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Panel */}
        <div className="lg:col-span-1 bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col">
           <h3 className="font-semibold text-lg mb-4 text-slate-700 flex items-center">
             <TrendingUp className="mr-2 text-teal-600" />
             Insight Keuangan Cerdas
           </h3>
           
           <div className="flex-1 overflow-y-auto pr-2">
             {aiSummary ? (
               <div className="text-sm text-slate-600 space-y-3 whitespace-pre-line">
                 {aiSummary}
               </div>
             ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                  <p className="text-sm">Klik "Generate Analisis" untuk mendapatkan laporan otomatis tentang CRR dan gap pendapatan menggunakan model generatif.</p>
                </div>
             )}
           </div>

           {aiSummary && (
             <div className="mt-4 pt-4 border-t border-slate-200">
               <p className="text-xs text-slate-400">
                 *Estimasi CRR dihitung berdasarkan variabel biaya langsung dan tidak langsung yang dialokasikan per unit layanan.
               </p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default FinancialAgent;
