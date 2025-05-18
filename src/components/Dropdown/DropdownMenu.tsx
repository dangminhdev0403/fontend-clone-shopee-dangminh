interface DropdownMenuProps {
  label: string;
  items: Array<{ name: string; value: string }>;
  icon?: React.ReactNode;

  onItemClick?: (item: string) => void;
}
export default function DropdownMenu({
  ...props
}: Readonly<DropdownMenuProps>) {
  return (
    <div className="group relative inline-block text-white">
      {/* Nút dropdown */}
      <div className="flex cursor-pointer items-center gap-1 bg-transparent px-2">
        {props.icon}
        <span>{props.label}</span>
      </div>

      {/* Menu dropdown có hiệu ứng */}
      <div className="invisible absolute top-full left-0 z-50 mt-3 w-36 scale-95 rounded-md bg-white text-black opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100">
        {/* Mũi tên chỉ lên */}
        <div className="absolute top-[-8px] left-4 h-0 w-0 border-r-8 border-b-8 border-l-8 border-r-transparent border-b-white border-l-transparent" />

        {props.items.map((item) => (
          <button
            key={item.value}
            onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            className="block w-full px-4 py-2 hover:cursor-pointer hover:bg-gray-100 hover:text-amber-500"
            onClick={() => props.onItemClick?.(item.value)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
