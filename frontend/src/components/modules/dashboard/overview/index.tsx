"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { PencilIcon, UserIcon, DollarSignIcon } from "lucide-react";

export default function AnalyticsDashboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Data points
    const lastMonthData = [20, 45, 30, 30, 35, 35, 40];
    const thisMonthData = [35, 30, 40, 25, 45, 30, 55];

    const width = rect.width;
    const height = rect.height;
    const padding = 20;
    const graphHeight = height - padding * 2;
    const graphWidth = width - padding * 2;

    // Draw gradients
    const thisMonthGradient = ctx.createLinearGradient(
      0,
      padding,
      0,
      height - padding
    );
    thisMonthGradient.addColorStop(0, "rgba(10, 210, 150, 0.3)");
    thisMonthGradient.addColorStop(1, "rgba(10, 210, 150, 0)");

    const lastMonthGradient = ctx.createLinearGradient(
      0,
      padding,
      0,
      height - padding
    );
    lastMonthGradient.addColorStop(0, "rgba(59, 130, 246, 0.3)");
    lastMonthGradient.addColorStop(1, "rgba(59, 130, 246, 0)");

    // Function to draw a line with gradient fill
    const drawLine = (
      data: number[],
      color: string,
      fillGradient: CanvasGradient
    ) => {
      const maxValue = Math.max(...lastMonthData, ...thisMonthData);
      const pointSpacing = graphWidth / (data.length - 1);

      // Draw filled area
      ctx.beginPath();
      ctx.moveTo(padding, height - padding);

      data.forEach((value, index) => {
        const x = padding + index * pointSpacing;
        const y = padding + graphHeight - (value / maxValue) * graphHeight;
        ctx.lineTo(x, y);
      });

      ctx.lineTo(padding + graphWidth, height - padding);
      ctx.lineTo(padding, height - padding);
      ctx.fillStyle = fillGradient;
      ctx.fill();

      // Draw line
      ctx.beginPath();
      data.forEach((value, index) => {
        const x = padding + index * pointSpacing;
        const y = padding + graphHeight - (value / maxValue) * graphHeight;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw points
      data.forEach((value, index) => {
        const x = padding + index * pointSpacing;
        const y = padding + graphHeight - (value / maxValue) * graphHeight;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };

    // Draw the lines
    drawLine(lastMonthData, "#3b82f6", lastMonthGradient); // Blue line
    drawLine(thisMonthData, "#10b981", thisMonthGradient); // Green line
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow-sm">
      <div className="relative h-48 mb-6">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-gray-400 text-sm">Last Month</span>
        </div>
        <div className="text-gray-800 font-medium">$3,004</div>

        <div className="mx-4 text-gray-300">|</div>

        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
          <span className="text-gray-400 text-sm">This Month</span>
        </div>
        <div className="text-gray-800 font-medium">$4,504</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-emerald-50 flex flex-col items-center justify-center py-4">
          <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center mb-2">
            <PencilIcon className="h-4 w-4 text-white" />
          </div>
          <div className="text-3xl font-bold text-gray-800">5</div>
          <div className="text-emerald-700 text-sm">Total Event</div>
        </Card>

        <Card className="bg-blue-50 flex flex-col items-center justify-center py-4">
          <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center mb-2">
            <UserIcon className="h-4 w-4 text-white" />
          </div>
          <div className="text-3xl font-bold text-gray-800">128</div>
          <div className="text-blue-700 text-sm">Total User</div>
        </Card>

        <Card className="bg-purple-50 flex flex-col items-center justify-center py-4">
          <div className="w-8 h-8 rounded-full bg-purple-400 flex items-center justify-center mb-2">
            <DollarSignIcon className="h-4 w-4 text-white" />
          </div>
          <div className="text-3xl font-bold text-gray-800">$8,540</div>
          <div className="text-purple-700 text-sm">Revenue</div>
        </Card>
      </div>
    </div>
  );
}
