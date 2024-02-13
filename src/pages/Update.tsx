/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../redux/feature/product/productApi";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
  });

  const [
    updateBike,
    { isSuccess: updateSuccess, isLoading: isUpdating, isError: updateError },
  ] = useUpdateProductMutation();

  const {
    data: singleBike,
    isLoading,
    isError,
    isSuccess,
  } = useGetSingleProductQuery(id);

  useEffect(() => {
    if (isError) {
      toast.error("Error on data loading", { toastId: "editLoadError" });
    }
  }, [isError]);

  const toUpdateBike = singleBike?.data;

  useEffect(() => {
    if (toUpdateBike) {
      setFormData(toUpdateBike);
    }
  }, [toUpdateBike]);

  if (updateSuccess) {
    toast.success("Successfully Updated", { toastId: "successUpdateBike" });
  }
  if (updateError) {
    toast.error("Update Failed!", { toastId: "BikeUpdateError" });
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateBike({ id, ...formData });
    navigate("/products");
  };

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="container mx-10">
        <h2 className="mb-6 text-xl text-center">Update Bike Information</h2>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading data</p>}
        {isSuccess && (
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
                  placeholder={
                    isLoading
                      ? "Loading........"
                      : toUpdateBike?.title || "Title"
                  }
                  value={formData.title}
                  onChange={handleChange}
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
                    isLoading
                      ? "Loading........"
                      : toUpdateBike?.brand || "Brand"
                  }
                  value={formData.brand}
                  onChange={handleChange}
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
                    isLoading
                      ? "Loading........"
                      : toUpdateBike?.color || "Color"
                  }
                  value={formData.color}
                  onChange={handleChange}
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
                    isLoading
                      ? "Loading........"
                      : toUpdateBike?.model || "Model"
                  }
                  value={formData.model}
                  onChange={handleChange}
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
                    isLoading
                      ? "Loading........"
                      : toUpdateBike?.price || "Price"
                  }
                  value={formData.price}
                  onChange={handleChange}
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
                      : toUpdateBike?.quantity || "Quantity"
                  }
                  value={formData.quantity}
                  onChange={handleChange}
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
                      : toUpdateBike?.releaseDate || "Release Date"
                  }
                  value={formData.releaseDate}
                  onChange={handleChange}
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
                    isLoading ? "Loading........" : toUpdateBike?.size || "Size"
                  }
                  value={formData.size}
                  onChange={handleChange}
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
                      : toUpdateBike?.suspension || "Suspension"
                  }
                  value={formData.suspension}
                  onChange={handleChange}
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
                    isLoading ? "Loading........" : toUpdateBike?.type || "Type"
                  }
                  value={formData.type}
                  onChange={handleChange}
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
                      setFormData({
                        ...formData,
                        img: base64,
                      });
                    }}
                  />
                  {formData.img ? (
                    <img src={formData.img} alt="img" className="w-20 h-20" />
                  ) : (
                    <p>Select</p>
                  )}
                </div>
              </div>
              {isUpdating ? (
                <button className="max-w-md text-center py-3 rounded btn focus:outline-none my-4 bg-indigo-800 text-white hover:bg-white hover:text-indigo-800 hover:border-indigo-800">
                  <span className="loading loading-ring loading-lg"></span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="max-w-md text-center py-3 rounded btn focus:outline-none my-4 bg-indigo-800 text-white hover:bg-white hover:text-indigo-800 hover:border-indigo-800"
                >
                  Update
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default Update;
