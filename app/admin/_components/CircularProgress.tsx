"use client";

import { useEffect, useState } from "react";

interface CircularProgressProps {
  value: number;
  total: number;
  label: string;
  color?: string;
}

export default function CircularProgress({
  value,
  total,
  label,
  color = "#3B82F6",
}: CircularProgressProps) {
  const percentage = total === 0 ? 0 : Math.round((value / total) * 100);

  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(percentage);
    }, 200);

    return () => clearTimeout(timeout);
  }, [percentage]);

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="
        rounded-3xl p-8 
        bg-green-200/40
        shadow-[10px_10px_30px_#c8d0e0,-10px_-10px_30px_#ffffff]
        flex flex-col items-center
      "
    >
      <div className="relative">
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="#dbe2ec"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={color}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{
              strokeDashoffset,
              transition: "stroke-dashoffset 0.8s ease",
            }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            transform={`rotate(-90 ${radius} ${radius})`}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-gray-800">
            {percentage}%
          </span>
          <span className="text-xs uppercase tracking-wider text-gray-500">
            {value}/{total}
          </span>
        </div>
      </div>

      <p className="mt-6 text-sm uppercase tracking-widest text-gray-500">
        {label}
      </p>
    </div>
  );
}
