import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to convert file to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data url prefix (e.g. "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

export const analyzeMedicalImage = async (base64Image: string, prompt: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key missing");
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', // Assuming jpeg for simplicity, but could be png
              data: base64Image
            }
          },
          { text: prompt }
        ]
      },
      config: {
        systemInstruction: "Anda adalah asisten AI medis ahli. Analisis gambar medis ini untuk anomali potensial. Berikan observasi objektif. Selalu sertakan penafian bahwa ini bukan diagnosis medis resmi.",
        temperature: 0.2
      }
    });

    return response.text || "Tidak dapat menghasilkan analisis.";
  } catch (error) {
    console.error("Gemini Image Error:", error);
    throw new Error("Gagal menganalisis citra medis.");
  }
};

export const getClinicalInsight = async (symptoms: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key missing");

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Pasien melaporkan gejala/kondisi berikut: "${symptoms}". \n\nBerikan diagnosis banding (differential diagnosis), saran pemeriksaan penunjang, dan referensi panduan klinis singkat.`,
      config: {
        systemInstruction: "Anda adalah sistem pendukung keputusan klinis. Berikan output terstruktur, profesional, dan berbasis bukti medis. Akhiri dengan penafian hukum.",
        temperature: 0.3
      }
    });
    return response.text || "Tidak ada insight yang dihasilkan.";
  } catch (error) {
    console.error("Gemini Text Error:", error);
    throw new Error("Gagal mengambil insight klinis.");
  }
};

export const generateFinancialSummary = async (data: any): Promise<string> => {
    if (!apiKey) return "API Key diperlukan untuk analisis AI.";
    
    try {
        const dataStr = JSON.stringify(data);
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Analisis data keuangan berikut (Klaim vs BAV BPJS): ${dataStr}. Berikan ringkasan eksekutif singkat tentang kinerja Cost Recovery Rate (CRR) dan area kebocoran pendapatan potensial.`,
            config: {
                temperature: 0.4
            }
        });
        return response.text || "Tidak ada ringkasan.";
    } catch (error) {
        return "Gagal menghasilkan ringkasan keuangan.";
    }
}
