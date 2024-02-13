/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FormEvent, useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  useAddProductMutation,
  useGetSingleProductQuery,
} from "../redux/feature/product/productApi";

const CreateVariant = () => {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    product: {
      title: "",
      img: "",
      price: 0,
      releaseDate: "",
      brand: "",
      model: "",
      type: "",
      size: "",
      color: "",
      suspension: "",
      quantity: 0,
      seller: email || "",
    },
  });

  // Create New Variant
  const [addProduct, { isLoading, isSuccess, isError, error }] =
    useAddProductMutation();

  const {
    data: singleBike,
    isLoading: baseBikeLoading,
    isError: baseBikeError,
  } = useGetSingleProductQuery(id);

  const baseBike = singleBike?.data;

  useEffect(() => {
    if (baseBikeError) {
      toast.error("Error on data loading", { toastId: "baseBikeLoadError" });
    }
  }, [baseBikeError]);

  useEffect(() => {
    if (baseBike) {
      setFormData({ product: baseBike });
    }
  }, [baseBike]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Create Variant Successfully", {
        toastId: "createVariantSuccess",
      });
      navigate("/products");
    }
    if (isError) {
      toast.error("Failed To Create Variant", {
        toastId: "createVariantError",
      });
    }
    if (error) {
      toast.error("File Too Large/ Network Error", {
        toastId: "AddProductErrors",
      });
    }
  }, [isSuccess, isError, error, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      product: {
        ...prevData.product,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Destructure formData and exclude _id if it exists
    const { product } = formData;
    const productData = { ...product };
    if ("_id" in productData) {
      delete productData._id;
    }
    addProduct({ product: productData });
  };

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="container mx-10">
        <h2 className="mb-6 text-xl text-center">Make A New Variant</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div>
              <label className="label">
                <span className="label-text text-sm">Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-white"
                name="title"
                placeholder={
                  baseBikeLoading
                    ? "Loading........"
                    : baseBike?.title || "Title"
                }
                value={formData?.product?.title}
                onChange={handleChange}
                required
              />
            </div>
            {/*----------- Label For Brand ------------*/}
            <div>
              <label className="label">
                <span className="label-text text-sm">Brand</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-white"
                name="brand"
                placeholder={
                  isLoading ? "Loading........" : baseBike?.brand || "Brand"
                }
                value={formData?.product?.brand}
                onChange={handleChange}
                required
              />
            </div>
            {/*----------- Label For Color ------------*/}
            <div>
              <label className="label">
                <span className="label-text text-sm">Color</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-white"
                name="color"
                placeholder={
                  isLoading ? "Loading........" : baseBike?.color || "Color"
                }
                value={formData?.product?.color}
                onChange={handleChange}
                required
              />
            </div>
            {/*----------- Label For Model ------------*/}
            <div>
              <label className="label">
                <span className="label-text text-sm">Model</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-white"
                name="model"
                placeholder={
                  isLoading ? "Loading........" : baseBike?.model || "Model"
                }
                value={formData?.product?.model}
                onChange={handleChange}
                required
              />
            </div>
            {/*----------- Label For Price ------------*/}
            <div>
              <label className="label">
                <span className="label-text text-sm">Price</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-white"
                name="price"
                placeholder={
                  isLoading ? "Loading........" : baseBike?.price || "Price"
                }
                value={formData?.product?.price}
                onChange={handleChange}
                required
              />
            </div>
            {/*----------- Label For Quantity ------------*/}
            <div>
              <label className="label">
                <span className="label-text text-sm">Quantity</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-white"
                name="quantity"
                placeholder={
                  isLoading
                    ? "Loading........"
                    : baseBike?.quantity || "Quantity"
                }
                value={formData?.product?.quantity}
                onChange={handleChange}
                required
              />
            </div>
            {/*----------- Label For Release Date ------------*/}
            <div>
              <label className="label">
                <span className="label-text text-sm">Release Date</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-white"
                name="releaseDate"
                placeholder={
                  isLoading
                    ? "Loading........"
                    : baseBike?.releaseData || "Release Date"
                }
                value={formData?.product?.releaseDate}
                onChange={handleChange}
                required
              />
            </div>
            {/*----------- Label For Size ------------*/}
            <div>
              <label className="label">
                <span className="label-text text-sm">Size</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-white"
                name="size"
                placeholder={
                  isLoading ? "Loading........" : baseBike?.size || "Size"
                }
                value={formData?.product?.size}
                onChange={handleChange}
                required
              />
            </div>

            {/*----------- Label For Suspension ------------*/}
            <div>
              <label className="label">
                <span className="label-text text-sm">Suspension</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-white"
                name="suspension"
                placeholder={
                  isLoading
                    ? "Loading........"
                    : baseBike?.suspension || "Suspension"
                }
                value={formData?.product?.suspension}
                onChange={handleChange}
                required
              />
            </div>
            {/*----------- Label For type ------------*/}
            <div>
              <label className="label">
                <span className="label-text text-sm">Type</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-white"
                name="type"
                placeholder={
                  isLoading ? "Loading........" : baseBike?.type || "Type"
                }
                value={formData?.product?.type}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="text-center">
            <div>
              <label className="label">
                <span className="label-text text-sm">Image</span>
              </label>
              <div className="flex items-center justify-evenly">
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }: { base64: string }) => {
                    setFormData((prevData) => ({
                      product: {
                        ...prevData.product,
                        img: base64,
                      },
                    }));
                  }}
                  required
                />
                {baseBike?.img ? (
                  <img src={baseBike?.img} alt="img" className="w-20 h-20" />
                ) : (
                  <p>Select</p>
                )}
              </div>
            </div>
            {isLoading ? (
              <button className="w-full text-center py-3 rounded btn-accent text-white focus:outline-none my-1">
                <span className="loading loading-ring loading-lg"></span>
              </button>
            ) : (
              <button
                type="submit"
                className="max-w-md text-center py-3 rounded btn focus:outline-none my-4 bg-indigo-800 text-white hover:bg-white hover:text-indigo-800 hover:border-indigo-800"
              >
                New Variant
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateVariant;
