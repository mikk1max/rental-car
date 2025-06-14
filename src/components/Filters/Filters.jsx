import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "../ui/CustomSelect/CustomSelect";
import Loader from "../ui/Loader/Loader";
import s from "./Filters.module.css";
import CustomInput from "../ui/CustomInput/CustomInput";
import CustomButton from "../ui/CustomButton/CustomButton";
import clsx from "clsx";

import {
  selectBrands,
  selectError,
  selectIsLoading,
  selectSelectedBrand,
  selectSelectedPrice,
  selectMileageFrom,
  selectMileageTo,
} from "../../redux/filters/selectors";

import {
  setSelectedBrand,
  setSelectedPrice,
  setMileageFrom,
  setMileageTo,
  setPage,
} from "../../redux/filters/slice";

import { fetchBrands } from "../../redux/filters/operations";
import { fetchCars } from "../../redux/cars/operations";
import { resetCars } from "../../redux/cars/slice";

export default function Filters({ className }) {
  const dispatch = useDispatch();

  const brands = useSelector(selectBrands);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const selectedBrand = useSelector(selectSelectedBrand);
  const selectedPrice = useSelector(selectSelectedPrice);
  const mileageFrom = useSelector(selectMileageFrom);
  const mileageTo = useSelector(selectMileageTo);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const prices = ["Any", ...Array.from({ length: 11 }, (_, i) => (i + 2) * 10)];

  const handleSearch = () => {
    dispatch(setPage(1)); // Reset page
    dispatch(resetCars()); // ✅ Clear previous list

    dispatch(
      fetchCars({
        brand: selectedBrand !== "Any" ? selectedBrand : null,
        price: selectedPrice !== "Any" ? Number(selectedPrice) : null,
        mileageFrom: mileageFrom || null,
        mileageTo: mileageTo || null,
        page: 1,
      })
    );
  };

  if (isLoading) return <Loader />;
  if (error) return <p className={s.error}>Error: {error}</p>;

  return (
    <div className={clsx(s.filtersContainer, className)}>
      <label className={s.carBrandLabel}>
        <span>Car brand</span>
        <CustomSelect
          options={brands}
          placeholder="Choose a brand"
          value={selectedBrand}
          onChange={(e, value) => dispatch(setSelectedBrand(value))}
        />
      </label>

      <label className={s.pricePerHourLabel}>
        <span>Price / 1 hour</span>
        <CustomSelect
          options={prices}
          placeholder="Choose a price"
          value={selectedPrice}
          onChange={(e, value) => dispatch(setSelectedPrice(value))}
        />
      </label>

      <label className={s.fromToLabel}>
        <span>Сar mileage / km</span>
        <div className={s.inputsContainer}>
          <CustomInput
            placeholder="From"
            className={s.fromInput}
            value={mileageFrom}
            onChange={(e) => dispatch(setMileageFrom(e.target.value))}
          />
          <CustomInput
            placeholder="To"
            className={s.toInput}
            value={mileageTo}
            onChange={(e) => dispatch(setMileageTo(e.target.value))}
          />
        </div>
      </label>

      <CustomButton
        text="Search"
        preset={1}
        className={s.searchButton}
        onClick={handleSearch}
      />
    </div>
  );
}
