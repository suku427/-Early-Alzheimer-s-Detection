// // // // import { useEffect, useRef, useState } from "react";
// // // // import { useNavigate } from "react-router";
// // // // import { ArrowLeft, Eraser, CheckCircle2, RotateCcw } from "lucide-react";
// // // // import { toast } from "sonner";

// // // // interface Point {
// // // //   x: number;
// // // //   y: number;
// // // //   pressure: number;
// // // //   time: number;
// // // // }

// // // // export function Assessment() {
// // // //   const navigate = useNavigate();
// // // //   const canvasRef = useRef<HTMLCanvasElement>(null);
// // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // //   const [isDrawing, setIsDrawing] = useState(false);
// // // //   const [points, setPoints] = useState<Point[]>([]);
// // // //   const [hasDrawn, setHasDrawn] = useState(false);

// // // //   // // Spiral guide drawing function
// // // //   // const drawGuide = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
// // // //   //   ctx.beginPath();
// // // //   //   const centerX = width / 2;
// // // //   //   const centerY = height / 2;
// // // //   //   // Scale spiral based on canvas size, but cap it so it doesn't get too huge on desktop
// // // //   //   const scale = Math.min(width, height) * 0.008; 
    
// // // //   //   // Draw spiral
// // // //   //   for (let i = 0; i < 150; i++) {
// // // //   //     const angle = 0.1 * i;
// // // //   //     const x = centerX + (5 + angle * 4) * Math.cos(angle) * scale * 5;
// // // //   //     const y = centerY + (5 + angle * 4) * Math.sin(angle) * scale * 5;
// // // //   //     if (i === 0) {
// // // //   //       ctx.moveTo(x, y);
// // // //   //     } else {
// // // //   //       ctx.lineTo(x, y);
// // // //   //     }
// // // //   //   }
    
// // // //   //   ctx.strokeStyle = "#cbd5e1"; // slate-300
// // // //   //   ctx.lineWidth = 2;
// // // //   //   ctx.setLineDash([5, 5]);
// // // //   //   ctx.stroke();
// // // //   //   ctx.setLineDash([]);
// // // //   // };
// // // //   const drawGuide = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
// // // //     ctx.beginPath();
// // // //     const centerX = width / 2;
// // // //     const centerY = height / 2;

// // // //     // Make the circle take up 70% of the canvas height/width
// // // //     const radius = Math.min(width, height) * 0.35;

// // // //     ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);

// // // //     ctx.strokeStyle = "#cbd5e1"; // Light slate gray
// // // //     ctx.lineWidth = 3;           // Slightly thicker guide
// // // //     ctx.setLineDash([10, 10]);   // Clean, distinct dashes
// // // //     ctx.stroke();
// // // //     ctx.setLineDash([]);         // Reset dash for the actual drawing pen
// // // //   };

// // // //   useEffect(() => {
// // // //     const canvas = canvasRef.current;
// // // //     const container = containerRef.current;
// // // //     if (!canvas || !container) return;

// // // //     const ctx = canvas.getContext("2d");
// // // //     if (!ctx) return;

// // // //     const resizeCanvas = () => {
// // // //       // Set actual canvas size to match display size for sharpness
// // // //       canvas.width = container.clientWidth;
// // // //       canvas.height = container.clientHeight;
      
// // // //       ctx.lineCap = "round";
// // // //       ctx.lineJoin = "round";
// // // //       ctx.strokeStyle = "#1d4ed8"; // blue-700
// // // //       ctx.lineWidth = 3;
      
// // // //       // Redraw guide
// // // //       drawGuide(ctx, canvas.width, canvas.height);
      
// // // //       // Note: In a real app we'd need to redraw the user's strokes here too if resizing happens
// // // //     };

// // // //     resizeCanvas();
// // // //     window.addEventListener("resize", resizeCanvas);
// // // //     return () => window.removeEventListener("resize", resizeCanvas);
// // // //   }, []);

// // // //   const getCoordinates = (event: React.PointerEvent | PointerEvent) => {
// // // //     const canvas = canvasRef.current;
// // // //     if (!canvas) return { x: 0, y: 0, pressure: 0.5 };

// // // //     const rect = canvas.getBoundingClientRect();
// // // //     return {
// // // //       x: event.clientX - rect.left,
// // // //       y: event.clientY - rect.top,
// // // //       pressure: event.pressure || 0.5,
// // // //     };
// // // //   };

// // // //   const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
// // // //     const { x, y, pressure } = getCoordinates(e);
// // // //     const ctx = canvasRef.current?.getContext("2d");
// // // //     if (!ctx) return;

// // // //     setIsDrawing(true);
// // // //     setHasDrawn(true);
    
// // // //     ctx.beginPath();
// // // //     ctx.moveTo(x, y);
    
// // // //     const newPoint = { x, y, pressure, time: Date.now() };
// // // //     setPoints([newPoint]);
// // // //   };

// // // //   const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
// // // //     if (!isDrawing) return;
    
// // // //     const { x, y, pressure } = getCoordinates(e);
// // // //     const ctx = canvasRef.current?.getContext("2d");
// // // //     if (!ctx) return;

// // // //     ctx.lineTo(x, y);
// // // //     ctx.stroke();

// // // //     const newPoint = { x, y, pressure, time: Date.now() };
// // // //     setPoints(prev => [...prev, newPoint]);
// // // //   };

// // // //   const stopDrawing = () => {
// // // //     setIsDrawing(false);
// // // //     const ctx = canvasRef.current?.getContext("2d");
// // // //     ctx?.closePath();
// // // //   };

// // // //   const clearCanvas = () => {
// // // //     const canvas = canvasRef.current;
// // // //     if (!canvas) return;
    
// // // //     const ctx = canvas.getContext("2d");
// // // //     if (!ctx) return;
    
// // // //     ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // //     drawGuide(ctx, canvas.width, canvas.height);
// // // //     setPoints([]);
// // // //     setHasDrawn(false);
// // // //   };
// // // //   // const handleSubmit = async () => {
// // // //   //   if (points.length < 50) {
// // // //   //     toast.error("Please trace the entire spiral before submitting.");
// // // //   //     return;
// // // //   //   }
// // // //   const response = await fetch("http://localhost:5000/predict", {
// // // //     method: "POST",
// // // //     headers: { "Content-Type": "application/json" },
// // // //     body: JSON.stringify({
// // // //       points: drawnPoints, // From your Canvas
// // // //       speech_text: textInput // From your Textarea
// // // //     }),
// // // //   });

// // // //     const loadingToastId = toast.loading('Sending data to AI Model...');

// // // //     try {
// // // //       // Send the points to your Python Flask backend!
// // // //       // Notice the payload format matches what Flask expects: { drawing: points }
// // // //       const response = await fetch('http://127.0.0.1:5000/predict', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify({ drawing: points })
// // // //       });

// // // //       if (!response.ok) throw new Error("API failed");

// // // //       const apiResult = await response.json();

// // // //       toast.success('Analysis complete!', { id: loadingToastId });

// // // //       // Navigate to Results page and pass the AI response data
// // // //       setTimeout(() => {
// // // //         navigate("/results", { state: { aiData: apiResult } });
// // // //       }, 1000);

// // // //     } catch (error) {
// // // //       console.error(error);
// // // //       toast.error('Failed to connect to AI server. Is Flask running?', { id: loadingToastId });
// // // //     }
// // // //   };
// // // //   // const handleSubmit = () => {
// // // //   //   if (points.length < 50) {
// // // //   //     toast.error("Please trace the entire spiral before submitting.");
// // // //   //     return;
// // // //   //   }
    
// // // //   //   toast.promise(
// // // //   //     new Promise((resolve) => setTimeout(resolve, 2000)),
// // // //   //     {
// // // //   //       loading: 'Analyzing motor patterns...',
// // // //   //       success: 'Assessment complete',
// // // //   //       error: 'Analysis failed',
// // // //   //     }
// // // //   //   );

// // // //   //   setTimeout(() => {
// // // //   //     navigate("/results", { state: { points } });
// // // //   //   }, 2000);
// // // //   // };

// // // //   return (
// // // //     <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
// // // //       {/* Header */}
// // // //       <div className="flex items-center justify-between">
// // // //         <div className="flex items-center gap-4">
// // // //           <button 
// // // //             onClick={() => navigate("/")}
// // // //             className="p-2 bg-white rounded-lg border border-slate-200 text-slate-500 hover:text-blue-700 hover:border-blue-300 transition-colors"
// // // //           >
// // // //             <ArrowLeft size={20} />
// // // //           </button>
// // // //           <div>
// // // //             <h1 className="text-2xl font-bold text-slate-900">Motor Assessment</h1>
// // // //             <p className="text-slate-500 text-sm">Patient: John Doe • Session ID: #8821</p>
// // // //           </div>
// // // //         </div>
        
// // // //         <div className="flex items-center gap-3">
// // // //            <button
// // // //             onClick={clearCanvas}
// // // //             className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
// // // //           >
// // // //             <RotateCcw size={16} />
// // // //             Reset Canvas
// // // //           </button>
// // // //           <button
// // // //             onClick={handleSubmit}
// // // //             disabled={!hasDrawn}
// // // //             className="px-6 py-2 bg-blue-700 text-white font-bold rounded-lg shadow-sm shadow-blue-200 hover:bg-blue-800 disabled:opacity-50 disabled:shadow-none transition-all flex items-center gap-2"
// // // //           >
// // // //             <CheckCircle2 size={18} />
// // // //             Submit Analysis
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* Main Drawing Area */}
// // // //       <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
        
// // // //         {/* Instructions / Sidebar */}
// // // //         <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col gap-6">
// // // //           <div>
// // // //             <h3 className="font-bold text-slate-900 mb-2">Instructions</h3>
// // // //             <p className="text-sm text-slate-600 leading-relaxed">
// // // //               Please ask the patient to trace the circle shown on the canvas. 
// // // //               Encourage them to:
// // // //             </p>
// // // //             <ul className="list-disc list-inside text-sm text-slate-600 mt-2 space-y-1">
// // // //               <li>Keep the stylus on the screen</li>
// // // //               <li>Move at a comfortable pace</li>
// // // //               <li>Avoid lifting their hand</li>
// // // //             </ul>
// // // //           </div>
          
