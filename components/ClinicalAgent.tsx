import React, { useState, useRef } from 'react';
import { Upload, AlertTriangle, Activity, Brain, FileSearch } from 'lucide-react';
import { analyzeMedicalImage, getClinicalInsight, fileToBase64 } from '../services/geminiService';
import { AnalysisStatus } from '../types';

const ClinicalAgent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'IMAGING' | 'DIAGNOSIS'>('IMAGING');
  const [symptoms, setSymptoms] = useState('');
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [result, setResult] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus(AnalysisStatus.ANALYZING);
    setResult('');
    
    try {
      const base64 = await fileToBase64(file);
      setPreviewImage(base64); // Full base64 string for preview
      
      // Call Gemini
      const analysis = await analyzeMedicalImage(base64, "Identifikasi struktur anatomis dan potensi anomali patologis dalam citra ini.");
      setResult(analysis);
      setStatus(AnalysisStatus.COMPLETED);
    } catch (err) {
      setStatus(AnalysisStatus.ERROR);
      setResult("Gagal memproses gambar. Pastikan API Key valid dan format gambar benar.");
    }
  };

  const handleSymptomSubmit = async () => {
    if (!symptoms.trim()) return;
    setStatus(AnalysisStatus.ANALYZING);
    setResult('');

    try {
      const insight = await getClinicalInsight(symptoms);
      setResult(insight);
      setStatus(AnalysisStatus.COMPLETED);
    } catch (err) {
      setStatus(AnalysisStatus.ERROR);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center">
            <Brain className="mr-2 text-purple-600" /> 
            Sub-Agen Analisis Klinis Prediktif
          </h2>
          <p className="text-slate-500">Powered by Vertex AI & Gemini Multimodal</p>
        </div>
        <div className="flex space-x-2">
           <button 
            onClick={() => { setActiveTab('IMAGING'); setResult(''); setStatus(AnalysisStatus.IDLE); }}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${activeTab === 'IMAGING' ? 'bg-purple-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50 border'}`}
           >
             Analisis Citra Medis
           </button>
           <button 
            onClick={() => { setActiveTab('DIAGNOSIS'); setResult(''); setStatus(AnalysisStatus.IDLE); }}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${activeTab === 'DIAGNOSIS' ? 'bg-purple-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50 border'}`}
           >
             Kueri Diagnosis Cerdas
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
          <h3 className="font-semibold text-lg mb-4 text-slate-700">Input Data Klinis</h3>
          
          {activeTab === 'IMAGING' ? (
            <div className="space-y-4">
              <div 
                className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  accept="image/*"
                />
                {previewImage ? (
                  <img src={`data:image/jpeg;base64,${previewImage}`} alt="Preview" className="max-h-48 mx-auto rounded shadow-sm" />
                ) : (
                  <div className="flex flex-col items-center text-slate-400">
                    <Upload size={32} className="mb-2" />
                    <p className="text-sm">Klik untuk unggah X-Ray/CT/MRI</p>
                    <p className="text-xs mt-1">Format: JPG, PNG</p>
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-500 bg-blue-50 p-3 rounded">
                Sistem akan menggunakan Computer Vision untuk mendeteksi pola yang mungkin terlewat oleh mata manusia.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Masukkan keluhan pasien, tanda vital, dan riwayat singkat..."
                className="w-full h-48 p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSymptomSubmit}
                disabled={status === AnalysisStatus.ANALYZING || !symptoms}
                className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {status === AnalysisStatus.ANALYZING ? 'Memproses...' : 'Analisis Gejala'}
                <FileSearch size={18} className="ml-2" />
              </button>
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-h-[400px] flex flex-col">
          <h3 className="font-semibold text-lg mb-4 text-slate-700 flex items-center justify-between">
            <span>Hasil Analisis AI</span>
            {status === AnalysisStatus.ANALYZING && (
              <span className="flex items-center text-xs text-purple-600 font-medium animate-pulse">
                <Activity size={14} className="mr-1" /> Sedang Berpikir...
              </span>
            )}
          </h3>

          <div className="flex-1 bg-slate-50 rounded-lg p-6 overflow-y-auto border border-slate-100">
            {status === AnalysisStatus.IDLE && (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <Brain size={48} className="mb-4 opacity-20" />
                <p>Menunggu input data klinis untuk diproses...</p>
              </div>
            )}
            
            {status === AnalysisStatus.COMPLETED && (
              <div className="prose prose-sm max-w-none text-slate-700">
                <div className="whitespace-pre-wrap">{result}</div>
              </div>
            )}

            {status === AnalysisStatus.ERROR && (
               <div className="flex items-center text-red-600 bg-red-50 p-4 rounded-lg">
                 <AlertTriangle size={20} className="mr-2" />
                 <p>{result || "Terjadi kesalahan sistem."}</p>
               </div>
            )}
          </div>

          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800 flex items-start">
            <AlertTriangle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
            <p>
              <strong>PERINGATAN (Disclaimer):</strong> Output ini dihasilkan oleh AI (Gemini/Vertex AI) hanya sebagai pendukung keputusan (Decision Support). 
              TIDAK MENGGANTIKAN penilaian profesional medis. Verifikasi selalu diperlukan sebelum tindakan klinis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalAgent;
