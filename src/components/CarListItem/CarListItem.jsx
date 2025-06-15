import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import styles from "./CarListItem.module.css";
import icons from "../../assets/icons.svg";
import CustomButton from "../ui/CustomButton/CustomButton";
import { convertBigNumberToStr, convertStrToArray } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favorites/slice";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop";

export default function CarListItem({ item, ref }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const isFavorite = favorites.includes(item.id);

  const navigate = useNavigate();

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(item.id));
  };

  return (
    <Card
      sx={{
        padding: "268px 0 0 0",
        backgroundColor: "transparent",
        border: "none",
        width: "276px",
        minHeight: "424px",
      }}
    >
      <div className={styles.imgContainer}>
        <img
          src={item.img}
          loading="lazy"
          alt={item.description}
          className={styles.image}
        />
        <div className={styles.backgroundDark} />
      </div>

      <div className={styles.contentWrapper} ref={ref}>
        <div className={styles.header}>
          <Typography level="title-lg" className={styles.title}>
            <span className={styles.tBlack}>{item.brand + " "}</span>
            <span className={styles.tAccent}>{item.model + ","}</span>
            <span className={styles.tBlack}>{" " + item.year}</span>
          </Typography>
          <Typography
            className={styles.price}
          >{`$${item.rentalPrice}`}</Typography>
        </div>
        <Typography level="body-sm" className={styles.additionalInfo}>
          <span className={styles.row}>
            <span>{convertStrToArray(item.address)[1]}</span>
            <span className={styles.separator}>|</span>
            <span>{convertStrToArray(item.address)[2]}</span>
            <span className={styles.separator}>|</span>
            <span>{item.rentalCompany}</span>
          </span>
          <span className={styles.row}>
            <span>{item.type}</span>
            <span className={styles.separator}>|</span>
            <span>{`${convertBigNumberToStr(item.mileage)} km`}</span>
          </span>
        </Typography>

        <button
          className={styles.iconButton}
          aria-label={isFavorite ? "remove from favorites" : "add to favorites"}
          onClick={handleToggleFavorite}
        >
          <svg
            className={clsx(
              styles.icon,
              isFavorite ? styles.iconF : styles.iconN
            )}
          >
            <use
              href={
                isFavorite
                  ? `${icons}#icon-heart-fill`
                  : `${icons}#icon-heart-stroke`
              }
            />
          </svg>
        </button>
      </div>

      <CardContent orientation="horizontal">
        <CustomButton
          text="Read more"
          preset={1}
          className={styles.button}
          onClick={() => {
            scrollToTop();
            navigate(`/catalog/${item.id}`);
          }}
        />
      </CardContent>
    </Card>
  );
}