// // // //           <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
// // // //             <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">Live Telemetry</h4>
// // // //             <div className="space-y-3">
// // // //                <div className="flex justify-between text-sm">
// // // //                  <span className="text-slate-500">Status</span>
// // // //                  <span className={`font-medium ${isDrawing ? 'text-green-600' : 'text-slate-400'}`}>
// // // //                    {isDrawing ? 'Recording...' : 'Idle'}
// // // //                  </span>
// // // //                </div>
// // // //                <div className="flex justify-between text-sm">
// // // //                  <span className="text-slate-500">Data Points</span>
// // // //                  <span className="font-medium text-slate-900">{points.length}</span>
// // // //                </div>
// // // //                <div className="flex justify-between text-sm">
// // // //                  <span className="text-slate-500">Duration</span>
// // // //                  <span className="font-medium text-slate-900">
// // // //                    {points.length > 0 ? ((points[points.length-1].time - points[0].time)/1000).toFixed(1) : 0}s
// // // //                  </span>
// // // //                </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Canvas */}
// // // //         <div className="flex-1 relative bg-slate-50/50 p-8 flex items-center justify-center">
// // // //             <div 
// // // //               ref={containerRef}
// // // //               className="w-full h-full max-w-3xl max-h-[800px] bg-white rounded-xl shadow-sm border border-slate-200 relative cursor-crosshair"
// // // //             >
// // // //               <canvas
// // // //                 ref={canvasRef}
// // // //                 onPointerDown={startDrawing}
// // // //                 onPointerMove={draw}
// // // //                 onPointerUp={stopDrawing}
// // // //                 onPointerLeave={stopDrawing}
// // // //                 className="absolute inset-0 w-full h-full touch-none rounded-xl"
// // // //                 style={{ touchAction: 'none' }}
// // // //               />
// // // //             </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // import React, { useEffect, useRef, useState } from "react";
// // // import { useNavigate } from "react-router";
// // // import { ArrowLeft, CheckCircle2, RotateCcw, Mic, MousePointerClick } from "lucide-react";
// // // import { toast } from "sonner";

// // // // FIXED IMPORTS
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
// // // import { Textarea } from "../components/ui/textarea";

// // // interface Point {
// // //   x: number;
// // //   y: number;
// // //   pressure: number;
// // //   time: number;
// // // }

// // // export function Assessment() {
// // //   const navigate = useNavigate();

// // //   // --- Drawing State ---
// // //   const canvasRef = useRef<HTMLCanvasElement>(null);
// // //   const containerRef = useRef<HTMLDivElement>(null);
// // //   const [isDrawing, setIsDrawing] = useState(false);
// // //   const [points, setPoints] = useState<Point[]>([]);
// // //   const [hasDrawn, setHasDrawn] = useState(false);

// // //   // --- Speech State ---
// // //   const [speechText, setSpeechText] = useState("");

// // //   const drawGuide = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
// // //     ctx.beginPath();
// // //     const centerX = width / 2;
// // //     const centerY = height / 2;

// // //     // Make the circle take up 70% of the canvas height/width
// // //     const radius = Math.min(width, height) * 0.35;

// // //     ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);

// // //     ctx.strokeStyle = "#cbd5e1"; // Light slate gray
// // //     ctx.lineWidth = 3;           // Slightly thicker guide
// // //     ctx.setLineDash([10, 10]);   // Clean, distinct dashes
// // //     ctx.stroke();
// // //     ctx.setLineDash([]);         // Reset dash for the actual drawing pen
// // //   };

// // //   useEffect(() => {
// // //     const canvas = canvasRef.current;
// // //     const container = containerRef.current;
// // //     if (!canvas || !container) return;

// // //     const ctx = canvas.getContext("2d");
// // //     if (!ctx) return;

// // //     const resizeCanvas = () => {
// // //       // Set actual canvas size to match display size for sharpness
// // //       canvas.width = container.clientWidth;
// // //       canvas.height = container.clientHeight;

// // //       ctx.lineCap = "round";
// // //       ctx.lineJoin = "round";
// // //       ctx.strokeStyle = "#1d4ed8"; // blue-700
// // //       ctx.lineWidth = 3;

// // //       // Redraw guide
// // //       drawGuide(ctx, canvas.width, canvas.height);
// // //     };

// // //     resizeCanvas();
// // //     window.addEventListener("resize", resizeCanvas);
// // //     return () => window.removeEventListener("resize", resizeCanvas);
// // //   }, []);

// // //   const getCoordinates = (event: React.PointerEvent | PointerEvent) => {
// // //     const canvas = canvasRef.current;
// // //     if (!canvas) return { x: 0, y: 0, pressure: 0.5 };

// // //     const rect = canvas.getBoundingClientRect();
// // //     return {
// // //       x: event.clientX - rect.left,
// // //       y: event.clientY - rect.top,
// // //       pressure: event.pressure || 0.5,
// // //     };
// // //   };

// // //   const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
// // //     const { x, y, pressure } = getCoordinates(e);
// // //     const ctx = canvasRef.current?.getContext("2d");
// // //     if (!ctx) return;

// // //     setIsDrawing(true);
// // //     setHasDrawn(true);

// // //     ctx.beginPath();
// // //     ctx.moveTo(x, y);

// // //     const newPoint = { x, y, pressure, time: Date.now() };
// // //     setPoints([newPoint]);
// // //   };

// // //   const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
// // //     if (!isDrawing) return;

// // //     const { x, y, pressure } = getCoordinates(e);
// // //     const ctx = canvasRef.current?.getContext("2d");
// // //     if (!ctx) return;

// // //     ctx.lineTo(x, y);
// // //     ctx.stroke();

// // //     const newPoint = { x, y, pressure, time: Date.now() };
// // //     setPoints(prev => [...prev, newPoint]);
// // //   };

// // //   const stopDrawing = () => {
// // //     setIsDrawing(false);
// // //     const ctx = canvasRef.current?.getContext("2d");
// // //     ctx?.closePath();
// // //   };

// // //   const clearCanvas = () => {
// // //     const canvas = canvasRef.current;
// // //     if (!canvas) return;

// // //     const ctx = canvas.getContext("2d");
// // //     if (!ctx) return;

// // //     ctx.clearRect(0, 0, canvas.width, canvas.height);
// // //     drawGuide(ctx, canvas.width, canvas.height);
// // //     setPoints([]);
// // //     setHasDrawn(false);
// // //   };

// // //   const handleSubmit = async () => {
// // //     // If we only have a few points, block it.
// // //     if (points.length < 10) {
// // //       toast.error("Please provide sufficient drawing data before submitting.");
// // //       return;
// // //     }

// // //     const loadingToastId = toast.loading('Processing Multimodal Late Fusion...');

// // //     try {
// // //       // Send both the points (Modality A) and the speech text (Modality B)
// // //       const response = await fetch('http://127.0.0.1:5000/predict', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({
// // //           drawing: points,
// // //           speech_text: speechText
// // //         })
// // //       });

// // //       if (!response.ok) throw new Error("API failed");

// // //       const apiResult = await response.json();

// // //       toast.success('Cognitive Risk Score Generated!', { id: loadingToastId });

// // //       // Navigate to Results page and pass the complete multimodal AI response
// // //       setTimeout(() => {
// // //         navigate("/results", { state: { aiData: apiResult } });
// // //       }, 1000);

// // //     } catch (error) {
// // //       console.error(error);
// // //       toast.error('Failed to connect to Neurova server. Is Flask running?', { id: loadingToastId });
// // //     }
// // //   };

// // //   return (
// // //     <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
// // //       {/* Header */}
// // //       <div className="flex items-center justify-between">
// // //         <div className="flex items-center gap-4">
// // //           <button
// // //             onClick={() => navigate("/")}
// // //             className="p-2 bg-white rounded-lg border border-slate-200 text-slate-500 hover:text-blue-700 hover:border-blue-300 transition-colors"
// // //           >
// // //             <ArrowLeft size={20} />
// // //           </button>
// // //           <div>
// // //             <h1 className="text-2xl font-bold text-slate-900">Multimodal Assessment</h1>
// // //             <p className="text-slate-500 text-sm">Patient: John Doe • Session ID: #8821</p>
// // //           </div>
// // //         </div>

// // //         <div className="flex items-center gap-3">
// // //           <button
// // //             onClick={handleSubmit}
// // //             disabled={!hasDrawn}
// // //             className="px-6 py-2 bg-blue-700 text-white font-bold rounded-lg shadow-sm shadow-blue-200 hover:bg-blue-800 disabled:opacity-50 disabled:shadow-none transition-all flex items-center gap-2"
// // //           >
// // //             <CheckCircle2 size={18} />
// // //             Submit Fusion Analysis
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Main Assessment Area with Tabs */}
// // //       <Tabs defaultValue="motor" className="flex-1 flex flex-col min-h-0">
// // //         <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto mb-6 bg-slate-100 p-1 rounded-xl">
// // //           <TabsTrigger value="motor" className="rounded-lg py-2">Motor</TabsTrigger>
// // //           <TabsTrigger value="speech" className="rounded-lg py-2">Speech</TabsTrigger>
// // //           <TabsTrigger value="behavioral" className="rounded-lg py-2">Behavior</TabsTrigger>
// // //         </TabsList>

// // //         {/* TAB 1: MODALITY A (MOTOR/HANDWRITING) */}
// // //         <TabsContent value="motor" className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row min-h-0 data-[state=active]:flex m-0">
// // //           <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col gap-6 overflow-y-auto">
// // //             <div>
// // //               <h3 className="font-bold text-slate-900 mb-2">Motor Task</h3>
// // //               <p className="text-sm text-slate-600 leading-relaxed">
// // //                 Please ask the patient to trace the circle shown on the canvas.
// // //               </p>
// // //               <ul className="list-disc list-inside text-sm text-slate-600 mt-2 space-y-1">
// // //                 <li>Keep the stylus on the screen</li>
// // //                 <li>Move at a comfortable pace</li>
// // //               </ul>
// // //             </div>

// // //             <button
// // //               onClick={clearCanvas}
// // //               className="w-full py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
// // //             >
// // //               <RotateCcw size={16} />
// // //               Reset Canvas
// // //             </button>

