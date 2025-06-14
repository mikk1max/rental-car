import React, { useEffect } from "react";
import CarListItem from "../CarListItem/CarListItem";
import Loader from "../ui/Loader/Loader";

import s from "./CarList.module.css";
import CustomButton from "../ui/CustomButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCarList,
  selectError,
  selectIsLoading,
  selectTotalPages,
} from "../../redux/cars/selectors";
import { fetchCars } from "../../redux/cars/operations";
import { setPage } from "../../redux/filters/slice";
import { selectPage } from "../../redux/filters/selectors";

export default function CarList() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCarList);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchCars({ page }));
  }, [dispatch, page]);

  if (isLoading) return <Loader />;
  if (error) return <p className={s.error}>Error: {error}</p>;

  const handleChange = () => {
    dispatch(setPage(page + 1));
  };

  return (
    <>
      <div className={s.carListContainer}>
        {cars.map((item, index) => (
          <CarListItem key={`car-${index}-` + item.id} item={item} />
        ))}
      </div>
      {page < totalPages && (
        <CustomButton
          text="Load more"
          preset={2}
          className={s.loadMoreBtn}
          onClick={handleChange}
        />
      )}
    </>
  );
}
