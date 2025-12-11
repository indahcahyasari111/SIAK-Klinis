import React from 'react';
import { FileText, ShieldCheck, Clock, Users, Database } from 'lucide-react';
import { PatientRecord, AuditLog } from '../types';

const mockPatients: PatientRecord[] = [
  { id: 'RM-001293', name: 'Budi Santoso', dob: '1980-05-12', diagnosis: 'Hipertensi Grade II', lastVisit: '2023-10-24', status: 'Rawat Jalan', complianceScore: 100 },
  { id: 'RM-001294', name: 'Siti Aminah', dob: '1992-08-22', diagnosis: 'Demam Berdarah Dengue', lastVisit: '2023-10-25', status: 'Rawat Inap', complianceScore: 85 },
  { id: 'RM-001295', name: 'Ahmad Rizki', dob: '1975-01-30', diagnosis: 'Diabetes Melitus Tipe 2', lastVisit: '2023-10-23', status: 'Rawat Jalan', complianceScore: 92 },
  { id: 'RM-001296', name: 'Linda Kusuma', dob: '1988-11-15', diagnosis: 'Fraktur Tibia', lastVisit: '2023-10-25', status: 'Pulang', complianceScore: 100 },
];

const mockAuditLogs: AuditLog[] = [
  { id: 'LOG-8821', timestamp: '2023-10-25 09:12:45', user: 'dr. Andi (Sp.PD)', action: 'UPDATE_DIAGNOSIS', resource: 'RM-001294', status: 'Success' },
  { id: 'LOG-8822', timestamp: '2023-10-25 09:15:20', user: 'Nurse Ratna', action: 'VIEW_LAB_RESULT', resource: 'RM-001294', status: 'Success' },
  { id: 'LOG-8823', timestamp: '2023-10-25 09:30:11', user: 'Admin Billing', action: 'MODIFY_BILLING', resource: 'INV-2231', status: 'Flagged' },
];

const RMEAgent: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
       <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center">
            <FileText className="mr-2 text-blue-600" /> 
            Sub-Agen Rekam Medis Elektronik
          </h2>
          <p className="text-slate-500">Tata Kelola Data, Kepatuhan PMK 24/2022 & Integritas</p>
        </div>
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center">
            <ShieldCheck size={18} className="mr-2" />
            Sistem Terenkripsi & Patuh Regulasi
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Compliance Stats */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
             <h3 className="font-semibold text-lg text-slate-700">Database Pasien Terintegrasi</h3>
             <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">Real-time Sync</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                <tr>
                  <th className="px-6 py-3">No. RM</th>
                  <th className="px-6 py-3">Nama Pasien</th>
                  <th className="px-6 py-3">Diagnosis Utama</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Kualitas Data</th>
                  <th className="px-6 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mockPatients.map((patient) => (
                  <tr key={patient.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{patient.id}</td>
                    <td className="px-6 py-4">{patient.name}</td>
                    <td className="px-6 py-4 truncate max-w-[200px]">{patient.diagnosis}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${patient.status === 'Rawat Inap' ? 'bg-orange-100 text-orange-700' : 
                          patient.status === 'Rawat Jalan' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-full bg-slate-200 rounded-full h-2.5 mr-2 max-w-[80px]">
                          <div className={`h-2.5 rounded-full ${patient.complianceScore === 100 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${patient.complianceScore}%` }}></div>
                        </div>
                        <span className="text-xs text-slate-500">{patient.complianceScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">Detail</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Log Panel */}
        <div className="lg:col-span-1 bg-slate-800 text-slate-300 rounded-xl shadow-lg flex flex-col h-full">
          <div className="p-5 border-b border-slate-700">
            <h3 className="font-semibold text-white flex items-center">
              <Database className="mr-2" size={18} />
              Audit Trail Log
            </h3>
            <p className="text-xs text-slate-400 mt-1">Pemantauan Integritas Data</p>
          </div>
          <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[400px]">
            {mockAuditLogs.map((log) => (
              <div key={log.id} className="bg-slate-700/50 p-3 rounded border border-slate-700 text-xs">
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${log.status === 'Success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {log.status}
                  </span>
                  <span className="text-slate-500 flex items-center">
                    <Clock size={10} className="mr-1" /> {log.timestamp.split(' ')[1]}
                  </span>
                </div>
                <p className="text-slate-200 font-mono mb-1">{log.action}</p>
                <div className="flex items-center text-slate-400">
                  <Users size={12} className="mr-1" /> {log.user}
                </div>
                <div className="mt-1 text-slate-500 italic">Res: {log.resource}</div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-slate-900/50 border-t border-slate-700 text-center">
            <button className="text-xs text-blue-400 hover:text-blue-300 hover:underline">Lihat Log Lengkap (2x24 Jam)</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RMEAgent;