// // //             <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-auto">
// // //               <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">Live Telemetry</h4>
// // //               <div className="space-y-3">
// // //                 <div className="flex justify-between text-sm">
// // //                   <span className="text-slate-500">Status</span>
// // //                   <span className={`font-medium ${isDrawing ? 'text-green-600' : 'text-slate-400'}`}>
// // //                     {isDrawing ? 'Recording...' : 'Idle'}
// // //                   </span>
// // //                 </div>
// // //                 <div className="flex justify-between text-sm">
// // //                   <span className="text-slate-500">Data Points</span>
// // //                   <span className="font-medium text-slate-900">{points.length}</span>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <div className="flex-1 relative bg-slate-50/50 p-8 flex items-center justify-center overflow-hidden">
// // //             <div
// // //               ref={containerRef}
// // //               className="w-full h-full max-w-3xl max-h-[800px] bg-white rounded-xl shadow-sm border border-slate-200 relative cursor-crosshair overflow-hidden"
// // //             >
// // //               <canvas
// // //                 ref={canvasRef}
// // //                 onPointerDown={startDrawing}
// // //                 onPointerMove={draw}
// // //                 onPointerUp={stopDrawing}
// // //                 onPointerLeave={stopDrawing}
// // //                 className="absolute inset-0 w-full h-full touch-none"
// // //                 style={{ touchAction: 'none' }}
// // //               />
// // //             </div>
// // //           </div>
// // //         </TabsContent>

// // //         {/* TAB 2: MODALITY B (SPEECH MOCKUP) */}
// // //         <TabsContent value="speech" className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row min-h-0 data-[state=active]:flex m-0">
// // //           <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col gap-6 overflow-y-auto">
// // //             <div>
// // //               <h3 className="font-bold text-slate-900 mb-2">Speech Task (Pitt Corpus)</h3>
// // //               <p className="text-sm text-slate-600 leading-relaxed">
// // //                 Ask the patient to describe everything they see going on in the "Cookie Theft" picture.
// // //               </p>
// // //             </div>

// // //             <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mt-auto">
// // //               <p className="text-xs text-amber-800">
// // //                 <strong>Demo Note:</strong> Type the transcript manually below to pass it to the NLP model, or leave blank to simulate a healthy baseline.
// // //               </p>
// // //             </div>
// // //           </div>
// // //           <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50/50">
// // //             <div className="max-w-2xl w-full flex flex-col items-center gap-6">
// // //               {/* Mock Image for Cookie Theft */}
// // //               <div className="w-full aspect-video bg-slate-200 rounded-xl border border-slate-300 flex items-center justify-center overflow-hidden relative">
// // //                 <img src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Cookie_Theft_Picture.png" alt="Cookie Theft" className="object-contain h-full opacity-80" />
// // //                 <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl"></div>
// // //               </div>

// // //               <div className="w-full flex gap-4">
// // //                 <button className="shrink-0 p-4 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors flex items-center justify-center">
// // //                   <Mic className="text-slate-600" size={24} />
// // //                 </button>
// // //                 <Textarea
// // //                   placeholder="Patient transcript goes here..."
// // //                   className="flex-1 min-h-[120px] resize-none text-base p-4 rounded-xl"
// // //                   value={speechText}
// // //                   onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSpeechText(e.target.value)}
// // //                 />
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </TabsContent>

// // //         {/* TAB 3: MODALITY C (BEHAVIORAL MOCKUP) */}
// // //         <TabsContent value="behavioral" className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row min-h-0 data-[state=active]:flex m-0">
// // //           <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col gap-6 overflow-y-auto">
// // //             <div>
// // //               <h3 className="font-bold text-slate-900 mb-2">Behavioral Task</h3>
// // //               <p className="text-sm text-slate-600 leading-relaxed">
// // //                 Finger Tapping Test. The patient must tap the button as fast as possible for 10 seconds.
// // //               </p>
// // //             </div>
// // //             <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mt-auto">
// // //               <p className="text-xs text-amber-800">
// // //                 <strong>Demo Note:</strong> This tab is visually mocked for the presentation. The backend will simulate a 0.65 risk score for this modality during fusion.
// // //               </p>
// // //             </div>
// // //           </div>
// // //           <div className="flex-1 flex items-center justify-center p-8 bg-slate-50/50">
// // //             <div className="text-center flex flex-col items-center gap-8">
// // //               <div className="text-6xl font-bold text-slate-300 font-mono tracking-tighter">00:10</div>
// // //               <button className="w-48 h-48 rounded-full bg-blue-100 border-4 border-blue-500 flex items-center justify-center shadow-lg shadow-blue-200/50 hover:bg-blue-200 active:scale-95 transition-all">
// // //                 <MousePointerClick size={48} className="text-blue-600" />
// // //               </button>
// // //               <p className="text-slate-500 font-medium">Tap repeatedly when ready</p>
// // //             </div>
// // //           </div>
// // //         </TabsContent>
// // //       </Tabs>
// // //     </div>
// // //   );
// // // // }
// // // import React, { useEffect, useRef, useState } from "react";
// // // import { useNavigate } from "react-router";
// // // import { ArrowLeft, CheckCircle2, RotateCcw, Mic, MousePointerClick, ArrowRight } from "lucide-react";
// // // import { toast } from "sonner";
// // // import { Textarea } from "../components/ui/textarea";

// // // interface Point {
// // //   x: number;
// // //   y: number;
// // //   pressure: number;
// // //   time: number;
// // // }

// // // export function Assessment() {
// // //   const navigate = useNavigate();

// // //   // --- Wizard State ---
// // //   const [step, setStep] = useState(1);

// // //   // --- Drawing State (Modality A) ---
// // //   const canvasRef = useRef<HTMLCanvasElement>(null);
// // //   const containerRef = useRef<HTMLDivElement>(null);
// // //   const [isDrawing, setIsDrawing] = useState(false);
// // //   const [points, setPoints] = useState<Point[]>([]);
// // //   const [hasDrawn, setHasDrawn] = useState(false);

// // //   // --- Speech State (Modality B) ---
// // //   const [speechText, setSpeechText] = useState("");

// // //   // --- Behavioral State (Modality C) ---
// // //   const [behaviorCompleted, setBehaviorCompleted] = useState(false);

// // //   // --- Canvas Logic ---
// // //   const drawGuide = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
// // //     ctx.beginPath();
// // //     const centerX = width / 2;
// // //     const centerY = height / 2;
// // //     const radius = Math.min(width, height) * 0.35;

// // //     ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
// // //     ctx.strokeStyle = "#cbd5e1";
// // //     ctx.lineWidth = 3;
// // //     ctx.setLineDash([10, 10]);
// // //     ctx.stroke();
// // //     ctx.setLineDash([]);
// // //   };

// // //   useEffect(() => {
// // //     if (step !== 1) return; // Only run canvas resize logic if on step 1

// // //     const canvas = canvasRef.current;
// // //     const container = containerRef.current;
// // //     if (!canvas || !container) return;

// // //     const ctx = canvas.getContext("2d");
// // //     if (!ctx) return;

// // //     const resizeCanvas = () => {
// // //       canvas.width = container.clientWidth;
// // //       canvas.height = container.clientHeight;
// // //       ctx.lineCap = "round";
// // //       ctx.lineJoin = "round";
// // //       ctx.strokeStyle = "#1d4ed8";
// // //       ctx.lineWidth = 3;
// // //       drawGuide(ctx, canvas.width, canvas.height);

// // //       // Redraw existing points if they went back a step
// // //       if (points.length > 0) {
// // //         ctx.beginPath();
// // //         ctx.moveTo(points[0].x, points[0].y);
// // //         for (let i = 1; i < points.length; i++) {
// // //           ctx.lineTo(points[i].x, points[i].y);
// // //         }
// // //         ctx.stroke();
// // //       }
// // //     };

// // //     resizeCanvas();
// // //     window.addEventListener("resize", resizeCanvas);
// // //     return () => window.removeEventListener("resize", resizeCanvas);
// // //   }, [step]); // Re-run when step changes back to 1

// // //   const getCoordinates = (event: React.PointerEvent | PointerEvent) => {
// // //     const canvas = canvasRef.current;
// // //     if (!canvas) return { x: 0, y: 0, pressure: 0.5 };
// // //     const rect = canvas.getBoundingClientRect();
// // //     return {
// // //       x: event.clientX - rect.left,
// // //       y: event.clientY - rect.top,
// // //       pressure: event.pressure || 0.5,
// // //     };
// // //   };

// // //   const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
// // //     const { x, y, pressure } = getCoordinates(e);
// // //     const ctx = canvasRef.current?.getContext("2d");
// // //     if (!ctx) return;
// // //     setIsDrawing(true);
// // //     setHasDrawn(true);
// // //     ctx.beginPath();
// // //     ctx.moveTo(x, y);
// // //     setPoints([{ x, y, pressure, time: Date.now() }]);
// // //   };

// // //   const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
// // //     if (!isDrawing) return;
// // //     const { x, y, pressure } = getCoordinates(e);
// // //     const ctx = canvasRef.current?.getContext("2d");
// // //     if (!ctx) return;
// // //     ctx.lineTo(x, y);
// // //     ctx.stroke();
// // //     setPoints(prev => [...prev, { x, y, pressure, time: Date.now() }]);
// // //   };

// // //   const stopDrawing = () => {
// // //     setIsDrawing(false);
// // //     canvasRef.current?.getContext("2d")?.closePath();
// // //   };

// // //   // --- Wizard Actions ---
// // //   const handleRestart = () => {
// // //     setStep(1);
// // //     setPoints([]);
// // //     setHasDrawn(false);
// // //     setSpeechText("");
// // //     setBehaviorCompleted(false);
// // //     const canvas = canvasRef.current;
// // //     const ctx = canvas?.getContext("2d");
// // //     if (canvas && ctx) {
// // //       ctx.clearRect(0, 0, canvas.width, canvas.height);
// // //       drawGuide(ctx, canvas.width, canvas.height);
// // //     }
// // //     toast.info("Assessment reset.");
// // //   };

// // //   const handleNextStep = () => {
// // //     if (step === 1 && points.length < 10) {
// // //       toast.error("Please complete the motor tracing task first.");
// // //       return;
// // //     }
// // //     if (step === 2 && speechText.trim().length < 5) {
// // //       toast.error("Please enter the speech transcript first.");
// // //       return;
// // //     }
// // //     setStep(prev => prev + 1);
// // //   };

