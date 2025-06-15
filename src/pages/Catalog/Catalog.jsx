import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectCarList,
  selectError as carsError,
  selectIsLoading as carsLoading,
  selectPage,
  selectTotalPages,
  selectLimit,
} from "../../redux/cars/selectors";

import {
  selectBrands,
  selectError as filtersError,
  selectIsLoading as filtersLoading,
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
} from "../../redux/filters/slice";

import { fetchBrands } from "../../redux/filters/operations";
import { fetchCars } from "../../redux/cars/operations";
import { resetCars, setPage } from "../../redux/cars/slice";

import Filters from "../../components/Filters/Filters";
import CarList from "../../components/CarList/CarList";
import Loader from "../../components/ui/Loader/Loader";
import s from "./Catalog.module.css";
import NoData from "../../components/ui/NoData/NoData";

export default function Catalog() {
  const dispatch = useDispatch();

  const cars = useSelector(selectCarList);
  const page = Number(useSelector(selectPage));
  const limit = useSelector(selectLimit);
  const selectedBrand = useSelector(selectSelectedBrand);
  const selectedPrice = useSelector(selectSelectedPrice);
  const mileageFrom = useSelector(selectMileageFrom);
  const mileageTo = useSelector(selectMileageTo);

  const totalPages = useSelector(selectTotalPages);
  const isCarsLoading = useSelector(carsLoading);
  const carsErr = useSelector(carsError);

  const brands = useSelector(selectBrands);
  const isFiltersLoading = useSelector(filtersLoading);
  const filtersErr = useSelector(filtersError);

  const prices = ["Any", ...Array.from({ length: 11 }, (_, i) => (i + 2) * 10)];

  const didInitialFetch = useRef(false);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    if (!didInitialFetch.current) {
      dispatch(
        fetchCars({
          brand: selectedBrand !== "Any" ? selectedBrand : null,
          price: selectedPrice !== "Any" ? Number(selectedPrice) : null,
          mileageFrom: mileageFrom || null,
          mileageTo: mileageTo || null,
          page,
          limit,
          replace: true,
        })
      );
      didInitialFetch.current = true;
    }
  }, [dispatch]);

  const handleBrandChange = (e, value) => {
    dispatch(setSelectedBrand(value));
  };

  const handlePriceChange = (e, value) => {
    dispatch(setSelectedPrice(value));
  };

  const handleMileageFromChange = (e) => {
    dispatch(setMileageFrom(e.target.value));
  };

  const handleMileageToChange = (e) => {
    dispatch(setMileageTo(e.target.value));
  };

  const handleSearch = () => {
    dispatch(setPage(1));
    dispatch(resetCars());
    dispatch(
      fetchCars({
        brand: selectedBrand !== "Any" ? selectedBrand : null,
        price: selectedPrice !== "Any" ? Number(selectedPrice) : null,
        mileageFrom: mileageFrom || null,
        mileageTo: mileageTo || null,
        page: 1,
        limit,
        replace: true,
      })
    );
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    dispatch(setPage(nextPage));
    dispatch(
      fetchCars({
        brand: selectedBrand !== "Any" ? selectedBrand : null,
        price: selectedPrice !== "Any" ? Number(selectedPrice) : null,
        mileageFrom: mileageFrom || null,
        mileageTo: mileageTo || null,
        page: nextPage,
        limit,
        replace: false,
      })
    );
  };

  return (
    <main className={s.catalog}>
      <Filters
        className={s.filters}
        brands={brands}
        prices={prices}
        selectedBrand={selectedBrand}
        selectedPrice={selectedPrice}
        mileageFrom={mileageFrom}
        mileageTo={mileageTo}
        onBrandChange={handleBrandChange}
        onPriceChange={handlePriceChange}
        onMileageFromChange={handleMileageFromChange}
        onMileageToChange={handleMileageToChange}
        onSearch={handleSearch}
        isLoading={isFiltersLoading}
        error={filtersErr}
      />

      {isCarsLoading ? (
        <Loader />
      ) : carsErr ? (
        <p className={s.error}>Error: {carsErr}</p>
      ) : cars.length === 0 ? (
        <NoData message="No cars found matching your filters." />
      ) : (
        <CarList
          cars={cars}
          hasMore={page < totalPages}
          onLoadMore={handleLoadMore}
          scrollToIndex={page > 1 ? (page - 1) * limit : null}
        />
      )}
    </main>
  );
}
