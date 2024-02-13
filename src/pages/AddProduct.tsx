/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAddProductMutation } from "../redux/feature/product/productApi";

const AddProduct = () => {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      product: {
        ...prevData.product,
        [name]: value,
      },
    }));
  };

  const [addProduct, { data, isLoading, isSuccess, isError, error }] =
    useAddProductMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    addProduct(formData);
  };

  const ToastMessage = data?.message;
  useEffect(() => {
    if (isSuccess) {
      toast.success(ToastMessage, { toastId: "AddProductSuccess" });
      navigate("/products");
    }
    if (isError) {
      toast.error(ToastMessage, { toastId: "AddProductError" });
    }
    if (error) {
      toast.error("File Too Large/ Network Error", {
        toastId: "AddProductErrors",
      });
    }
  }, [isSuccess, isError, ToastMessage, navigate, error]);

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="container mx-10">
        <h2 className="mb-6 text-xl text-center">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/*----------- Label For Title ------------*/}
            <div>
              <label className="label">
                <span className="label-text text-sm">Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-white"
                name="title"
                placeholder="Title"
                value={formData.product.title}
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
                placeholder="Brand"
                value={formData.product.brand}
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
                placeholder="Color"
                value={formData.product.color}
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
                placeholder="Model"
                value={formData.product.model}
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
                placeholder="Price"
                value={formData.product.price}
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
                placeholder="Quantity"
                value={formData.product.quantity}
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
                placeholder="Release Date"
                value={formData.product.releaseDate}
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
                placeholder="Size"
                value={formData.product.size}
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
                placeholder="Suspension"
                value={formData.product.suspension}
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
                placeholder="Type"
                value={formData.product.type}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="text-center">
            {/*----------- Label For  Img ------------*/}
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
                      ...prevData,
                      product: {
                        ...prevData.product,
                        img: base64,
                      },
                    }));
                  }}
                  required
                />
                {formData?.product.img ? (
                  <img
                    src={formData.product.img}
                    alt="img"
                    className="w-20 h-20"
                  />
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
                Add Product
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