// // //   const handleBehaviorTap = () => {
// // //     setBehaviorCompleted(true);
// // //     toast.success("Tapping sequence recorded!");
// // //   };

// // //   const handleSubmit = async () => {
// // //     if (!behaviorCompleted) {
// // //       toast.error("Please complete the behavioral tapping task.");
// // //       return;
// // //     }

// // //     const loadingToastId = toast.loading('Processing Multimodal Late Fusion...');

// // //     try {
// // //       const response = await fetch('http://127.0.0.1:5000/predict', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({
// // //           drawing: points,
// // //           speech_text: speechText
// // //         })
// // //       });

// // //       if (!response.ok) throw new Error("API failed");
// // //       const apiResult = await response.json();

// // //       toast.success('Cognitive Risk Score Generated!', { id: loadingToastId });
// // //       setTimeout(() => navigate("/results", { state: { aiData: apiResult } }), 1000);

// // //     } catch (error) {
// // //       console.error(error);
// // //       toast.error('Failed to connect to Neurova server. Is Flask running?', { id: loadingToastId });
// // //     }
// // //   };

// // //   return (
// // //     <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">

// // //       {/* Header & Progress Indicator */}
// // //       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
// // //         <div className="flex items-center gap-4">
// // //           <button
// // //             onClick={() => navigate("/")}
// // //             className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-500 hover:text-blue-700 hover:border-blue-300 transition-colors"
// // //           >
// // //             <ArrowLeft size={20} />
// // //           </button>
// // //           <div>
// // //             <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
// // //               Unified Assessment
// // //               <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
// // //                 Step {step} of 3
// // //               </span>
// // //             </h1>
// // //             <p className="text-slate-500 text-sm">Patient: John Doe • Session ID: #8821</p>
// // //           </div>
// // //         </div>

// // //         <div className="flex items-center gap-3">
// // //           <button
// // //             onClick={handleRestart}
// // //             className="px-4 py-2 bg-white border border-rose-200 text-rose-600 font-medium rounded-lg hover:bg-rose-50 transition-colors flex items-center gap-2 text-sm"
// // //           >
// // //             <RotateCcw size={16} />
// // //             Start Again
// // //           </button>

// // //           {step < 3 ? (
// // //             <button
// // //               onClick={handleNextStep}
// // //               disabled={(step === 1 && !hasDrawn) || (step === 2 && speechText.length < 5)}
// // //               className="px-6 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center gap-2"
// // //             >
// // //               Next Step
// // //               <ArrowRight size={18} />
// // //             </button>
// // //           ) : (
// // //             <button
// // //               onClick={handleSubmit}
// // //               disabled={!behaviorCompleted}
// // //               className="px-6 py-2 bg-blue-700 text-white font-bold rounded-lg shadow-sm shadow-blue-200 hover:bg-blue-800 disabled:opacity-50 transition-all flex items-center gap-2"
// // //             >
// // //               <CheckCircle2 size={18} />
// // //               Submit Fusion Analysis
// // //             </button>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* STEP 1: MOTOR (Handwriting) */}
// // //       <div className={`${step === 1 ? "flex" : "hidden"} flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-col md:flex-row min-h-0`}>
// // //         <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col gap-6 overflow-y-auto">
// // //           <div>
// // //             <h3 className="font-bold text-slate-900 mb-2 text-lg">Modality A: Motor Task</h3>
// // //             <p className="text-sm text-slate-600 leading-relaxed mb-4">
// // //               Please ask the patient to trace the circle shown on the canvas. Keep the stylus on the screen and move at a comfortable pace.
// // //             </p>
// // //             <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
// // //               <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">Live Telemetry</h4>
// // //               <div className="space-y-3">
// // //                 <div className="flex justify-between text-sm">
// // //                   <span className="text-slate-500">Status</span>
// // //                   <span className={`font-medium ${isDrawing ? 'text-green-600' : 'text-slate-400'}`}>
// // //                     {isDrawing ? 'Recording...' : 'Idle'}
// // //                   </span>
// // //                 </div>
// // //                 <div className="flex justify-between text-sm">
// // //                   <span className="text-slate-500">Data Points</span>
// // //                   <span className="font-medium text-slate-900">{points.length}</span>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //         <div className="flex-1 relative bg-slate-50/50 p-8 flex items-center justify-center overflow-hidden">
// // //           <div ref={containerRef} className="w-full h-full max-w-3xl max-h-[800px] bg-white rounded-xl shadow-sm border border-slate-200 relative cursor-crosshair overflow-hidden">
// // //             <canvas
// // //               ref={canvasRef}
// // //               onPointerDown={startDrawing}
// // //               onPointerMove={draw}
// // //               onPointerUp={stopDrawing}
// // //               onPointerLeave={stopDrawing}
// // //               className="absolute inset-0 w-full h-full touch-none"
// // //               style={{ touchAction: 'none' }}
// // //             />
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* STEP 2: SPEECH (Audio/NLP) */}
// // //       <div className={`${step === 2 ? "flex" : "hidden"} flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-col md:flex-row min-h-0`}>
// // //         <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col gap-6 overflow-y-auto">
// // //           <div>
// // //             <h3 className="font-bold text-slate-900 mb-2 text-lg">Modality B: Speech Task</h3>
// // //             <p className="text-sm text-slate-600 leading-relaxed mb-4">
// // //               Ask the patient to describe everything they see going on in the "Cookie Theft" picture.
// // //             </p>
// // //             <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
// // //               <p className="text-xs text-amber-800">
// // //                 <strong>Demo Note:</strong> Type the transcript manually to pass it to the NLP model. You must enter text to proceed.
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //         <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50/50 overflow-y-auto">
// // //           <div className="max-w-2xl w-full flex flex-col items-center gap-6">
// // //             <div className="w-full aspect-video bg-slate-200 rounded-xl border border-slate-300 flex items-center justify-center overflow-hidden relative shadow-inner">
// // //               <img src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Cookie_Theft_Picture.png" alt="Cookie Theft" className="object-contain h-full opacity-90" />
// // //             </div>
// // //             <div className="w-full flex gap-4">
// // //               <button className="shrink-0 p-4 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors flex items-center justify-center shadow-sm">
// // //                 <Mic className="text-slate-600" size={24} />
// // //               </button>
// // //               <Textarea
// // //                 placeholder="Type patient transcript here to unlock the next step..."
// // //                 className="flex-1 min-h-[120px] resize-none text-base p-4 rounded-xl shadow-sm border-slate-300"
// // //                 value={speechText}
// // //                 onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSpeechText(e.target.value)}
// // //               />
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* STEP 3: BEHAVIORAL (Games) */}
// // //       <div className={`${step === 3 ? "flex" : "hidden"} flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-col md:flex-row min-h-0`}>
// // //         <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col gap-6 overflow-y-auto">
// // //           <div>
// // //             <h3 className="font-bold text-slate-900 mb-2 text-lg">Modality C: Behavioral</h3>
// // //             <p className="text-sm text-slate-600 leading-relaxed mb-4">
// // //               Finger Tapping Test. The patient must tap the button as fast as possible.
// // //             </p>
// // //             <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
// // //               <p className="text-xs text-purple-800">
// // //                 <strong>Demo Note:</strong> Click the button once to simulate task completion and unlock submission.
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //         <div className="flex-1 flex items-center justify-center p-8 bg-slate-50/50">
// // //           <div className="text-center flex flex-col items-center gap-8">
// // //             <div className="text-6xl font-bold text-slate-300 font-mono tracking-tighter">00:10</div>
// // //             <button
// // //               onClick={handleBehaviorTap}
// // //               className={`w-48 h-48 rounded-full border-4 flex items-center justify-center shadow-lg transition-all ${behaviorCompleted ? 'bg-green-100 border-green-500 shadow-green-200/50' : 'bg-blue-100 border-blue-500 shadow-blue-200/50 hover:bg-blue-200 active:scale-95'}`}
// // //             >
// // //               <MousePointerClick size={48} className={behaviorCompleted ? 'text-green-600' : 'text-blue-600'} />
// // //             </button>
// // //             <p className={`font-medium ${behaviorCompleted ? 'text-green-600' : 'text-slate-500'}`}>
// // //               {behaviorCompleted ? 'Task Completed! Ready to submit.' : 'Tap repeatedly when ready'}
// // //             </p>
// // //           </div>
// // //         </div>
// // //       </div>

// // //     </div>
// // //   );
// // // }
// // import React, { useEffect, useRef, useState } from "react";
// // import { useNavigate } from "react-router";
// // import { ArrowLeft, CheckCircle2, RotateCcw, Mic, MousePointerClick, ArrowRight } from "lucide-react";
// // import { toast } from "sonner";
// // import { Textarea } from "../components/ui/textarea";

// // interface Point {
// //   x: number;
// //   y: number;
// //   pressure: number;
// //   time: number;
// // }

// // export function Assessment() {
// //   const navigate = useNavigate();

// //   // --- Wizard State ---
// //   const [step, setStep] = useState(1);

// //   // --- Drawing State (Modality A) ---
// //   const canvasRef = useRef<HTMLCanvasElement>(null);
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const [isDrawing, setIsDrawing] = useState(false);
// //   const [points, setPoints] = useState<Point[]>([]);
// //   const [hasDrawn, setHasDrawn] = useState(false);

// //   // --- Speech State (Modality B) ---
// //   const [speechText, setSpeechText] = useState("");
// //   const [isRecording, setIsRecording] = useState(false);
// //   const recognitionRef = useRef<any>(null);

// //   // --- Behavioral State (Modality C) ---
// //   const [behaviorCompleted, setBehaviorCompleted] = useState(false);

// //   // --- Initialize Speech Recognition ---
// //   useEffect(() => {
// //     // Check if browser supports Speech API (Chrome/Edge)
// //     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
// //       const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
// //       recognitionRef.current = new SpeechRecognition();
// //       recognitionRef.current.continuous = true;
// //       recognitionRef.current.interimResults = true;

// //       recognitionRef.current.onresult = (event: any) => {
// //         let currentTranscript = '';
// //         for (let i = 0; i < event.results.length; i++) {
// //           currentTranscript += event.results[i][0].transcript;
// //         }
// //         setSpeechText(currentTranscript);
// //       };

