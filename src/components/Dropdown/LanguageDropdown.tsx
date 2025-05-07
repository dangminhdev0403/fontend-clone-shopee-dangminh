import { GlobeAltIcon } from "@heroicons/react/24/solid";

export default function LanguageDropdown() {
  return (
    <div className="group relative inline-block text-white">
      {/* Nút dropdown */}
      <div className="flex cursor-pointer items-center gap-1 bg-transparent px-2">
        <GlobeAltIcon className="h-5 w-5 text-white" />
        <span>Tiếng Việt</span>
      </div>

      {/* Menu dropdown có hiệu ứng */}
      <div className="invisible absolute top-full left-0 z-50 mt-3 w-36 scale-95 rounded-md bg-white text-black opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100">
        {/* Mũi tên chỉ lên */}
        <div className="absolute top-[-8px] left-4 h-0 w-0 border-r-8 border-b-8 border-l-8 border-r-transparent border-b-white border-l-transparent" />

        <div className="px-4 py-2 text-[#ee4d2d] hover:bg-gray-100">
          Tiếng Việt
        </div>
        <div className="cursor-pointer px-4 py-2 hover:bg-gray-100">
          English
        </div>
      </div>
    </div>
  );
}
