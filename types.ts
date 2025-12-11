export type ViewState = 'DASHBOARD' | 'CLINICAL' | 'FINANCIAL' | 'RME';

export interface PatientRecord {
  id: string;
  name: string;
  dob: string;
  diagnosis: string;
  lastVisit: string;
  status: 'Rawat Inap' | 'Rawat Jalan' | 'Pulang';
  complianceScore: number; // 0-100 for RME completeness
}

export interface FinancialMetric {
  month: string;
  claimed: number;
  verified: number; // BAV
  pending: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  status: 'Success' | 'Flagged';
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}