// //       recognitionRef.current.onerror = (event: any) => {
// //         console.error("Speech recognition error", event.error);
// //         setIsRecording(false);
// //         toast.error("Microphone error. Please check permissions.");
// //       };

// //       recognitionRef.current.onend = () => {
// //         setIsRecording(false);
// //       };
// //     }
// //   }, []);

// //   const toggleRecording = () => {
// //     if (!recognitionRef.current) {
// //       toast.error("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
// //       return;
// //     }

// //     if (isRecording) {
// //       recognitionRef.current.stop();
// //       setIsRecording(false);
// //       toast.success("Recording stopped.");
// //     } else {
// //       setSpeechText(""); // Clear previous text
// //       recognitionRef.current.start();
// //       setIsRecording(true);
// //       toast.info("Listening... Please describe the picture.");
// //     }
// //   };

// //   // --- Canvas Logic ---
// //   const drawGuide = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
// //     ctx.beginPath();
// //     const centerX = width / 2;
// //     const centerY = height / 2;
// //     const radius = Math.min(width, height) * 0.35;

// //     ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
// //     ctx.strokeStyle = "#cbd5e1";
// //     ctx.lineWidth = 3;
// //     ctx.setLineDash([10, 10]);
// //     ctx.stroke();
// //     ctx.setLineDash([]);
// //   };

// //   useEffect(() => {
// //     if (step !== 1) return; // Only run canvas resize logic if on step 1

// //     const canvas = canvasRef.current;
// //     const container = containerRef.current;
// //     if (!canvas || !container) return;

// //     const ctx = canvas.getContext("2d");
// //     if (!ctx) return;

// //     const resizeCanvas = () => {
// //       canvas.width = container.clientWidth;
// //       canvas.height = container.clientHeight;
// //       ctx.lineCap = "round";
// //       ctx.lineJoin = "round";
// //       ctx.strokeStyle = "#1d4ed8";
// //       ctx.lineWidth = 3;
// //       drawGuide(ctx, canvas.width, canvas.height);

// //       // Redraw existing points if they went back a step
// //       if (points.length > 0) {
// //         ctx.beginPath();
// //         ctx.moveTo(points[0].x, points[0].y);
// //         for (let i = 1; i < points.length; i++) {
// //           ctx.lineTo(points[i].x, points[i].y);
// //         }
// //         ctx.stroke();
// //       }
// //     };

// //     resizeCanvas();
// //     window.addEventListener("resize", resizeCanvas);
// //     return () => window.removeEventListener("resize", resizeCanvas);
// //   }, [step]); // Re-run when step changes back to 1

// //   const getCoordinates = (event: React.PointerEvent | PointerEvent) => {
// //     const canvas = canvasRef.current;
// //     if (!canvas) return { x: 0, y: 0, pressure: 0.5 };
// //     const rect = canvas.getBoundingClientRect();
// //     return {
// //       x: event.clientX - rect.left,
// //       y: event.clientY - rect.top,
// //       pressure: event.pressure || 0.5,
// //     };
// //   };

// //   const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
// //     const { x, y, pressure } = getCoordinates(e);
// //     const ctx = canvasRef.current?.getContext("2d");
// //     if (!ctx) return;
// //     setIsDrawing(true);
// //     setHasDrawn(true);
// //     ctx.beginPath();
// //     ctx.moveTo(x, y);
// //     setPoints([{ x, y, pressure, time: Date.now() }]);
// //   };

// //   const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
// //     if (!isDrawing) return;
// //     const { x, y, pressure } = getCoordinates(e);
// //     const ctx = canvasRef.current?.getContext("2d");
// //     if (!ctx) return;
// //     ctx.lineTo(x, y);
// //     ctx.stroke();
// //     setPoints(prev => [...prev, { x, y, pressure, time: Date.now() }]);
// //   };

// //   const stopDrawing = () => {
// //     setIsDrawing(false);
// //     canvasRef.current?.getContext("2d")?.closePath();
// //   };

// //   // --- Wizard Actions ---
// //   const handleRestart = () => {
// //     setStep(1);
// //     setPoints([]);
// //     setHasDrawn(false);
// //     setSpeechText("");
// //     setBehaviorCompleted(false);

// //     if (isRecording && recognitionRef.current) {
// //       recognitionRef.current.stop();
// //       setIsRecording(false);
// //     }

// //     const canvas = canvasRef.current;
// //     const ctx = canvas?.getContext("2d");
// //     if (canvas && ctx) {
// //       ctx.clearRect(0, 0, canvas.width, canvas.height);
// //       drawGuide(ctx, canvas.width, canvas.height);
// //     }
// //     toast.info("Assessment reset.");
// //   };

// //   const handleNextStep = () => {
// //     if (step === 1 && points.length < 10) {
// //       toast.error("Please complete the motor tracing task first.");
// //       return;
// //     }
// //     if (step === 2 && speechText.trim().length < 5) {
// //       toast.error("Please enter the speech transcript first.");
// //       return;
// //     }

// //     // Stop recording automatically if user clicks next while mic is still on
// //     if (step === 2 && isRecording && recognitionRef.current) {
// //       recognitionRef.current.stop();
// //       setIsRecording(false);
// //     }

// //     setStep(prev => prev + 1);
// //   };

// //   const handleBehaviorTap = () => {
// //     setBehaviorCompleted(true);
// //     toast.success("Tapping sequence recorded!");
// //   };

// //   const handleSubmit = async () => {
// //     if (!behaviorCompleted) {
// //       toast.error("Please complete the behavioral tapping task.");
// //       return;
// //     }

// //     const loadingToastId = toast.loading('Processing Multimodal Late Fusion...');

// //     try {
// //       const response = await fetch('http://127.0.0.1:5000/predict', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           drawing: points,
// //           speech_text: speechText
// //         })
// //       });

// //       if (!response.ok) throw new Error("API failed");
// //       const apiResult = await response.json();

// //       toast.success('Cognitive Risk Score Generated!', { id: loadingToastId });
// //       setTimeout(() => navigate("/results", { state: { aiData: apiResult } }), 1000);

// //     } catch (error) {
// //       console.error(error);
// //       toast.error('Failed to connect to Neurova server. Is Flask running?', { id: loadingToastId });
// //     }
// //   };

// //   return (
// //     <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">

// //       {/* Header & Progress Indicator */}
// //       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
// //         <div className="flex items-center gap-4">
// //           <button
// //             onClick={() => navigate("/")}
// //             className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-500 hover:text-blue-700 hover:border-blue-300 transition-colors"
// //           >
// //             <ArrowLeft size={20} />
// //           </button>
// //           <div>
// //             <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
// //               Unified Assessment
// //               <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
// //                 Step {step} of 3
// //               </span>
// //             </h1>
// //             <p className="text-slate-500 text-sm">Patient: John Doe • Session ID: #8821</p>
// //           </div>
// //         </div>

// //         <div className="flex items-center gap-3">
// //           <button
// //             onClick={handleRestart}
// //             className="px-4 py-2 bg-white border border-rose-200 text-rose-600 font-medium rounded-lg hover:bg-rose-50 transition-colors flex items-center gap-2 text-sm"
// //           >
// //             <RotateCcw size={16} />
// //             Start Again
// //           </button>

// //           {step < 3 ? (
// //             <button
// //               onClick={handleNextStep}
// //               disabled={(step === 1 && !hasDrawn) || (step === 2 && speechText.length < 5)}
// //               className="px-6 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center gap-2"
// //             >
// //               Next Step
// //               <ArrowRight size={18} />
// //             </button>
// //           ) : (
// //             <button
// //               onClick={handleSubmit}
// //               disabled={!behaviorCompleted}
// //               className="px-6 py-2 bg-blue-700 text-white font-bold rounded-lg shadow-sm shadow-blue-200 hover:bg-blue-800 disabled:opacity-50 transition-all flex items-center gap-2"
// //             >
// //               <CheckCircle2 size={18} />
// //               Submit Fusion Analysis
// //             </button>
// //           )}
// //         </div>
// //       </div>

