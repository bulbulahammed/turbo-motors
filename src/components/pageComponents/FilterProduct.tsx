/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetProductQuery } from "../../redux/feature/product/productApi";
import FilterDropDown from "../UI/FilterDropDown";
import ProductSearchBar from "../UI/ProductSearchBar";

type IFilterProduct = {
  filter: {
    releaseDate: string;
    brand: string;
    model: string;
    size: string;
    type: string;
    color: string;
    suspension: string;
    searchTerm: string;
  };
  setFilter: React.Dispatch<
    React.SetStateAction<{
      releaseDate: string;
      brand: string;
      model: string;
      type: string;
      size: string;
      color: string;
      suspension: string;
      searchTerm: string;
    }>
  >;
};

export default function FilterProduct({ filter }: IFilterProduct) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data } = useGetProductQuery({
    releaseDate: filter.releaseDate,
    brand: filter.brand,
    model: filter.model,
    type: filter.type,
    size: filter.size,
    color: filter.color,
    suspension: filter.suspension,
    searchTerm: filter.searchTerm,
  });

  const AllProduct = data?.data;
  let uniqueBrands: string[] = [];
  let uniqueReleaseDates: string[] = [];
  let uniqueModels: string[] = [];
  let uniqueTypes: string[] = [];
  let uniqueSizes: string[] = [];
  let uniqueColors: string[] = [];
  let uniqueSuspensions: string[] = [];

  // Check if All Product is defined
  if (AllProduct) {
    // Use a Set to store unique genres and publication years
    const uniqueBrandSet = new Set();
    const uniqueReleaseDateSet = new Set();
    const uniqueModelSet = new Set();
    const uniqueTypeSet = new Set();
    const uniqueSizeSet = new Set();
    const uniqueColorSet = new Set();
    const uniqueSuspensionSet = new Set();

    // Iterate through the Products and add genres and publication years to their respective Sets
    AllProduct.forEach(
      (product: {
        brand: string;
        releaseDate: string;
        model: string;
        type: string;
        size: string;
        color: string;
        suspension: string;
      }) => {
        uniqueBrandSet.add(product.brand);
        uniqueReleaseDateSet.add(product.releaseDate);
        uniqueModelSet.add(product.model);
        uniqueTypeSet.add(product.type);
        uniqueSizeSet.add(product.size);
        uniqueColorSet.add(product.color);
        uniqueSuspensionSet.add(product.suspension);
      }
    );

    // Convert the Sets back to arrays if needed and cast them to string[]
    uniqueBrands = Array.from(uniqueBrandSet) as string[];
    uniqueReleaseDates = Array.from(uniqueReleaseDateSet) as string[];
    uniqueModels = Array.from(uniqueModelSet) as string[];
    uniqueTypes = Array.from(uniqueTypeSet) as string[];
    uniqueSizes = Array.from(uniqueSizeSet) as string[];
    uniqueColors = Array.from(uniqueColorSet) as string[];
    uniqueSuspensions = Array.from(uniqueSuspensionSet) as string[];
  }

  //handleFilter
  type IHandleFilter = {
    key: string;
    value: string;
  };
  const handleFilter = ({ key, value }: IHandleFilter) => {
    searchParams.set(`${key}`, value);
    navigate(`/products?${searchParams.toString()}`);
  };

  return (
    <div className=" flex items-center justify-center flex-wrap gap-[10px]">
      {/* --------------All Button----------------- */}
      <div>
        <button
          className="btn btn-accent"
          onClick={() => {
            setSearchParams({});
            navigate(`/products`);
          }}
        >
          All
        </button>
      </div>
      {/*------------------ Brand Dropdown ---------------*/}
      <div>
        <FilterDropDown
          optionLabel={filter.brand ? filter.brand : "Brand"}
          items={uniqueBrands}
          handleFilterValue={(value) => {
            handleFilter({
              key: "brand",
              value,
            });
          }}
        />
      </div>
      {/* -------------Release Date Dropdown --------------*/}
      <div>
        <FilterDropDown
          optionLabel={filter.releaseDate ? filter.releaseDate : "Release Date"}
          items={uniqueReleaseDates}
          handleFilterValue={(value) => {
            handleFilter({
              key: "releaseDate",
              value,
            });
          }}
        />
      </div>
      {/* -------------Model Dropdown --------------*/}
      <div>
        <FilterDropDown
          optionLabel={filter.model ? filter.model : "Model"}
          items={uniqueModels}
          handleFilterValue={(value) => {
            handleFilter({
              key: "model",
              value,
            });
          }}
        />
      </div>
      {/* -------------Type Dropdown --------------*/}
      <div>
        <FilterDropDown
          optionLabel={filter.type ? filter.type : "Type"}
          items={uniqueTypes}
          handleFilterValue={(value) => {
            handleFilter({
              key: "type",
              value,
            });
          }}
        />
      </div>
      {/* -------------Size Dropdown --------------*/}
      <div>
        <FilterDropDown
          optionLabel={filter.size ? filter.size : "Size"}
          items={uniqueSizes}
          handleFilterValue={(value) => {
            handleFilter({
              key: "size",
              value,
            });
          }}
        />
      </div>
      {/* -------------Color Dropdown --------------*/}
      <div>
        <FilterDropDown
          optionLabel={filter.color ? filter.color : "Color"}
          items={uniqueColors}
          handleFilterValue={(value) => {
            handleFilter({
              key: "color",
              value,
            });
          }}
        />
      </div>
      {/* -------------Suspension Dropdown --------------*/}
      <div>
        <FilterDropDown
          optionLabel={filter.suspension ? filter.suspension : "Suspension"}
          items={uniqueSuspensions}
          handleFilterValue={(value) => {
            handleFilter({
              key: "suspension",
              value,
            });
          }}
        />
      </div>
      {/*------------------ Input Search Keyword-------------------*/}
      <div>
        <ProductSearchBar
          current_value={filter.searchTerm ? filter.searchTerm : ""}
          handleFilterValue={(value) => {
            handleFilter({
              key: "searchTerm",
              value,
            });
          }}
        />
      </div>
    </div>
  );
}
