import CheckBoxFilter from "@components/Filter";
import {
  faChevronLeft,
  faChevronRight,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProductFilter } from "@hooks/useProductFilter";
import Pagination from "@mui/material/Pagination";
import ItemProduct from "@pages/Product/ItemProduct";
import productApi from "@service/product.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { filters, sorts } from "@utils/constants/response";

import { ProductItem } from "@utils/constants/types/product.type";
import { useState } from "react";

const ListProduct = () => {
  const [activeSort, setActiveSort] = useState<"ctime" | "price" | "sold">(
    "ctime",
  );

  const { filter, updateFilter } = useProductFilter();

  const { data: listProduct } = useQuery({
    queryKey: ["products", filter],
    queryFn: () => productApi.getAllProducts(filter),
    placeholderData: keepPreviousData,
  });

  const currentPage = listProduct?.data?.page?.number;

  const totalPages = listProduct?.data?.page?.totalPages;

  const handleSort = (id: "ctime" | "price" | "sold") => {
    setActiveSort(id);

    updateFilter({
      ...filter,
      sortBy: id,
      order: "desc",
    });
  };

  return (
    <section className="grid h-full w-full bg-[#f5f5f5] py-6 lg:grid-cols-12 lg:px-20">
      <div className="lg:col-span-2">
        <div className="mb-6 flex items-center gap-2">
          <FontAwesomeIcon icon={faFilter} style={{ color: "#4c4444" }} />
          <h3 className="text-base font-bold">Bộ lọc tìm kiếm</h3>
        </div>
        {filters.map((item) => (
          <CheckBoxFilter key={item.id} filterData={item.filter} />
        ))}

        <button className="mt-2 w-full cursor-pointer rounded bg-[#ee4d2d] py-2 text-sm text-white hover:opacity-90">
          Xoá tất cả
        </button>
      </div>

      <div className="pl-2.5 lg:col-span-10">
        {/* Sort */}
        <div className="flex w-full justify-between gap-10 bg-gray-200 px-5 py-3.5 text-sm">
          <div className="flex items-center">
            <span>Sắp xếp theo</span>
            {sorts.map((item) => {
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    handleSort(item.id as "ctime" | "price" | "sold");
                  }}
                  className={`ml-3 cursor-pointer rounded border px-3.5 py-2 ${activeSort === item.id ? "bg-[#ee4d2d] text-white" : "bg-white text-gray-700"}`}
                >
                  {item.value}
                </button>
              );
            })}
          </div>
          <div className="hidden items-center justify-center lg:flex">
            <span className="text-amber-500">{currentPage}</span>/{totalPages}
            <div className="ml-3 flex gap-1">
              <button
                onClick={() => updateFilter({ page: currentPage - 1 })}
                title="Previous"
                className="cursor-pointer bg-white p-1.5 px-3 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={currentPage <= 1}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                onClick={() => updateFilter({ page: currentPage + 1 })}
                title="Next"
                className="cursor-pointer bg-white p-1.5 px-3 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={currentPage >= totalPages}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </div>
        {/* List Product */}
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-5">
          {listProduct?.data?.content?.map((item: ProductItem) => (
            <ItemProduct key={item.id} {...item} />
          ))}
        </div>
        <div className="mt-10 flex w-full items-center justify-center gap-2">
          {listProduct?.data?.page && (
            <Pagination
              onChange={(e, page) => updateFilter({ page: page })}
              size="large"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "gray",
                  "&.Mui-selected": {
                    backgroundColor: "#ee4d2d",
                    color: "#fff",
                  },
                },
              }}
              count={totalPages}
              page={currentPage}
              variant="outlined"
              shape="rounded"
            />
          )}
        </div>{" "}
      </div>
    </section>
  );
};

export default ListProduct;