// //       {/* STEP 1: MOTOR (Handwriting) */}
// //       <div className={`${step === 1 ? "flex" : "hidden"} flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-col md:flex-row min-h-0`}>
// //         <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col gap-6 overflow-y-auto">
// //           <div>
// //             <h3 className="font-bold text-slate-900 mb-2 text-lg">Modality A: Motor Task</h3>
// //             <p className="text-sm text-slate-600 leading-relaxed mb-4">
// //               Please ask the patient to trace the circle shown on the canvas. Keep the stylus on the screen and move at a comfortable pace.
// //             </p>
// //             <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
// //               <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">Live Telemetry</h4>
// //               <div className="space-y-3">
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-slate-500">Status</span>
// //                   <span className={`font-medium ${isDrawing ? 'text-green-600' : 'text-slate-400'}`}>
// //                     {isDrawing ? 'Recording...' : 'Idle'}
// //                   </span>
// //                 </div>
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-slate-500">Data Points</span>
// //                   <span className="font-medium text-slate-900">{points.length}</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="flex-1 relative bg-slate-50/50 p-8 flex items-center justify-center overflow-hidden">
// //           <div ref={containerRef} className="w-full h-full max-w-3xl max-h-[800px] bg-white rounded-xl shadow-sm border border-slate-200 relative cursor-crosshair overflow-hidden">
// //             <canvas
// //               ref={canvasRef}
// //               onPointerDown={startDrawing}
// //               onPointerMove={draw}
// //               onPointerUp={stopDrawing}
// //               onPointerLeave={stopDrawing}
// //               className="absolute inset-0 w-full h-full touch-none"
// //               style={{ touchAction: 'none' }}
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       {/* STEP 2: SPEECH (Audio/NLP) */}
// //       <div className={`${step === 2 ? "flex" : "hidden"} flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-col md:flex-row min-h-0`}>
// //         <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col gap-6 overflow-y-auto">
// //           <div>
// //             <h3 className="font-bold text-slate-900 mb-2 text-lg">Modality B: Speech Task</h3>
// //             <p className="text-sm text-slate-600 leading-relaxed mb-4">
// //               Ask the patient to describe everything they see going on in the "Cookie Theft" picture.
// //             </p>
// //             <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
// //               <p className="text-xs text-amber-800">
// //                 <strong>Demo Note:</strong> Click the microphone icon to record your voice live, or type the transcript manually to pass it to the NLP model.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50/50 overflow-y-auto">
// //           <div className="max-w-2xl w-full flex flex-col items-center gap-6">
// //             <div className="w-full aspect-video bg-slate-200 rounded-xl border border-slate-300 flex items-center justify-center overflow-hidden relative shadow-inner">
// //               <img src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Cookie_Theft_Picture.png" alt="Cookie Theft" className="object-contain h-full opacity-90" />
// //             </div>
// //             <div className="w-full flex gap-4">
// //               <button
// //                 onClick={toggleRecording}
// //                 className={`shrink-0 p-4 rounded-xl transition-all flex items-center justify-center shadow-sm border ${isRecording
// //                     ? 'bg-rose-100 border-rose-300 animate-pulse ring-4 ring-rose-100'
// //                     : 'bg-white hover:bg-slate-100 border-slate-300'
// //                   }`}
// //               >
// //                 <Mic className={isRecording ? "text-rose-600" : "text-slate-600"} size={24} />
// //               </button>
// //               <Textarea
// //                 placeholder="Click the microphone to start recording, or type the transcript here manually..."
// //                 className={`flex-1 min-h-[120px] resize-none text-base p-4 rounded-xl shadow-sm transition-all ${isRecording ? 'border-rose-300 bg-rose-50/30' : 'border-slate-300'
// //                   }`}
// //                 value={speechText}
// //                 onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSpeechText(e.target.value)}
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* STEP 3: BEHAVIORAL (Games) */}
// //       <div className={`${step === 3 ? "flex" : "hidden"} flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-col md:flex-row min-h-0`}>
// //         <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col gap-6 overflow-y-auto">
// //           <div>
// //             <h3 className="font-bold text-slate-900 mb-2 text-lg">Modality C: Behavioral</h3>
// //             <p className="text-sm text-slate-600 leading-relaxed mb-4">
// //               Finger Tapping Test. The patient must tap the button as fast as possible.
// //             </p>
// //             <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
// //               <p className="text-xs text-purple-800">
// //                 <strong>Demo Note:</strong> Click the button once to simulate task completion and unlock submission.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="flex-1 flex items-center justify-center p-8 bg-slate-50/50">
// //           <div className="text-center flex flex-col items-center gap-8">
// //             <div className="text-6xl font-bold text-slate-300 font-mono tracking-tighter">00:10</div>
// //             <button
// //               onClick={handleBehaviorTap}
// //               className={`w-48 h-48 rounded-full border-4 flex items-center justify-center shadow-lg transition-all ${behaviorCompleted ? 'bg-green-100 border-green-500 shadow-green-200/50' : 'bg-blue-100 border-blue-500 shadow-blue-200/50 hover:bg-blue-200 active:scale-95'}`}
// //             >
// //               <MousePointerClick size={48} className={behaviorCompleted ? 'text-green-600' : 'text-blue-600'} />
// //             </button>
// //             <p className={`font-medium ${behaviorCompleted ? 'text-green-600' : 'text-slate-500'}`}>
// //               {behaviorCompleted ? 'Task Completed! Ready to submit.' : 'Tap repeatedly when ready'}
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //     </div>
// //   );
// // }

// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router";
// import { ArrowLeft, CheckCircle2, RotateCcw, Mic, MousePointerClick, ArrowRight } from "lucide-react";
// import { toast } from "sonner";
// import { Textarea } from "../components/ui/textarea";

// interface Point {
//   x: number;
//   y: number;
//   pressure: number;
//   time: number;
// }

// export function Assessment() {
//   const navigate = useNavigate();

//   // --- Wizard State ---
//   const [step, setStep] = useState(1);

//   // --- Modality A: Drawing State ---
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [points, setPoints] = useState<Point[]>([]);
//   const [hasDrawn, setHasDrawn] = useState(false);

//   // --- Modality B: Speech State ---
//   const [speechText, setSpeechText] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const recognitionRef = useRef<any>(null);

//   // --- Modality C: Behavioral Game State ---
//   const [behaviorCompleted, setBehaviorCompleted] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(10);
//   const [tapCount, setTapCount] = useState(0);
//   const [isGameRunning, setIsGameRunning] = useState(false);

//   // --- Behavioral Game Logic ---
//   useEffect(() => {
//     let timer: any;
//     if (isGameRunning && timeLeft > 0) {
//       timer = setInterval(() => {
//         setTimeLeft((prev) => prev - 1);
//       }, 1000);
//     } else if (isGameRunning && timeLeft === 0) {
//       setIsGameRunning(false);
//       setBehaviorCompleted(true);
//       toast.success(`Task Complete! You tapped ${tapCount} times.`);
//     }
//     return () => clearInterval(timer);
//   }, [isGameRunning, timeLeft, tapCount]);

//   const handleTap = () => {
//     if (behaviorCompleted) return; // Prevent tapping after time is up
//     if (!isGameRunning && timeLeft === 10) {
//       setIsGameRunning(true); // Start the timer on first tap
//     }
//     setTapCount((prev) => prev + 1);
//   };


//   // --- Speech Recognition Logic ---
//   useEffect(() => {
//     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//       const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = true;
//       recognitionRef.current.interimResults = true;

//       recognitionRef.current.onresult = (event: any) => {
//         let currentTranscript = '';
//         for (let i = 0; i < event.results.length; i++) {
//           currentTranscript += event.results[i][0].transcript;
//         }
//         setSpeechText(currentTranscript);
//       };

//       recognitionRef.current.onerror = (event: any) => {
//         console.error("Speech recognition error", event.error);
//         setIsRecording(false);
//         toast.error("Microphone error. Please check permissions.");
//       };

//       recognitionRef.current.onend = () => {
//         setIsRecording(false);
//       };
//     }
//   }, []);

//   const toggleRecording = () => {
//     if (!recognitionRef.current) {
//       toast.error("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
//       return;
//     }

//     if (isRecording) {
//       recognitionRef.current.stop();
//       setIsRecording(false);
//       toast.success("Recording stopped.");
//     } else {
//       setSpeechText("");
//       recognitionRef.current.start();
//       setIsRecording(true);
//       toast.info("Listening... Please describe the picture.");
//     }
//   };

//   // --- Canvas Logic ---
//   const drawGuide = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
//     ctx.beginPath();
//     const centerX = width / 2;
//     const centerY = height / 2;
//     const radius = Math.min(width, height) * 0.35;

//     ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
//     ctx.strokeStyle = "#cbd5e1";
//     ctx.lineWidth = 3;
//     ctx.setLineDash([10, 10]);
//     ctx.stroke();
//     ctx.setLineDash([]);
//   };

//   useEffect(() => {
//     if (step !== 1) return;

//     const canvas = canvasRef.current;
//     const container = containerRef.current;
//     if (!canvas || !container) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const resizeCanvas = () => {
//       canvas.width = container.clientWidth;
//       canvas.height = container.clientHeight;
//       ctx.lineCap = "round";
//       ctx.lineJoin = "round";
//       ctx.strokeStyle = "#1d4ed8";
//       ctx.lineWidth = 3;
//       drawGuide(ctx, canvas.width, canvas.height);

//       if (points.length > 0) {
//         ctx.beginPath();
//         ctx.moveTo(points[0].x, points[0].y);
//         for (let i = 1; i < points.length; i++) {
//           ctx.lineTo(points[i].x, points[i].y);
//         }
//         ctx.stroke();
//       }
//     };

//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);
//     return () => window.removeEventListener("resize", resizeCanvas);
//   }, [step]);

//   const getCoordinates = (event: React.PointerEvent | PointerEvent) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return { x: 0, y: 0, pressure: 0.5 };
//     const rect = canvas.getBoundingClientRect();
//     return {
//       x: event.clientX - rect.left,
//       y: event.clientY - rect.top,
//       pressure: event.pressure || 0.5,
//     };
//   };

//   const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
//     const { x, y, pressure } = getCoordinates(e);
//     const ctx = canvasRef.current?.getContext("2d");
//     if (!ctx) return;
//     setIsDrawing(true);
//     setHasDrawn(true);
//     ctx.beginPath();
//     ctx.moveTo(x, y);
//     setPoints([{ x, y, pressure, time: Date.now() }]);
//   };

//   const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
//     if (!isDrawing) return;
//     const { x, y, pressure } = getCoordinates(e);
//     const ctx = canvasRef.current?.getContext("2d");
//     if (!ctx) return;
//     ctx.lineTo(x, y);
//     ctx.stroke();
//     setPoints(prev => [...prev, { x, y, pressure, time: Date.now() }]);
//   };

//   const stopDrawing = () => {
//     setIsDrawing(false);
//     canvasRef.current?.getContext("2d")?.closePath();
//   };

//   // --- Wizard Actions ---
//   const handleRestart = () => {
//     // Reset Everything
//     setStep(1);
//     setPoints([]);
//     setHasDrawn(false);
//     setSpeechText("");

//     // Reset Game
//     setBehaviorCompleted(false);
//     setIsGameRunning(false);
//     setTimeLeft(10);
//     setTapCount(0);

//     if (isRecording && recognitionRef.current) {
//       recognitionRef.current.stop();
//       setIsRecording(false);
//     }

//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext("2d");
//     if (canvas && ctx) {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       drawGuide(ctx, canvas.width, canvas.height);
//     }
//     toast.info("Assessment reset. All data cleared.");
//   };

//   const handleNextStep = () => {
//     if (step === 1 && points.length < 10) {
//       toast.error("Please complete the motor tracing task first.");
//       return;
//     }
//     if (step === 2 && speechText.trim().length < 5) {
//       toast.error("Please enter the speech transcript first.");
//       return;
//     }

//     if (step === 2 && isRecording && recognitionRef.current) {
//       recognitionRef.current.stop();
//       setIsRecording(false);
//     }

//     setStep(prev => prev + 1);
//   };

//   const handleSubmit = async () => {
//     if (!behaviorCompleted) {
//       toast.error("Please complete the behavioral tapping task.");
//       return;
//     }

//     const loadingToastId = toast.loading('Processing Multimodal Late Fusion...');

//     try {
//       const response = await fetch('http://127.0.0.1:5000/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           drawing: points,
//           speech_text: speechText,
//           tapping_score: tapCount // Sending the game score to the backend!
//         })
//       });

//       if (!response.ok) throw new Error("API failed");
//       const apiResult = await response.json();

