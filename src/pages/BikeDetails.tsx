/* eslint-disable @typescript-eslint/no-unused-vars */
import { Copy, Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteProductMutation,
  useGetSingleProductQuery,
} from "../redux/feature/product/productApi";

const BikeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //Get Single Bike
  const { data, isLoading, isError, isSuccess } = useGetSingleProductQuery(id);
  const bikeData = data?.data;
  const [
    deleteBike,
    { isLoading: Deleting, isError: DeleteError, isSuccess: Deleted },
  ] = useDeleteProductMutation();

  useEffect(() => {
    if (Deleted) {
      toast.success("Bike Deleted", { toastId: "successDeleteBike" });
      navigate("/products");
    }
    if (DeleteError) {
      toast.error("Failed to delete", { toastId: "errorOnDeleteBike" });
    }
  }, [Deleted, DeleteError, navigate]);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      deleteBike(id);
    }
  };
  return (
    <section className="text-center min-h-scree">
      {bikeData ? (
        <div className="container mx-auto text-center">
          {isLoading ? (
            <span className="loading loading-ring loading-lg"></span>
          ) : (
            isSuccess && (
              <div className="min-h-screen flex justify-center items-center">
                <div className="card bg-base-100">
                  <div className="text-center mx-auto">
                    <h2 className="card-title py-10 text-center">
                      {bikeData?.title}
                    </h2>
                  </div>
                  <figure className="w-72 mx-auto">
                    <img
                      src={bikeData.img}
                      alt="Shoes"
                      className="rounded-xl"
                    />
                  </figure>
                  <div className="card-body text-center">
                    <div className="grid grid-cols-4 gap-3 text-left">
                      <div>
                        <span className="font-bold">Price:</span>{" "}
                        {bikeData.price}
                      </div>
                      <div>
                        <span className="font-bold">Model:</span>{" "}
                        {bikeData.model}
                      </div>
                      <div>
                        <span className="font-bold">Brand:</span>{" "}
                        {bikeData.brand}
                      </div>
                      <div>
                        <span className="font-bold">Suspension:</span>{" "}
                        {bikeData.suspension}
                      </div>
                      <div>
                        <span className="font-bold">Release:</span>{" "}
                        {bikeData.releaseDate}
                      </div>
                      <div>
                        <span className="font-bold">Type:</span> {bikeData.type}
                      </div>
                      <div>
                        <span className="font-bold">Color:</span>{" "}
                        {bikeData.color}
                      </div>
                      <div>
                        <span className="font-bold">Size:</span> {bikeData.size}
                      </div>
                      <div>
                        <span className="font-bold">Quantity:</span>{" "}
                        {bikeData.quantity}
                      </div>
                    </div>
                    <div className="flex justify-evenly pt-10">
                      {/* ------------Update Product--------------- */}
                      <div className="tooltip" data-tip="Update">
                        <Link to={`/update/${bikeData.id}`}>
                          <Pencil />
                        </Link>
                      </div>
                      {/*------------------------- Delete button ---------------- */}
                      {Deleting ? (
                        <button className="text-center rounded btn focus:outline-none my-4 bg-indigo-800 text-white">
                          <span className="loading loading-spinner text-white p-6"></span>
                        </button>
                      ) : (
                        <div className="tooltip" data-tip="Delete">
                          <button
                            onClick={handleDelete}
                            className="text-red-600"
                          >
                            <Trash2 />
                          </button>
                        </div>
                      )}
                      {/* -------------Create Variant -------------------------*/}
                      <div className="tooltip" data-tip="Create Variant">
                        <Link to={`/create-variant/${bikeData.id}`}>
                          <Copy />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
          {isError && (
            <div className="text-center text-red-600 ">
              <p
                className="text-2xl"
                style={{
                  fontFamily: "'Allerta', sans-serif",
                }}
              >
                Loading Error !
              </p>
            </div>
          )}
        </div>
      ) : (
        !isLoading && !isSuccess && <p>Something Went Wrong!</p>
      )}
    </section>
  );
};

export default BikeDetails;
