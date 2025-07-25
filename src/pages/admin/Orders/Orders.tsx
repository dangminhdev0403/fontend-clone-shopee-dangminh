"use client";

import { ShoppingCart } from "lucide-react";

export function Orders() {
  return (
    <div className="py-20 text-center">
      <div className="rounded-2xl bg-white p-12 shadow-xl dark:bg-gray-800">
        <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-gray-400" />
        <h3 className="mb-2 text-xl font-semibold">Quản lý đơn hàng</h3>
        <p className="text-gray-500">Tính năng đang phát triển</p>
      </div>
    </div>
  );
}