//       toast.success('Cognitive Risk Score Generated!', { id: loadingToastId });
//       setTimeout(() => navigate("/results", { state: { aiData: apiResult } }), 1000);

//     } catch (error) {
//       console.error(error);
//       toast.error('Failed to connect to Neurova server. Is your Python backend running?', { id: loadingToastId });
//     }
//   };

//   return (
//     <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">

//       {/* Header & Progress Indicator */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => navigate("/")}
//             className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-500 hover:text-blue-700 hover:border-blue-300 transition-colors"
//           >
//             <ArrowLeft size={20} />
//           </button>
//           <div>
//             <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
//               Unified Assessment
//               <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
//                 Step {step} of 3
//               </span>
//             </h1>
//             <p className="text-slate-500 text-sm">Patient: John Doe • Session ID: #8821</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <button
//             onClick={handleRestart}
//             className="px-4 py-2 bg-white border border-rose-200 text-rose-600 font-medium rounded-lg hover:bg-rose-50 transition-colors flex items-center gap-2 text-sm"
//           >
//             <RotateCcw size={16} />
//             Start Again
//           </button>

//           {step < 3 ? (
//             <button
//               onClick={handleNextStep}
//               disabled={(step === 1 && !hasDrawn) || (step === 2 && speechText.length < 5)}
//               className="px-6 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center gap-2"
//             >
//               Next Step
//               <ArrowRight size={18} />
//             </button>
//           ) : (
//             <button
//               onClick={handleSubmit}
//               disabled={!behaviorCompleted}
//               className="px-6 py-2 bg-blue-700 text-white font-bold rounded-lg shadow-sm shadow-blue-200 hover:bg-blue-800 disabled:opacity-50 transition-all flex items-center gap-2"
//             >
//               <CheckCircle2 size={18} />
//               Submit Fusion Analysis
//             </button>
//           )}
//         </div>
//       </div>

//       {/* STEP 1: MOTOR (Handwriting) */}
//       <div className={`${step === 1 ? "flex" : "hidden"} flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-col md:flex-row min-h-0`}>
//         <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col gap-6 overflow-y-auto">
//           <div>
//             <h3 className="font-bold text-slate-900 mb-2 text-lg">Modality A: Motor Task</h3>
//             <p className="text-sm text-slate-600 leading-relaxed mb-4">
//               Please ask the patient to trace the circle shown on the canvas. Keep the stylus on the screen and move at a comfortable pace.
//             </p>
//             <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
//               <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">Live Telemetry</h4>
//               <div className="space-y-3">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-slate-500">Status</span>
//                   <span className={`font-medium ${isDrawing ? 'text-green-600' : 'text-slate-400'}`}>
//                     {isDrawing ? 'Recording...' : 'Idle'}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-slate-500">Data Points</span>
//                   <span className="font-medium text-slate-900">{points.length}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex-1 relative bg-slate-50/50 p-8 flex items-center justify-center overflow-hidden">
//           <div ref={containerRef} className="w-full h-full max-w-3xl max-h-[800px] bg-white rounded-xl shadow-sm border border-slate-200 relative cursor-crosshair overflow-hidden">
//             <canvas
//               ref={canvasRef}
//               onPointerDown={startDrawing}
//               onPointerMove={draw}
//               onPointerUp={stopDrawing}
//               onPointerLeave={stopDrawing}
//               className="absolute inset-0 w-full h-full touch-none"
//               style={{ touchAction: 'none' }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* STEP 2: SPEECH (Audio/NLP) */}
//       <div className={`${step === 2 ? "flex" : "hidden"} flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-col md:flex-row min-h-0`}>
//         <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col gap-6 overflow-y-auto">
//           <div>
//             <h3 className="font-bold text-slate-900 mb-2 text-lg">Modality B: Speech Task</h3>
//             <p className="text-sm text-slate-600 leading-relaxed mb-4">
//               Ask the patient to describe everything they see going on in the "Cookie Theft" picture.
//             </p>
//             <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
//               <p className="text-xs text-amber-800">
//                 <strong>Instructions:</strong> Click the microphone icon to transcribe your voice live, or type the transcript manually to pass it to the NLP model.
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50/50 overflow-y-auto">
//           <div className="max-w-2xl w-full flex flex-col items-center gap-6">
//             <div className="w-full aspect-video bg-white rounded-xl border border-slate-300 flex items-center justify-center overflow-hidden relative shadow-inner p-4">
//               {/* Reliable Cookie Theft Image Link */}
//               <img src="image.png" alt="Cookie Theft Assessment" className="object-contain h-full" />
//             </div>
//             <div className="w-full flex gap-4">
//               <button
//                 onClick={toggleRecording}
//                 className={`shrink-0 p-4 rounded-xl transition-all flex items-center justify-center shadow-sm border ${isRecording
//                     ? 'bg-rose-100 border-rose-300 animate-pulse ring-4 ring-rose-100'
//                     : 'bg-white hover:bg-slate-100 border-slate-300'
//                   }`}
//               >
//                 <Mic className={isRecording ? "text-rose-600" : "text-slate-600"} size={24} />
//               </button>
//               <Textarea
//                 placeholder="Click the microphone to start recording, or type the transcript here..."
//                 className={`flex-1 min-h-[120px] resize-none text-base p-4 rounded-xl shadow-sm transition-all ${isRecording ? 'border-rose-300 bg-rose-50/30' : 'border-slate-300'
//                   }`}
//                 value={speechText}
//                 onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSpeechText(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* STEP 3: BEHAVIORAL (Games) */}
//       <div className={`${step === 3 ? "flex" : "hidden"} flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-col md:flex-row min-h-0`}>
//         <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col gap-6 overflow-y-auto">
//           <div>
//             <h3 className="font-bold text-slate-900 mb-2 text-lg">Modality C: Behavioral</h3>
//             <p className="text-sm text-slate-600 leading-relaxed mb-4">
//               Finger Tapping Speed Test. <br /><br />
//               The patient must tap the target button as many times as possible within 10 seconds.
//             </p>
//             <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 flex justify-between items-center">
//               <span className="text-sm font-bold text-purple-900">Current Score:</span>
//               <span className="text-2xl font-black text-purple-700">{tapCount}</span>
//             </div>
//           </div>
//         </div>
//         <div className="flex-1 flex items-center justify-center p-8 bg-slate-50/50">
//           <div className="text-center flex flex-col items-center gap-8">

//             <div className={`text-7xl font-bold font-mono tracking-tighter transition-colors ${timeLeft <= 3 && isGameRunning ? 'text-rose-500' : 'text-slate-700'}`}>
//               00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
//             </div>

//             <button
//               onClick={handleTap}
//               disabled={behaviorCompleted}
//               className={`w-56 h-56 rounded-full border-8 flex items-center justify-center shadow-lg transition-all ${behaviorCompleted
//                   ? 'bg-slate-100 border-slate-300 shadow-none cursor-not-allowed opacity-50'
//                   : isGameRunning
//                     ? 'bg-blue-100 border-blue-500 shadow-blue-200/50 active:scale-90 active:bg-blue-300'
//                     : 'bg-white border-blue-400 hover:bg-blue-50 hover:scale-105 shadow-xl'
//                 }`}
//             >
//               <MousePointerClick size={64} className={behaviorCompleted ? 'text-slate-400' : 'text-blue-600'} />
//             </button>

//             <p className={`font-medium text-lg ${behaviorCompleted ? 'text-green-600' : 'text-slate-500'}`}>
//               {behaviorCompleted
//                 ? `Test Complete! You tapped ${tapCount} times.`
//                 : isGameRunning
//                   ? 'Keep tapping! Hurry!'
//                   : 'Tap the button to start the 10s timer.'}
//             </p>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, RotateCcw, Mic, ArrowRight, BrainCircuit } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "../components/ui/textarea";

interface Point {
  x: number;
  y: number;
  pressure: number;
  time: number;
}

