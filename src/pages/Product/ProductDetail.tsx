import { QuantityInput } from "@components/Form/InputText";
import ProductRating from "@components/Rating/ProductRating";
import DOMPurify from "dompurify";

import {
  faCartArrowDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import productApi from "@service/product.service";
import { useQuery } from "@tanstack/react-query";
import { formatNumber } from "@utils/helper";
import { useState } from "react";
import { useParams } from "react-router";

interface ProductImage {
  id: number;
  imageUrl: string;
}
const ProductDetail = () => {
  const { id } = useParams();
  const { data: productDetailData } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productApi.getProductDetail(id as string),
  });
  const [isActive, setIsActive] = useState(productDetailData?.images[0].id);
  const [isImageUrl, setIsImageUrl] = useState(
    productDetailData?.images[0].imageUrl,
  );

  const handleActive = (id: number) => {
    setIsActive(id);
    const findImage = productDetailData?.images.find(
      (image: ProductImage) => image.id === id,
    );
    setIsImageUrl(findImage?.imageUrl);
  };

  const nextImage = () => {
    const index = productDetailData?.images.findIndex(
      (image: ProductImage) => image.id === isActive,
    );
    const nextIndex =
      index === productDetailData?.images.length - 1 ? 0 : index + 1;
    handleActive(productDetailData?.images[nextIndex].id);
  };

  const prevImage = () => {
    const index = productDetailData?.images.findIndex(
      (image: ProductImage) => image.id === isActive,
    );
    const prevIndex =
      index === 0 ? productDetailData?.images.length - 1 : index - 1;
    handleActive(productDetailData?.images[prevIndex].id);
  };
  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto bg-white p-4 shadow">
        <div className="grid grid-cols-12 gap-9">
          <div className="col-span-5">
            <div className="relative w-full pt-[100%] shadow">
              <img
                src={isImageUrl}
                alt={isImageUrl}
                className="absolute top-0 left-0 h-full w-full bg-white object-cover"
              />
            </div>
            <div className="relative mt-3 grid grid-cols-5 gap-1">
              <button
                className="absolute top-1/2 left-0 z-10 h-10 w-10 -translate-y-1/2 cursor-pointer bg-[rgba(100,100,100,0.5)]"
                onClick={() => prevImage()}
              >
                <FontAwesomeIcon icon={faChevronLeft} />{" "}
              </button>
              {productDetailData?.images
                .slice(0, 5)
                .map((image: ProductImage) => {
                  const active = image.id === isActive;
                  return (
                    <div
                      key={image.id}
                      className="relative ml-2 w-full pt-[100%]"
                      onMouseEnter={() => handleActive(image.id)}
                    >
                      <img
                        src={image?.imageUrl}
                        alt={image?.imageUrl}
                        className="absolute top-0 left-0 h-full w-full bg-white object-cover"
                      />
                      {active && (
                        <div className="absolute inset-0 border-2 border-amber-500 opacity-50"></div>
                      )}
                    </div>
                  );
                })}

              <button
                className="absolute top-1/2 right-0 z-10 h-10 w-10 -translate-y-1/2 cursor-pointer bg-[rgba(100,100,100,0.5)]"
                onClick={() => nextImage()}
              >
                <FontAwesomeIcon icon={faChevronRight} />{" "}
              </button>
            </div>
          </div>
          <div className="col-span-7">
            <h1 className="font-base text-xl uppercase">
              {productDetailData?.name}
            </h1>
            <div className="mt-8 flex items-center">
              <div>
                <ProductRating value={5} />
              </div>
              <div className="mx-4 h-6 w-[1px] bg-gray-400"></div>
              <div>
                <span>{formatNumber(50000)}</span>
                <span className="ml-2 text-gray-400">Đã bán</span>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-2 bg-gray-50 px-5 py-4">
              <div className="text-gray-400 line-through">
                {productDetailData?.price.toLocaleString("vi-VN")}
              </div>
              <div className="ml-3 flex items-start gap-1 text-3xl leading-none text-orange-400">
                <span className="-mb-1 text-lg">đ</span>
                <span>{productDetailData?.price.toLocaleString("vi-VN")}</span>
              </div>
            </div>
            <div className="mt-8 flex items-center">
              <div className="text-gray-500 capitalize">Số lượng:</div>
              <div className="ml-10 flex items-center">
                <QuantityInput max={productDetailData?.stock} />
                <span className="ml-2 text-gray-500">
                  {productDetailData?.stock} sản phẩm có sẵn
                </span>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <button
                title="Add to Cart"
                className="cursor-pointer border border-amber-500 bg-amber-50 p-3 text-amber-600"
              >
                <FontAwesomeIcon
                  icon={faCartArrowDown}
                  style={{ color: "#f05d40" }}
                />{" "}
                Thêm vào giỏ hàng
              </button>
              <button
                title="Add to Cart"
                className="cursor-pointer border border-amber-500 bg-[#f05d40] p-3 text-white"
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-4 bg-white p-4 shadow">
        <div>
          <h2 className="bg-gray-50 p-2 text-lg uppercase">
            CHI TIẾT SẢN PHẨM
          </h2>
          <div>
            <div className="flex items-center p-2">
              <p className="w-1/4 text-gray-400">Danh mục</p>
              <p>{productDetailData?.category?.name}</p>
            </div>
            <div className="flex items-center p-2">
              <p className="w-1/4 text-gray-400">Kho</p>
              <p>{productDetailData?.stock}</p>
            </div>
            <div className="flex items-center p-2">
              <p className="w-1/4 text-gray-400">Gửi từ</p>
              <p>Hồ Chí Minh</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="bg-gray-50 p-2 text-lg uppercase">MÔ TẢ SẢN PHẨM</h2>
          <div className="mt-4 text-sm leading-loose">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(productDetailData?.description),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
