import React, { useRef } from "react";
import CarListItem from "../CarListItem/CarListItem";
import CustomButton from "../ui/CustomButton/CustomButton";
import s from "./CarList.module.css";
import { useScrollToIndex } from "../../utils/useScrollToIndex";

export default function CarList({ cars, hasMore, onLoadMore, scrollToIndex }) {
  const itemRefs = useRef({});

  useScrollToIndex(scrollToIndex, itemRefs);

  return (
    <>
      <div className={s.carListContainer}>
        {cars.map((item, index) => (
          <CarListItem
            key={`car-${index}-` + item.id}
            item={item}
            ref={(el) => (itemRefs.current[index] = el)}
          />
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