export function Assessment() {
  const navigate = useNavigate();

  // --- Wizard State ---
  const [step, setStep] = useState(1);

  // --- Modality A: Drawing State ---
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [hasDrawn, setHasDrawn] = useState(false);

  // --- Modality B: Speech State ---
  const [speechText, setSpeechText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  // --- Modality C: Behavioral Game State (Spatial Memory) ---
  const [behaviorCompleted, setBehaviorCompleted] = useState(false);
  const [gameState, setGameState] = useState<'idle' | 'memorize' | 'recall' | 'completed'>('idle');
  const [gridLevel, setGridLevel] = useState(1); // Levels 1, 2, 3
  const [activeTiles, setActiveTiles] = useState<number[]>([]);
  const [userTiles, setUserTiles] = useState<number[]>([]);
  const [cognitiveScore, setCognitiveScore] = useState(0);

  // --- Behavioral Game Logic ---
  const generatePattern = (level: number) => {
    setUserTiles([]);
    setGameState('memorize');

    // Level 1 = 3 tiles, Level 2 = 4 tiles, Level 3 = 5 tiles
    const tileCount = level + 2;
    const newPattern: number[] = [];

    while (newPattern.length < tileCount) {
      const randomTile = Math.floor(Math.random() * 9); // 0 to 8 for 3x3 grid
      if (!newPattern.includes(randomTile)) {
        newPattern.push(randomTile);
      }
    }
    setActiveTiles(newPattern);

    // Show pattern for 1.5 seconds, then switch to recall mode
    setTimeout(() => {
      setGameState('recall');
    }, 1500);
  };

  const startMemoryGame = () => {
    setGridLevel(1);
    setCognitiveScore(0);
    generatePattern(1);
  };

  const handleTileClick = (index: number) => {
    if (gameState !== 'recall') return;

    // Toggle tile selection
    const isSelected = userTiles.includes(index);
    const newSelectedTiles = isSelected
      ? userTiles.filter(t => t !== index)
      : [...userTiles, index];

    setUserTiles(newSelectedTiles);

    // Check if they selected the required number of tiles
    if (newSelectedTiles.length === activeTiles.length) {
      const isCorrect = activeTiles.every(t => newSelectedTiles.includes(t));

      if (isCorrect) {
        setCognitiveScore(prev => prev + 33);
        if (gridLevel === 3) {
          toast.success("Perfect Memory Score!");
          setCognitiveScore(100);
          setGameState('completed');
          setBehaviorCompleted(true);
        } else {
          toast.success(`Level ${gridLevel} Passed! Get ready...`);
          setGameState('idle');
          setTimeout(() => {
            setGridLevel(prev => prev + 1);
            generatePattern(gridLevel + 1);
          }, 1000);
        }
      } else {
        toast.error("Incorrect pattern. Cognitive test concluded.");
        setGameState('completed');
        setBehaviorCompleted(true);
      }
    }
  };


  // --- Speech Recognition Logic ---
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setSpeechText(currentTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
        toast.error("Microphone error. Please check permissions.");
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition is not supported in this browser.");
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      toast.success("Recording stopped.");
    } else {
      setSpeechText("");
      recognitionRef.current.start();
      setIsRecording(true);
      toast.info("Listening... Please describe the picture.");
    }
  };

  // --- Canvas Logic ---
  const drawGuide = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.beginPath();
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;

    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 10]);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  useEffect(() => {
    if (step !== 1) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#1d4ed8";
      ctx.lineWidth = 3;
      drawGuide(ctx, canvas.width, canvas.height);

      if (points.length > 0) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [step]);

  const getCoordinates = (event: React.PointerEvent | PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0, pressure: 0.5 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      pressure: event.pressure || 0.5,
    };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const { x, y, pressure } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    setIsDrawing(true);
    setHasDrawn(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setPoints([{ x, y, pressure, time: Date.now() }]);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { x, y, pressure } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.lineTo(x, y);
    ctx.stroke();
    setPoints(prev => [...prev, { x, y, pressure, time: Date.now() }]);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    canvasRef.current?.getContext("2d")?.closePath();
  };

  // --- Wizard Actions ---
  const handleRestart = () => {
    setStep(1);
    setPoints([]);
    setHasDrawn(false);
    setSpeechText("");

    setBehaviorCompleted(false);
    setGameState('idle');
    setCognitiveScore(0);
    setActiveTiles([]);
    setUserTiles([]);

    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGuide(ctx, canvas.width, canvas.height);
    }
    toast.info("Assessment reset. All data cleared.");
  };

  const handleNextStep = () => {
    if (step === 1 && points.length < 10) {
      toast.error("Please complete the motor tracing task first.");
      return;
    }
    if (step === 2 && speechText.trim().length < 5) {
      toast.error("Please enter the speech transcript first.");
      return;
    }
    if (step === 2 && isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = async () => {
    if (!behaviorCompleted) {
      toast.error("Please complete the cognitive memory task.");
      return;
    }
    body: JSON.stringify({
      patient_id: 1, // Hardcoded for now, later pulled from your state!
      drawing: points,
      speech_text: speechText,
      cognitive_score: cognitiveScore
    })

    const loadingToastId = toast.loading('Processing Multimodal Late Fusion...');

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          drawing: points,
          speech_text: speechText,
          cognitive_score: cognitiveScore
        })
      });

      if (!response.ok) throw new Error("API failed");
      const apiResult = await response.json();

      toast.success('Cognitive Risk Score Generated!', { id: loadingToastId });
      setTimeout(() => navigate("/results", { state: { aiData: apiResult } }), 1000);

    } catch (error) {
      console.error(error);
      toast.error('Failed to connect to Neurova server. Is your Python backend running?', { id: loadingToastId });
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">

      {/* Header & Progress Indicator */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-500 hover:text-blue-700 hover:border-blue-300 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              Unified Assessment
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                Step {step} of 3
              </span>
            </h1>
            <p className="text-slate-500 text-sm">Patient: John Doe • Session ID: #8821</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRestart}
            className="px-4 py-2 bg-white border border-rose-200 text-rose-600 font-medium rounded-lg hover:bg-rose-50 transition-colors flex items-center gap-2 text-sm"
          >
            <RotateCcw size={16} />
            Start Again
          </button>

          {step < 3 ? (
            <button
              onClick={handleNextStep}
              disabled={(step === 1 && !hasDrawn) || (step === 2 && speechText.length < 5)}
              className="px-6 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center gap-2"
            >
              Next Step
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!behaviorCompleted}
              className="px-6 py-2 bg-blue-700 text-white font-bold rounded-lg shadow-sm shadow-blue-200 hover:bg-blue-800 disabled:opacity-50 transition-all flex items-center gap-2"
            >
              <CheckCircle2 size={18} />
              Submit Fusion Analysis
            </button>
          )}
        </div>
      </div>

      {/* STEP 1: MOTOR (Handwriting) */}
      <div className={`${step === 1 ? "flex" : "hidden"} flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-col md:flex-row min-h-0`}>
        <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col gap-6 overflow-y-auto">
          <div>
            <h3 className="font-bold text-slate-900 mb-2 text-lg">Modality A: Motor Task</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Please ask the patient to trace the circle shown on the canvas. Keep the stylus on the screen and move at a comfortable pace.
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">Live Telemetry</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Status</span>
                  <span className={`font-medium ${isDrawing ? 'text-green-600' : 'text-slate-400'}`}>
                    {isDrawing ? 'Recording...' : 'Idle'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Data Points</span>
                  <span className="font-medium text-slate-900">{points.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 relative bg-slate-50/50 p-8 flex items-center justify-center overflow-hidden">
          <div ref={containerRef} className="w-full h-full max-w-3xl max-h-[800px] bg-white rounded-xl shadow-sm border border-slate-200 relative cursor-crosshair overflow-hidden">
            <canvas
              ref={canvasRef}
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
              className="absolute inset-0 w-full h-full touch-none"
              style={{ touchAction: 'none' }}
            />
          </div>
        </div>
      </div>

      {/* STEP 2: SPEECH (Audio/NLP) */}
      <div className={`${step === 2 ? "flex" : "hidden"} flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-col md:flex-row min-h-0`}>
        <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col gap-6 overflow-y-auto">
          <div>
            <h3 className="font-bold text-slate-900 mb-2 text-lg">Modality B: Speech Task</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Ask the patient to describe everything they see going on in the "Cookie Theft" picture.
            </p>
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
              <p className="text-xs text-amber-800">
                <strong>Instructions:</strong> Click the microphone icon to transcribe your voice live, or type the transcript manually to pass it to the NLP model.
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50/50 overflow-y-auto">
          <div className="max-w-2xl w-full flex flex-col items-center gap-6">
            <div className="w-full aspect-video bg-white rounded-xl border border-slate-300 flex items-center justify-center overflow-hidden relative shadow-inner p-4">
              <img src="image.png" alt="Cookie Theft Assessment" className="object-contain h-full" />
            </div>
            <div className="w-full flex gap-4">
              <button
                onClick={toggleRecording}
                className={`shrink-0 p-4 rounded-xl transition-all flex items-center justify-center shadow-sm border ${isRecording
                    ? 'bg-rose-100 border-rose-300 animate-pulse ring-4 ring-rose-100'
                    : 'bg-white hover:bg-slate-100 border-slate-300'
                  }`}
              >
                <Mic className={isRecording ? "text-rose-600" : "text-slate-600"} size={24} />
              </button>
              <Textarea
                placeholder="Click the microphone to start recording, or type the transcript here..."
                className={`flex-1 min-h-[120px] resize-none text-base p-4 rounded-xl shadow-sm transition-all ${isRecording ? 'border-rose-300 bg-rose-50/30' : 'border-slate-300'
                  }`}
                value={speechText}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSpeechText(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* STEP 3: BEHAVIORAL (Spatial Memory Matrix) */}
      <div className={`${step === 3 ? "flex" : "hidden"} flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-col md:flex-row min-h-0`}>
        <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col gap-6 overflow-y-auto">
          <div>
            <h3 className="font-bold text-slate-900 mb-2 text-lg">Modality C: Behavioral</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              <strong>Spatial Memory Matrix.</strong><br />
              Test spatial working memory, which is highly sensitive to early Alzheimer's.
            </p>

            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center text-sm border-b border-purple-200/50 pb-2">
                <span className="text-purple-900 font-medium">Current Level:</span>
                <span className="font-bold text-purple-700">{gridLevel}/3</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-purple-900 font-medium">Cognitive Score:</span>
                <span className="font-bold text-purple-700">{cognitiveScore}%</span>
              </div>
            </div>

            {gameState === 'idle' && !behaviorCompleted && (
              <button
                onClick={startMemoryGame}
                className="mt-6 w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <BrainCircuit size={20} />
                Start Memory Test
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50/50">

          <div className="mb-8 h-8 text-center">
            {gameState === 'idle' && !behaviorCompleted && <p className="text-lg text-slate-500 font-medium">Click Start to begin.</p>}
            {gameState === 'memorize' && <p className="text-xl text-blue-600 font-bold animate-pulse">Memorize the pattern...</p>}
            {gameState === 'recall' && <p className="text-xl text-indigo-600 font-bold">Recall the pattern!</p>}
            {gameState === 'completed' && <p className="text-xl text-green-600 font-bold">Test Completed.</p>}
          </div>

          {/* 3x3 Grid Game Board */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-2xl shadow-inner border border-slate-200">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(index => {

              // Determine tile styling based on game state
              let tileStyle = "bg-slate-100 hover:bg-slate-200 border-b-4 border-slate-200"; // default

              if (gameState === 'memorize' && activeTiles.includes(index)) {
                tileStyle = "bg-blue-400 border-b-4 border-blue-500 scale-105 shadow-md"; // Flashing pattern
              } else if (gameState === 'recall' && userTiles.includes(index)) {
                tileStyle = "bg-indigo-500 border-b-0 translate-y-1 shadow-inner text-white"; // User selected
              } else if (gameState === 'completed' && userTiles.includes(index) && activeTiles.includes(index)) {
                tileStyle = "bg-green-400 border-b-0 translate-y-1 text-white"; // Review Correct
              } else if (gameState === 'completed' && userTiles.includes(index) && !activeTiles.includes(index)) {
                tileStyle = "bg-rose-400 border-b-0 translate-y-1 text-white"; // Review Incorrect
              }

              return (
                <button
                  key={index}
                  onClick={() => handleTileClick(index)}
                  disabled={gameState !== 'recall'}
                  className={`w-20 h-20 sm:w-28 sm:h-28 rounded-xl transition-all duration-200 ${tileStyle} ${gameState === 'recall' ? 'cursor-pointer' : 'cursor-default'}`}
                />
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}