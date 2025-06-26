import { Button } from "@mui/material";
import React from "react";

type HasId = { id: string | number };

interface DropdownMenuProps<T extends HasId> {
  label?: string;
  items: T[];
  icon?: React.ReactNode;
  isCard?: boolean;
  renderItem: (item: T) => React.ReactNode;
  popsition?: string;
}

export default function DropdownMenu<T extends HasId>({
  label,
  items,
  icon,
  isCard,
  renderItem,
  popsition,
}: Readonly<DropdownMenuProps<T>>) {
  return (
    <div className="group relative inline-block text-white">
      {/* Nút dropdown */}
      <div className="flex cursor-pointer items-center gap-1 bg-transparent px-2">
        {icon && <span>{icon}</span>}
        {label && <span>{label}</span>}
      </div>

      {/* Menu dropdown */}
      <div
        className={`invisible absolute top-full left-[-3rem] z-50 mt-3 min-w-36 scale-95 rounded-md bg-white text-black opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100 ${popsition}`}
      >
        <div className="absolute top-[-8px] right-4 h-0 border-r-8 border-b-8 border-l-8 border-r-transparent border-b-white border-l-transparent" />
        {isCard && (
          <p className="ml-2 p-2 text-sm text-gray-400">Sản phẩm mới thêm</p>
        )}
        {items.map((item) => (
          <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
        ))}
        <div className="flex items-center justify-end p-2">
          <Button variant="contained" className="!bg-[#ee4d2d]" >
            Xem giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  );
}
