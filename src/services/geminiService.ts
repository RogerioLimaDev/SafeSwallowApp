import React from 'react';
import { GoogleGenAI } from "@google/genai";

// Initialize AI Instance once to save resources
let aiInstance: GoogleGenAI | null = null;
const getAI = (): GoogleGenAI => {
  if (!aiInstance) {
    const apiKey = import.meta.env.NEW_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("NEW_GEMINI_API_KEY is missing in import.meta.env");
      throw new Error("API Key do Gemini não encontrada na configuração.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

/**
 * Captures a frame from the video stream and resizes it for faster AI processing.
 */
export const captureFrame = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
  if (!videoRef.current || videoRef.current.readyState < 2) return null;
  
  const video = videoRef.current;
  const tempCanvas = document.createElement('canvas');
  
  const targetWidth = 640;
  const scaleFactor = targetWidth / video.videoWidth;
  const targetHeight = video.videoHeight * scaleFactor;
  
  tempCanvas.width = targetWidth;
  tempCanvas.height = targetHeight;
  
  const tempCtx = tempCanvas.getContext('2d');
  if (!tempCtx) return null;
  
  tempCtx.drawImage(video, 0, 0, targetWidth, targetHeight);
  
  const data = tempCanvas.toDataURL('image/jpeg', 0.7).split(',')[1];
  return data;
};

export const verifyWaterWithGemini = async (imageData: string) => {
  try {
    const ai = getAI();
    
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `As a health application assistant, verify if the user is truly drinking.
              
              CRITERIA FOR YES:
              - Identify the person's mouth and the cup/bottle.
              - There must be PHYSICAL CONTACT between the cup rim and the lips.
              - The person should be tilted as if swallowing.
              
              Is the cup touching the person's mouth as they drink?
              Reply ONLY 'YES' or 'NO'.`
            },
            { inlineData: { mimeType: "image/jpeg", data: imageData } }
          ]
        }
      ]
    });

    const responseText = result.text?.toUpperCase() || "";
    console.log("Gemini API Response:", responseText);
    return responseText.includes("YES") || responseText.includes("SIM");
  } catch (error: any) {
    console.error("Gemini Water Error:", error);
    throw new Error(`Erro na verificação de água: ${error.message || "Falha técnica"}`);
  }
};

export const verifyTongueWithGemini = async (imageData: string) => {
  try {
    const ai = getAI();
    
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "Analyze this image closely. Is the person sticking their tongue out? IMPORTANT: Look for a small round object (pill, candy, or medicine) sitting ON the tongue. If you see the tongue out AND a small object on it, answer 'YES'. Otherwise, answer 'NO'."
            },
            { inlineData: { mimeType: "image/jpeg", data: imageData } }
          ]
        }
      ]
    });

    const responseText = result.text?.toUpperCase() || "";
    console.log("Gemini Tongue Result:", responseText);
    return responseText.includes("YES") || responseText.includes("SIM");
  } catch (error: any) {
    console.error("Gemini Tongue Error:", error);
    throw new Error(`Erro na verificação da língua: ${error.message || "Falha técnica"}`);
  }
};
