import React, { useState, useRef } from 'react';
import { X, Upload, Camera, Sparkles, RefreshCw, CheckCircle2, ArrowRight, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const WatchAnalysisModal: React.FC = () => {
  const { isWatchAnalysisOpen, closeWatchAnalysis, openProductDetail } = useCart();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [modelUsed, setModelUsed] = useState<string>('gemini-3.1-pro-preview');
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isWatchAnalysisOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please provide a valid image file (JPEG, PNG, WEBP).');
      return;
    }

    setMimeType(file.type);
    setError('');
    setAnalysisResult(null);

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError('');

    try {
      const response = await fetch('/api/analyze-watch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          mimeType: mimeType,
          userPrompt: userPrompt.trim() || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Analysis service error');
      }

      setAnalysisResult(data.analysis);
      setModelUsed(data.modelUsed || 'gemini-3.1-pro-preview');
    } catch (err: any) {
      console.error('Watch Analysis Error:', err);
      setError('Analysis service is currently unavailable. Please verify connection and retry.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAll = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setUserPrompt('');
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={closeWatchAnalysis}
        aria-hidden="true"
      />

      {/* Main Dialog */}
      <div className="relative bg-[#0A0A0A] border border-[#222222] rounded-sm max-w-3xl w-full my-6 shadow-2xl shadow-black z-10 text-[#F4F0E8] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#1A1A1A] bg-[#0E0E0E] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#171717] border border-[#C7A86B]/40 flex items-center justify-center text-[#C7A86B]">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-base tracking-wider uppercase text-[#F4F0E8]">
                Atelier Timepiece & Style Identifier
              </h2>
              <span className="text-[11px] text-[#6F6D68] font-mono">
                Multimodal Image Understanding with Gemini 3.1 Pro Preview
              </span>
            </div>
          </div>

          <button
            onClick={closeWatchAnalysis}
            className="p-1.5 text-[#9C9A94] hover:text-[#F4F0E8] transition-colors rounded-sm"
            aria-label="Close analysis dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {!selectedImage ? (
            /* Upload Drop Area */
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#262626] hover:border-[#C7A86B]/60 bg-[#0E0E0E] hover:bg-[#121212] rounded-sm p-10 text-center cursor-pointer transition-all duration-300 group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-14 h-14 rounded-full bg-[#181818] border border-[#2A2A2A] group-hover:border-[#C7A86B] flex items-center justify-center mx-auto mb-4 text-[#9C9A94] group-hover:text-[#C7A86B] transition-colors">
                <Upload className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg text-[#F4F0E8] mb-1">
                Upload Timepiece or Wrist Photograph
              </h3>
              <p className="text-xs text-[#9C9A94] max-w-sm mx-auto mb-4 font-light leading-relaxed">
                Provide a photo of any mechanical watch, wrist shot, or movement to receive an exhaustive architectural evaluation and curated AUREN recommendation.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#2E2E2E] text-[11px] font-mono uppercase tracking-wider text-[#C7A86B] rounded-sm">
                Select JPEG, PNG, or WEBP
              </div>
            </div>
          ) : (
            /* Image Preview & Analysis Controls */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Thumbnail Preview */}
                <div className="md:col-span-5 relative aspect-square bg-[#111111] border border-[#262626] rounded-sm overflow-hidden">
                  <img
                    src={selectedImage}
                    alt="Watch uploaded by user for Gemini analysis"
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={resetAll}
                    className="absolute top-2 right-2 p-1.5 bg-[#080808]/80 hover:bg-[#080808] border border-[#2A2A2A] text-xs text-[#9C9A94] hover:text-[#F4F0E8] rounded-sm transition-colors"
                    title="Choose a different image"
                  >
                    Change Image
                  </button>
                </div>

                {/* Question & Trigger */}
                <div className="md:col-span-7 flex flex-col justify-between h-full space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#C7A86B] mb-2">
                      Specific Curatorial Question (Optional):
                    </label>
                    <textarea
                      rows={3}
                      value={userPrompt}
                      onChange={e => setUserPrompt(e.target.value)}
                      placeholder="e.g., What case geometry and dial finishing do you observe? Which AUREN timepiece would complement this collection?"
                      className="w-full bg-[#121212] border border-[#262626] focus:border-[#C7A86B] text-xs text-[#F4F0E8] p-3 rounded-sm placeholder-[#555555] focus:outline-none resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="w-full py-3.5 bg-[#C7A86B] hover:bg-[#D8BC82] disabled:opacity-50 text-[#080808] font-semibold text-xs tracking-[0.18em] uppercase transition-colors rounded-sm flex items-center justify-center gap-2 shadow-lg shadow-[#C7A86B]/15"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Consulting Gemini 3.1 Pro Preview...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Initiate Horological Appraisal</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-[#2A1111] border border-[#E57373]/40 text-xs text-[#E57373] rounded-sm font-mono">
                  {error}
                </div>
              )}

              {/* Analysis Result Output */}
              {analysisResult && (
                <div className="mt-6 pt-6 border-t border-[#1C1C1C] space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C7A86B]">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Atelier Horological Assessment Complete</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#6F6D68]">
                      Engine: {modelUsed}
                    </span>
                  </div>

                  <div className="p-6 bg-[#0E0E0E] border border-[#222222] rounded-sm text-xs sm:text-sm text-[#D8D5CE] leading-relaxed whitespace-pre-wrap font-light">
                    {analysisResult}
                  </div>

                  {/* Recommendation Card Shortcut */}
                  <div className="p-4 bg-[#121212] border border-[#262626] rounded-sm flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-mono text-[#C7A86B] tracking-wider">
                        Suggested Atelier Exploration
                      </div>
                      <div className="text-xs font-serif text-[#F4F0E8] mt-0.5">
                        Discover the AUREN Nocturne & Meridian Chronometres
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        closeWatchAnalysis();
                        openProductDetail(PRODUCTS[0]);
                      }}
                      className="px-3.5 py-2 border border-[#C7A86B] hover:bg-[#C7A86B] text-[#C7A86B] hover:text-[#080808] text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Nocturne</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
