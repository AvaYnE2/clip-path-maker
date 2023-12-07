import { ThemeProvider } from "@/components/theme-provider.tsx";
import React, { useCallback, useState } from "react";
import { cn } from "@/lib/utils.ts";
import { convertToPercent } from "@/utils/utils.ts";
import Header from "@/layout/header.tsx";
import Sidebar from "@/layout/sidebar.tsx";
import { CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import { useToast } from "@/components/ui/use-toast.ts";

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

const colors: string[] = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-purple-500",
  "bg-indigo-500",
];

function App() {
  const [points, setPoints] = useState<Point[]>([]);
  const [draggingPoint, setDraggingPoint] = useState<number | null>(null);
  const [windowSize, setWindowSize] = useState<Size>({
    width: 1000,
    height: 500,
  });
  const [newSize, setNewSize] = useState<Size>(windowSize);
  const [color, setColor] = useState<string>("bg-green-500");

  const addPoint = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPoints((prev) => [...prev, { x, y }]);
    }
  };

  const startDragging = (index: number) => {
    setDraggingPoint(index);
  };

  const onDrag = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (draggingPoint !== null) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPoints((prev) =>
          prev.map((point, index) =>
            index === draggingPoint ? { x, y } : point,
          ),
        );
      }
    },
    [draggingPoint],
  );

  const stopDragging = () => {
    setDraggingPoint(null);
  };

  const polygon =
    points.length >= 3
      ? `polygon(${points.map((p) => `${p.x}px ${p.y}px`).join(", ")})`
      : "none";

  const polygonShow =
    points.length >= 3
      ? `polygon(${points
          .map(
            (p) =>
              `${convertToPercent(p.x, windowSize.width)}% ${convertToPercent(
                p.y,
                windowSize.height,
              )}%`,
          )
          .join(", ")})`
      : "none";

  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(polygonShow).then((r) => console.log(r));
    toast({
      title: "Copied to clipboard",
      description: "The clip path has been copied to your clipboard.",
    });
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <Header />
      <Sidebar
        colors={colors}
        newSize={newSize}
        setNewSize={setNewSize}
        setColor={setColor}
        setWindowSize={setWindowSize}
        setPoints={setPoints}
      />
      <div className="isolate flex justify-center items-center z-10">
        <div className="">
          {points.length < 3 && (
            <p className="text-center mt-4">
              Click at least 3 points to create a polygon
            </p>
          )}
          <div
            className="relative border border-black bg-slate-200 rounded-lg"
            onMouseMove={onDrag}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onClick={addPoint}
            style={{ width: windowSize.width, height: windowSize.height }}
          >
            <div
              className={cn(color, "absolute top-0 left-0 w-full h-full")}
              style={{ clipPath: polygon }}
            ></div>
            <div
              className="absolute top-0 left-0 w-full h-full cursor-crosshair"
              onClick={addPoint}
            >
              {points.map((point, index) => (
                <div
                  key={index}
                  className="absolute w-6 h-6 bg-slate-600 rounded-full cursor-pointer"
                  style={{
                    left: `${point.x - 12}px`,
                    top: `${point.y - 12}px`,
                  }}
                  onMouseDown={() => startDragging(index)}
                >
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm font-bold select-none">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/*<div className="flex items-stretch gap-2">
            <Button onClick={() => setPoints([])}>Reset</Button>
            <div className="flex gap-2 items-stretch">
              <InputWithLabel
                label="Width"
                type="number"
                placeholder="Width"
                className="w-24"
                value={newSize.width}
                onChange={(e) =>
                  setNewSize((prev) => ({
                    ...prev,
                    width: parseInt(e.target.value),
                  }))
                }
              />
              <InputWithLabel
                label="Height"
                type="number"
                placeholder="Height"
                className="w-24"
                value={newSize.height}
                onChange={(e) =>
                  setNewSize((prev) => ({
                    ...prev,
                    height: parseInt(e.target.value),
                  }))
                }
              />
              <Button onClick={() => setWindowSize(newSize)}>Set Size</Button>
            </div>
            <div>
              Color selector
              <div className="flex gap-2">
                {colors.map((color) => (
                  <div
                    key={color}
                    className={`w-8 h-8 rounded-full ${color} cursor-pointer`}
                    onClick={() => setColor(color)}
                  ></div>
                ))}
              </div>
            </div>
          </div>*/}
          {/*<strong>Clip Path:</strong>*/}
          <div className="inline-block bg-slate-800/30 p-8 relative w-1/2 overflow-auto rounded-lg">
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-0 right-0 p-2"
              onClick={handleCopy}
            >
              <CopyIcon className="w-4 h-4" />
            </Button>
            {points.length < 3 ? (
              <code className="block whitespace-pre-wrap">polygon()</code>
            ) : (
              <code className="block whitespace-pre-wrap">{polygonShow}</code>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
