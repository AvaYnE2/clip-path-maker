import React, { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import InputWithLabel from "@/components/input-with-label.tsx";
import { Point, Size } from "@/App.tsx";
import { cn } from "@/lib/utils.ts";

interface Props {
  setPoints: React.Dispatch<React.SetStateAction<Point[]>>;
  setWindowSize: React.Dispatch<React.SetStateAction<Size>>;
  newSize: Size;
  setNewSize: React.Dispatch<React.SetStateAction<Size>>;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  colors: string[];
}
const Sidebar: React.FC<Props> = ({
  setPoints,
  setWindowSize,
  setColor,
  setNewSize,
  colors,
  newSize,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen ? (
        <div className="absolute top-1/3 left-0 h-1/3 z-50 shadow">
          <div className="ml-2 w-64 h-full dark:bg-slate-800 bg-slate-300 rounded-lg">
            <div className="flex flex-col gap-2 h-full justify-between p-2.5 border rounded-lg">
              <h2 className="text-xl font-bold">Controls</h2>
              <div className="space-y-2">
                <div className="flex gap-2 items-stretch">
                  <InputWithLabel
                    label="Width"
                    type="number"
                    placeholder="Width"
                    className="w-24 dark:bg-slate-900 bg-slate-300"
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
                    className="w-24 bg-slate-300 dark:bg-slate-900"
                    value={newSize.height}
                    onChange={(e) =>
                      setNewSize((prev) => ({
                        ...prev,
                        height: parseInt(e.target.value),
                      }))
                    }
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={() => setWindowSize(newSize)}
                >
                  Set Size
                </Button>
              </div>
              <div>
                Color selector
                <div className="flex gap-1">
                  {colors.map((color) => (
                    <div
                      key={color}
                      className={cn(
                        `w-8 h-8 rounded-full cursor-pointer`,
                        color,
                      )}
                      onClick={() => setColor(color)}
                    ></div>
                  ))}
                </div>
              </div>
              <Button onClick={() => setPoints([])}>Reset</Button>
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-1/2 right-[-40px] transform -translate-y-1/2"
            onClick={() => setIsOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <ArrowBigLeft className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
      ) : (
        <Button
          size="icon"
          variant="outline"
          className="fixed top-1/2 left-0 z-50"
          onClick={() => setIsOpen(true)}
        >
          <span className="sr-only">Close menu</span>
          <ArrowBigRight className="h-6 w-6" aria-hidden="true" />
        </Button>
      )}
    </>
  );
};

export default Sidebar;
