/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  useDeleteProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../redux/feature/product/productApi";

import "react-datepicker/dist/react-datepicker.css";
import { useAddSaleMutation } from "../redux/feature/sell/sellApi.slice";

const Sell = () => {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const { id } = useParams();

  const [startDate, setStartDate] = useState(new Date());

  const [formData, setFormData] = useState({
    sell: {
      seller: email || "",
      buyer: "",
      salesQuantity: 1,
      totalPrice: 0,
      salesDate: "",
    },
  });

  const {
    data: singleBike,
    isError: singleBikeError,
    isSuccess: singleBikeSuccess,
  } = useGetSingleProductQuery(id);

  useEffect(() => {
    if (singleBikeError) {
      toast.error("Error on data loading", { toastId: "ToSellLoadError" });
    }
  }, [singleBikeSuccess, singleBikeError]);

  const toSellBike = singleBike?.data;

  console.log("From Sell Page", toSellBike);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "salesQuantity") {
      const salesQuantity = parseInt(value);
      let totalPrice = 0;
      if (
        toSellBike &&
        toSellBike.price &&
        salesQuantity >= 1 && // Ensure salesQuantity is greater than or equal to 1
        salesQuantity <= toSellBike.quantity
      ) {
        totalPrice = salesQuantity * toSellBike.price;
      } else {
        // Display toast message if salesQuantity is less than one
        toast.error("Sales quantity must be at least 1", {
          toastId: "InvalidSalesQuantity",
        });
      }
      setFormData((prevData) => ({
        ...prevData,
        sell: {
          ...prevData.sell,
          [name]: salesQuantity >= 1 ? salesQuantity : 1, // Ensure salesQuantity is at least 1
          totalPrice: totalPrice,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        sell: {
          ...prevData.sell,
          [name]: value,
        },
      }));
    }
  };

  const [addSell, { isLoading, isSuccess, isError, error }] =
    useAddSaleMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product Sold Successfully", {
        toastId: "SellProductSuccess",
      });
      navigate("/products");
    }
    if (isError) {
      toast.error("Product Sold Error", { toastId: "MakeSellProductError" });
    }
    if (error) {
      toast.error("Can not sell this Bike", {
        toastId: "SellProductErrors",
      });
    }
  }, [isSuccess, isError, navigate, error]);

  // After Sell the Related Bike will Be Update
  const [
    updateBike,
    { isSuccess: updateSuccess, isLoading: isUpdating, isError: updateError },
  ] = useUpdateProductMutation();
  console.log(updateSuccess, isUpdating, updateError);
  // If quantity Become 0 after sell it will be Remove/Delete
  const [deleteBike] = useDeleteProductMutation();

  // ---------------------Handle Submit ----------------------------
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { salesQuantity } = formData.sell;
    if (toSellBike && salesQuantity > toSellBike.quantity) {
      toast.error("Exceed Sales Quantity", {
        toastId: "InValidSalesQuantity",
      });
      return;
    }
    try {
      const sellResponse = await addSell(formData);
      if ("data" in sellResponse) {
        const newQuantity = toSellBike.quantity - salesQuantity;
        await updateBike({ id, quantity: newQuantity });
        toast.success("Product Sold Successfully", {
          toastId: "SellProductSuccess",
        });
        navigate("/products");
        // If the product Quantity Become 0 then it will be Delete
        if (newQuantity === 0) {
          await deleteBike(id);
        }
      } else {
        toast.error("Failed to sell product", {
          toastId: "SellProductError",
        });
      }
    } catch (error) {
      console.error("Error selling product:", error);
      toast.error("Error selling product", { toastId: "SellProductError" });
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="container mx-10">
        <h2 className="mb-6 text-xl text-center">Sell This Bikes</h2>
        <form onSubmit={handleSubmit} className="text-center">
          <div className="text-center">
            {/*----------- Label For Buyer ------------*/}
            <div className="mb-5">
              <label className="pr-10">
                <span>Buyer</span>
              </label>
              <input
                type="text"
                className="input input-bordered bg-white"
                name="buyer"
                placeholder="Buyer"
                value={formData.sell.buyer}
                onChange={handleChange}
                required
              />
            </div>
            {/*----------- Label For Quantity ------------*/}
            <div className="mb-5">
              <label className="pr-10">
                <span>Quantity</span>
              </label>
              <input
                type="text"
                className="input input-bordered bg-white"
                name="salesQuantity"
                placeholder="Sales Quantity"
                value={formData.sell.salesQuantity}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="pr-10">
                <span>Date</span>
              </label>
              <DatePicker
                selected={startDate ?? new Date()}
                onChange={(date) => {
                  if (date) {
                    setStartDate(date);
                    const formattedDate = date.toLocaleDateString("en-GB");
                    setFormData((prevData) => ({
                      ...prevData,
                      sell: {
                        ...prevData.sell,
                        salesDate: formattedDate,
                      },
                    }));
                  }
                }}
              />
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
              Sell
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default Sell;
