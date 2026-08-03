import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Check, X, Move } from 'lucide-react';

interface ImageCropperModalProps {
    imageSrc: string;
    onCropSave: (croppedDataUrl: string) => void;
    onCancel: () => void;
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
    imageSrc,
    onCropSave,
    onCancel,
}) => {
    const [zoom, setZoom] = useState<number>(1);
    const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const pinchDistanceRef = useRef<number | null>(null);

    const CROP_SIZE = 240; // Diameter of the crop circle frame in pixels

    // When image loads, store natural dimensions
    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { naturalWidth, naturalHeight } = e.currentTarget;
        setImageDimensions({ width: naturalWidth, height: naturalHeight });
        setOffset({ x: 0, y: 0 });
        setZoom(1);
    };

    // Calculate scaling factors
    const getBaseScale = useCallback(() => {
        if (!imageDimensions.width || !imageDimensions.height) return 1;
        // Minimum scale to cover crop circle
        return Math.max(CROP_SIZE / imageDimensions.width, CROP_SIZE / imageDimensions.height);
    }, [imageDimensions]);

    // Clamp offsets so image doesn't leave crop area
    const clampOffset = useCallback((x: number, y: number, currentZoom: number) => {
        if (!imageDimensions.width || !imageDimensions.height) return { x, y };
        const baseScale = getBaseScale();
        const currentWidth = imageDimensions.width * baseScale * currentZoom;
        const currentHeight = imageDimensions.height * baseScale * currentZoom;

        const maxX = Math.max(0, (currentWidth - CROP_SIZE) / 2);
        const maxY = Math.max(0, (currentHeight - CROP_SIZE) / 2);

        return {
            x: Math.min(maxX, Math.max(-maxX, x)),
            y: Math.min(maxY, Math.max(-maxY, y)),
        };
    }, [imageDimensions, getBaseScale]);

    // Mouse & Touch interaction handlers
    const handlePointerDown = (clientX: number, clientY: number) => {
        setIsDragging(true);
        setDragStart({ x: clientX - offset.x, y: clientY - offset.y });
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
        if (!isDragging) return;
        const rawX = clientX - dragStart.x;
        const rawY = clientY - dragStart.y;
        setOffset(clampOffset(rawX, rawY, zoom));
    };

    const handlePointerUp = () => {
        setIsDragging(false);
        pinchDistanceRef.current = null;
    };

    // Touch event handlers (including pinch zoom)
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
        } else if (e.touches.length === 2) {
            setIsDragging(false);
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            pinchDistanceRef.current = dist;
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 1 && isDragging) {
            handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        } else if (e.touches.length === 2 && pinchDistanceRef.current !== null) {
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            const delta = (dist - pinchDistanceRef.current) * 0.005;
            setZoom((prevZoom) => {
                const newZoom = Math.min(3, Math.max(1, prevZoom + delta));
                setOffset((prevOffset) => clampOffset(prevOffset.x, prevOffset.y, newZoom));
                return newZoom;
            });
            pinchDistanceRef.current = dist;
        }
    };

    const handleZoomChange = (newZoom: number) => {
        const clampedZoom = Math.min(3, Math.max(1, newZoom));
        setZoom(clampedZoom);
        setOffset((prevOffset) => clampOffset(prevOffset.x, prevOffset.y, clampedZoom));
    };

    const handleReset = () => {
        setZoom(1);
        setOffset({ x: 0, y: 0 });
    };

    // Crop rendering to canvas
    const handleSave = () => {
        if (!imgRef.current || !imageDimensions.width || !imageDimensions.height) return;
        setIsProcessing(true);

        try {
            const canvas = document.createElement('canvas');
            const targetSize = 400; // Output high quality square image
            canvas.width = targetSize;
            canvas.height = targetSize;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                setIsProcessing(false);
                return;
            }

            const baseScale = getBaseScale();
            const currentScale = baseScale * zoom;
            const outputScale = targetSize / CROP_SIZE;

            // Render background
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, targetSize, targetSize);

            // Calculate center point of crop frame relative to original image
            const imageRenderWidth = imageDimensions.width * currentScale;
            const imageRenderHeight = imageDimensions.height * currentScale;

            const drawX = (targetSize / 2) - (imageRenderWidth / 2 * outputScale) + (offset.x * outputScale);
            const drawY = (targetSize / 2) - (imageRenderHeight / 2 * outputScale) + (offset.y * outputScale);
            const drawW = imageRenderWidth * outputScale;
            const drawH = imageRenderHeight * outputScale;

            ctx.drawImage(imgRef.current, drawX, drawY, drawW, drawH);

            const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
            onCropSave(croppedDataUrl);
        } catch (err) {
            console.error('Error rendering cropped canvas:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    const baseScale = getBaseScale();
    const currentRenderWidth = imageDimensions.width * baseScale * zoom;
    const currentRenderHeight = imageDimensions.height * baseScale * zoom;

    return (
        <div className="fixed inset-0 z-[3000] bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-4 text-white animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col items-center relative overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between w-full mb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center">
                            <Move className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="text-base font-black text-white uppercase tracking-tight">Recadrer la photo</h3>
                            <p className="text-[10px] text-slate-400 font-semibold">Centrez et ajustez votre visage</p>
                        </div>
                    </div>
                    <button
                        onClick={onCancel}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Crop Stage Container */}
                <div
                    ref={containerRef}
                    onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
                    onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
                    onMouseUp={handlePointerUp}
                    onMouseLeave={handlePointerUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handlePointerUp}
                    className="relative w-[260px] h-[260px] rounded-2xl bg-black flex items-center justify-center overflow-hidden touch-none cursor-grab active:cursor-grabbing shadow-inner border border-slate-800 my-2 select-none"
                >
                    {/* The image being adjusted */}
                    <img
                        ref={imgRef}
                        src={imageSrc}
                        alt="Ajustement photo"
                        onLoad={handleImageLoad}
                        draggable={false}
                        style={{
                            width: `${currentRenderWidth}px`,
                            height: `${currentRenderHeight}px`,
                            transform: `translate(${offset.x}px, ${offset.y}px)`,
                            maxWidth: 'none',
                            maxHeight: 'none',
                            transition: isDragging ? 'none' : 'transform 0.05s ease-out',
                        }}
                        className="pointer-events-none select-none"
                    />

                    {/* Circular Mask Overlay */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        {/* Darkened semi-transparent backdrop outside the circular frame */}
                        <div
                            className="w-[240px] h-[240px] rounded-full relative flex items-center justify-center pointer-events-none"
                            style={{
                                boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.70)',
                            }}
                        >
                            {/* Thin, crisp ring outline around profile crop circle */}
                            <div className="absolute inset-0 rounded-full border-2 border-amber-400 shadow-[0_0_15px_rgba(249,115,22,0.4)] pointer-events-none" />
                            {/* Discrete crosshair guidelines for face centering */}
                            <div className="absolute w-full h-[1px] bg-white/25 pointer-events-none" />
                            <div className="absolute h-full w-[1px] bg-white/25 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Controls Bar */}
                <div className="w-full flex flex-col gap-3 mt-3 px-1">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => handleZoomChange(zoom - 0.25)}
                            className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl active:scale-95 transition-all"
                            title="Dézoomer"
                        >
                            <ZoomOut className="w-4 h-4" />
                        </button>
                        <input
                            type="range"
                            min="1"
                            max="3"
                            step="0.05"
                            value={zoom}
                            onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                            className="flex-1 accent-orange-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                        />
                        <button
                            type="button"
                            onClick={() => handleZoomChange(zoom + 0.25)}
                            className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl active:scale-95 transition-all"
                            title="Zoomer"
                        >
                            <ZoomIn className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="p-2 text-slate-400 hover:text-orange-400 bg-slate-800 hover:bg-slate-700 rounded-xl active:scale-95 transition-all"
                            title="Réinitialiser"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2.5 mt-1">
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isProcessing}
                            className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-2xl active:scale-95 transition-all"
                        >
                            Annuler
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={isProcessing || !imageDimensions.width}
                            className="flex-1 py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-orange-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isProcessing ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Check className="w-4 h-4" />
                                    <span>Valider</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
