"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Camera, X, RefreshCcw, CheckCircle2, SwitchCamera } from "lucide-react";

interface CameraCaptureProps {
    onCapture: (base64Image: string) => void;
    onClose: () => void;
}

export function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isInitializing, setIsInitializing] = useState(true);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");

    const startCamera = useCallback(async (mode: "environment" | "user") => {
        setIsInitializing(true);
        setError(null);
        try {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }

            const newStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: mode },
                audio: false,
            });

            setStream(newStream);
            if (videoRef.current) {
                videoRef.current.srcObject = newStream;
            }
        } catch (err: any) {
            console.error("Failed to access camera:", err);
            // Fallback to any camera if the requested facingMode fails
            try {
                const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                setStream(fallbackStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = fallbackStream;
                }
            } catch (fallbackErr) {
                setError("Could not access the camera. Please ensure permissions are granted.");
            }
        } finally {
            setIsInitializing(false);
        }
    }, [stream]);

    useEffect(() => {
        startCamera(facingMode);

        // Cleanup on unmount
        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [facingMode]); // Rerun if facingMode changes

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
        }
    };

    const takePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext("2d");
        if (context) {
            // Check if we are using the user camera to mirror the snapshot
            if (facingMode === "user") {
                context.translate(canvas.width, 0);
                context.scale(-1, 1);
            }
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            // Get base64 smaller jpeg
            const imageDataUrl = canvas.toDataURL("image/jpeg", 0.7);
            setCapturedImage(imageDataUrl);
            stopCamera(); // Turn off camera immediately
        }
    };

    const confirmPhoto = () => {
        if (capturedImage) {
            onCapture(capturedImage);
        }
    };

    const retakePhoto = () => {
        setCapturedImage(null);
        startCamera(facingMode); // Turn camera back on
    };

    const toggleCamera = () => {
        setFacingMode(prev => prev === "environment" ? "user" : "environment");
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center animate-in fade-in duration-300">
            <div className="absolute top-6 right-6 z-10 flex gap-4">
                {!capturedImage && (
                    <button onClick={toggleCamera} className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur transition-colors">
                        <SwitchCamera size={24} />
                    </button>
                )}
                <button onClick={onClose} className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur transition-colors">
                    <X size={24} />
                </button>
            </div>

            <div className="w-full max-w-md h-[70vh] relative bg-black rounded-3xl overflow-hidden shadow-2xl">
                {!capturedImage ? (
                    <>
                        {isInitializing && (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                                <p className="animate-pulse">Accessing Camera...</p>
                            </div>
                        )}

                        {error && (
                            <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-red-400 bg-red-950/30">
                                <p>{error}</p>
                            </div>
                        )}

                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className={`w-full h-full object-cover ${error ? "hidden" : ""} ${facingMode === "user" ? "scale-x-[-1]" : ""}`}
                        />

                        {/* Camera Guides */}
                        <div className="absolute inset-0 pointer-events-none opacity-30 border-[1px] border-white/50 m-8 rounded-[2rem]"></div>

                        {/* Capture Button Container */}
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                            <button
                                onClick={takePhoto}
                                disabled={!!error || isInitializing}
                                className="w-20 h-20 rounded-full bg-white/30 border-4 border-white flex items-center justify-center active:scale-95 transition-transform disabled:opacity-50"
                            >
                                <div className="w-16 h-16 rounded-full bg-white"></div>
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />

                        <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between gap-4 bg-gradient-to-t from-black/80 to-transparent">
                            <button
                                onClick={retakePhoto}
                                className="flex-1 bg-white/20 text-white backdrop-blur py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                            >
                                <RefreshCcw size={20} /> Retake
                            </button>
                            <button
                                onClick={confirmPhoto}
                                className="flex-[2] bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg"
                            >
                                <CheckCircle2 size={20} /> Use Photo
                            </button>
                        </div>
                    </>
                )}
            </div>

            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}
