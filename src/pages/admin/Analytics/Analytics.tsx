"use client";

import { BarChart3 } from "lucide-react";

export function Analytics() {
  return (
    <div className="py-20 text-center">
      <div className="rounded-2xl bg-white p-12 shadow-xl dark:bg-gray-800">
        <BarChart3 className="mx-auto mb-4 h-16 w-16 text-gray-400" />
        <h3 className="mb-2 text-xl font-semibold">Thống kê & Phân tích</h3>
        <p className="text-gray-500">Tính năng đang phát triển</p>
      </div>
    </div>
  );
}
