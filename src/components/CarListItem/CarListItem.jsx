import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import styles from "./CarListItem.module.css";
import icons from "../../assets/icons.svg";
import CustomButton from "../ui/CustomButton/CustomButton";
import { convertStrToArray } from "../../utils/helpers";

export default function CarListItem({ item }) {
  return (
    <Card className={styles.card}>
      <div className={styles.imgContainer}>
        <img
          src={item.img}
          loading="lazy"
          alt={item.description}
          className={styles.image}
        />
      </div>

      <div className={styles.contentWrapper}>
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
            <span>{`${item.mileage} km`}</span>
          </span>
        </Typography>

        <button className={styles.iconButton} aria-label="bookmark">
          <svg className={styles.icon}>
            <use href={`${icons}#icon-heart-stroke`} />
          </svg>
        </button>
      </div>

      <CardContent orientation="horizontal">
        <CustomButton text="Read more" preset={1} className={styles.button} />
      </CardContent>
    </Card>
  );
}
