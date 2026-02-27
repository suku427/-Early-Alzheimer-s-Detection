import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Eraser, CheckCircle2, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface Point {
  x: number;
  y: number;
  pressure: number;
  time: number;
}

export function Assessment() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Spiral guide drawing function
  const drawGuide = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.beginPath();
    const centerX = width / 2;
    const centerY = height / 2;
    // Scale spiral based on canvas size, but cap it so it doesn't get too huge on desktop
    const scale = Math.min(width, height) * 0.008; 
    
    // Draw spiral
    for (let i = 0; i < 150; i++) {
      const angle = 0.1 * i;
      const x = centerX + (5 + angle * 4) * Math.cos(angle) * scale * 5;
      const y = centerY + (5 + angle * 4) * Math.sin(angle) * scale * 5;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.strokeStyle = "#cbd5e1"; // slate-300
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      // Set actual canvas size to match display size for sharpness
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#1d4ed8"; // blue-700
      ctx.lineWidth = 3;
      
      // Redraw guide
      drawGuide(ctx, canvas.width, canvas.height);
      
      // Note: In a real app we'd need to redraw the user's strokes here too if resizing happens
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

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
    
    const newPoint = { x, y, pressure, time: Date.now() };
    setPoints([newPoint]);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const { x, y, pressure } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();

    const newPoint = { x, y, pressure, time: Date.now() };
    setPoints(prev => [...prev, newPoint]);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext("2d");
    ctx?.closePath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGuide(ctx, canvas.width, canvas.height);
    setPoints([]);
    setHasDrawn(false);
  };

  const handleSubmit = () => {
    if (points.length < 50) {
      toast.error("Please trace the entire spiral before submitting.");
      return;
    }
    
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Analyzing motor patterns...',
        success: 'Assessment complete',
        error: 'Analysis failed',
      }
    );

    setTimeout(() => {
      navigate("/results", { state: { points } });
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/")}
            className="p-2 bg-white rounded-lg border border-slate-200 text-slate-500 hover:text-blue-700 hover:border-blue-300 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Motor Assessment</h1>
            <p className="text-slate-500 text-sm">Patient: John Doe • Session ID: #8821</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <button
            onClick={clearCanvas}
            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <RotateCcw size={16} />
            Reset Canvas
          </button>
          <button
            onClick={handleSubmit}
            disabled={!hasDrawn}
            className="px-6 py-2 bg-blue-700 text-white font-bold rounded-lg shadow-sm shadow-blue-200 hover:bg-blue-800 disabled:opacity-50 disabled:shadow-none transition-all flex items-center gap-2"
          >
            <CheckCircle2 size={18} />
            Submit Analysis
          </button>
        </div>
      </div>

      {/* Main Drawing Area */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
        
        {/* Instructions / Sidebar */}
        <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col gap-6">
          <div>
            <h3 className="font-bold text-slate-900 mb-2">Instructions</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Please ask the patient to trace the spiral shown on the canvas. 
              Encourage them to:
            </p>
            <ul className="list-disc list-inside text-sm text-slate-600 mt-2 space-y-1">
              <li>Keep the stylus on the screen</li>
              <li>Move at a comfortable pace</li>
              <li>Avoid lifting their hand</li>
            </ul>
          </div>
          
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
               <div className="flex justify-between text-sm">
                 <span className="text-slate-500">Duration</span>
                 <span className="font-medium text-slate-900">
                   {points.length > 0 ? ((points[points.length-1].time - points[0].time)/1000).toFixed(1) : 0}s
                 </span>
               </div>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative bg-slate-50/50 p-8 flex items-center justify-center">
            <div 
              ref={containerRef}
              className="w-full h-full max-w-3xl max-h-[800px] bg-white rounded-xl shadow-sm border border-slate-200 relative cursor-crosshair"
            >
              <canvas
                ref={canvasRef}
                onPointerDown={startDrawing}
                onPointerMove={draw}
                onPointerUp={stopDrawing}
                onPointerLeave={stopDrawing}
                className="absolute inset-0 w-full h-full touch-none rounded-xl"
                style={{ touchAction: 'none' }}
              />
            </div>
        </div>
      </div>
    </div>
  );
}
