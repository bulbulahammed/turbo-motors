/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadgeDollarSign, Pointer, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import FilterProduct from "../components/pageComponents/FilterProduct";
import {
  useDeleteMultiProductMutation,
  useGetProductQuery,
} from "../redux/feature/product/productApi";
import { useAppSelector } from "../redux/hook";
import { IBike } from "../types/globalTypes";

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { email: user } = useAppSelector((state) => state?.auth.user);

  const [
    deleteMultiProduct,
    { isError: MultiDeleteError, isSuccess: MultiDeleted },
  ] = useDeleteMultiProductMutation();

  // To multiple Delete State
  const [toDelete, setToDelete] = useState<string[]>([]);

  // filter state and effect for update
  const [filter, setFilter] = useState({
    releaseDate: "",
    brand: "",
    model: "",
    type: "",
    size: "",
    color: "",
    suspension: "",
    searchTerm: "",
  });
  useEffect(() => {
    const tempSearchParams: typeof filter = {
      releaseDate: searchParams.get("releaseDate") || "",
      brand: searchParams.get("brand") || "",
      model: searchParams.get("model") || "",
      type: searchParams.get("type") || "",
      size: searchParams.get("size") || "",
      color: searchParams.get("color") || "",
      suspension: searchParams.get("suspension") || "",
      searchTerm: searchParams.get("searchTerm") || "",
    };
    setFilter(tempSearchParams);
  }, [location, searchParams]);

  // Get Filtered products query
  const { data, isError, isSuccess, isLoading } = useGetProductQuery({
    releaseDate: filter.releaseDate,
    brand: filter.brand,
    model: filter.model,
    type: filter.type,
    size: filter.size,
    color: filter.color,
    suspension: filter.suspension,
    searchTerm: filter.searchTerm,
  });
  const allBikes = data?.data;

  // Handle Multi Delete
  const handleMultiDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete these items?"
    );
    if (confirmDelete) {
      console.log(toDelete, "Is Going To Delete");
      deleteMultiProduct({ ids: toDelete }); // Pass object with ids property directly
    }
  };

  useEffect(() => {
    if (MultiDeleted) {
      toast.success("Deleted Successfully", { toastId: "successMultiDelete" });
      navigate("/products");
    }
    if (MultiDeleteError) {
      toast.error("Failed to delete", { toastId: "errorMultiDelete3" });
    }
  }, [MultiDeleted, MultiDeleteError, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full text-center">
        {/* //Product Filter4ing Options */}
        <div className="text-canter my-10">
          <FilterProduct filter={filter} setFilter={setFilter} />
        </div>
        <div className="overflow-x-auto">
          {isLoading && (
            <span className="flex items-center justify-center">
              <span className="loading loading-ring loading-lg"></span>
            </span>
          )}
          {isError && (
            <span className="flex items-center justify-center text-red-600">
              <p
                style={{
                  fontFamily: "'Allerta', sans-serif",
                }}
              >
                An error occurred while fetching data
              </p>
            </span>
          )}
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Sell</th>
                <th>Actions</th>
                <th>
                  <span className="flex justify-center items-center">
                    <span>Select</span>
                    {toDelete.length > 0 && (
                      <span>
                        <button
                          onClick={handleMultiDelete}
                          className="text-red-600"
                        >
                          <Trash2 />
                        </button>
                      </span>
                    )}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* ------- Product Row------- */}
              {!isLoading &&
                !isError &&
                isSuccess &&
                allBikes?.map((bike: IBike) => {
                  // Check if the seller of the bike matches the logged-in user
                  if (bike.seller === user) {
                    return (
                      <tr key={bike.id}>
                        <td>{bike.title}</td>
                        <td>
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={bike.img}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                        </td>
                        <td>{bike.brand}</td>
                        <td>{bike.price}</td>
                        <td>{bike.quantity}</td>
                        <td>
                          {/* -----------------Sell----------------------------- */}
                          <Link to={`/sell/${bike.id}`}>
                            <div className="tooltip" data-tip="Sell">
                              <BadgeDollarSign />
                            </div>
                          </Link>
                        </td>
                        {/*---------------------- Action Button---------------- */}
                        <td className="tooltip" data-tip="Details Actions">
                          <Link to={`/bikeDetails/${bike.id}`}>
                            <Pointer />
                          </Link>
                        </td>
                        <td>
                          <label>
                            <input
                              type="checkbox"
                              className="checkbox checkbox-primary text-4xl"
                              onChange={(e) => {
                                if (e.target.checked === true) {
                                  setToDelete([...toDelete, bike.id!]);
                                } else {
                                  setToDelete(
                                    toDelete.filter(
                                      (SampleID) => SampleID != bike.id
                                    )
                                  );
                                }
                              }}
                            />
                          </label>
                        </td>
                      </tr>
                    );
                  } else {
                    // If the bike seller doesn't match the user, don't render the row
                    return null;
                  }
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Product;
