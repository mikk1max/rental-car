import React from "react";
import CarListItem from "../CarListItem/CarListItem";
import CustomButton from "../ui/CustomButton/CustomButton";
import s from "./CarList.module.css";

export default function CarList({ cars, hasMore, onLoadMore }) {
  return (
    <>
      <div className={s.carListContainer}>
        {cars.map((item, index) => (
          <CarListItem key={`car-${index}-` + item.id} item={item} />
        ))}
      </div>
      {hasMore && (
        <CustomButton
          text="Load more"
          preset={2}
          className={s.loadMoreBtn}
          onClick={onLoadMore}
        />
      )}
    </>
  );
}
