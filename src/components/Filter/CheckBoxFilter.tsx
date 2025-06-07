import { useProductFilter } from "@hooks/useProductFilter";

interface FilterCheckBox {
  filterData: {
    name: string;
    value?: Array<{ id: string; name: string }>;
    type?: string;
  };
}

const CheckBoxFilter = ({ ...props }: FilterCheckBox) => {
  const { filter, updateFilter } = useProductFilter();
  const isActive = filter.categoryId?.toString();
  const handleFilter = (id: string) => {
    updateFilter({ ...filter, categoryId: id });
  };

  return (
    <div className="border-b border-gray-300 pb-4">
      <h4 className="mb-1">{props.filterData.name}</h4>{" "}
      {(props?.filterData?.value || []).map((item) => (
        <div
          key={item.id}
          className="flex cursor-pointer items-center gap-2 p-1"
        >
          <input
            onChange={() => handleFilter(item.id)}
            type={props.filterData.type ?? "checkbox"}
            name={props.filterData.name}
            id={item.id}
            title={`${item.name}`}
            className=""
          />

          <label
            htmlFor={item.id}
            className={`${isActive === item.id ? "text-amber-500" : ""}`}
          >
            {item.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckBoxFilter;
