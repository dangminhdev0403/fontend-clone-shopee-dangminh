import { LanguageDropdown } from "@components/Dropdown";
import { InputCheckBox } from "@components/Form/CheckBox";

const ListProduct = () => {
  return (
    <section className="h-screen w-full bg-[#f5f5f5]">
      <div>
        <h3 className="font-bold">Bộ lọc tìm kiếm </h3>
        <div>
          <h5>Theo danh mục</h5>
          <InputCheckBox />
          <LanguageDropdown />
        </div>
      </div>
    </section>
  );
};

export default ListProduct;
