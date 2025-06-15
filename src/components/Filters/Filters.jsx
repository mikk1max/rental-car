import React from "react";
import CustomSelect from "../ui/CustomSelect/CustomSelect";
import Loader from "../ui/Loader/Loader";
import s from "./Filters.module.css";
import CustomInput from "../ui/CustomInput/CustomInput";
import CustomButton from "../ui/CustomButton/CustomButton";
import Divider from "@mui/material/Divider";
import clsx from "clsx";

export default function Filters({
  className,
  brands,
  prices,
  selectedBrand,
  selectedPrice,
  mileageFrom,
  mileageTo,
  onBrandChange,
  onPriceChange,
  onMileageFromChange,
  onMileageToChange,
  onSearch,
  isLoading,
  error,
}) {
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
          onChange={onBrandChange}
        />
      </label>

      <label className={s.pricePerHourLabel}>
        <span>Price / 1 hour</span>
        <CustomSelect
          options={prices}
          placeholder="Choose a price"
          value={selectedPrice}
          onChange={onPriceChange}
        />
      </label>

      <label className={s.fromToLabel}>
        <span>Сar mileage / km</span>
        <div className={s.inputsContainer}>
          <CustomInput
            placeholder="From"
            className={s.fromInput}
            value={mileageFrom}
            onChange={onMileageFromChange}
          />
          <Divider orientation="vertical" flexItem />
          <CustomInput
            placeholder="To"
            className={s.toInput}
            value={mileageTo}
            onChange={onMileageToChange}
          />
        </div>
      </label>

      <CustomButton
        text="Search"
        preset={1}
        className={s.searchButton}
        onClick={onSearch}
      />
    </div>
  );
}
