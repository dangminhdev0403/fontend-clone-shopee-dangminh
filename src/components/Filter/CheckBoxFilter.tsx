interface FilterCheckBox {
  filterData: {
    name: string;
    value: Array<{ id: string; value: string }>;
  };
}

const CheckBoxFilter = ({ ...props }: FilterCheckBox) => {
  return (
    <div className="border-b border-gray-300 pb-4">
      <h4 className="mb-1">{props.filterData.name}</h4>{" "}
      {props.filterData.value.map((item) => (
        <div key={item.id} className="flex items-center gap-2 p-1">
          <input
            type="checkbox"
            name={props.filterData.name}
            id={item.id}
            title={`${item.value}`}
          />
          <label htmlFor="ca">{item.value}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckBoxFilter;
