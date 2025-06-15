import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCarDetails, fetchCarDetails } from "../../redux/details/slice";
import Loader from "../../components/ui/Loader/Loader";
import styles from "./CarDetails.module.css";
import icons from "../../assets/icons.svg";
import { convertBigNumberToStr, convertStrToArray } from "../../utils/helpers";
import BookingForm from "../../components/BookingForm/BookingForm";
import SnackbarAlerts from "../../components/ui/SnackBarAlerts/SnackBarAlerts";

export default function CarDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { car, loading, error } = useSelector((state) => state.carDetails);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    dispatch(fetchCarDetails(id));
    return () => dispatch(clearCarDetails());
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <p className={styles.error}>Error: {error}</p>;
  if (!car) return null;

  const specs = [
    { name: "Year", value: car.year, icon: "icon-calendar" },
    { name: "Type", value: car.type, icon: "icon-car" },
    {
      name: "Fuel Consumption",
      value: car.fuelConsumption,
      icon: "icon-fuel-pump",
    },
    { name: "Engine Size", value: car.engineSize, icon: "icon-settings" },
  ];

  const handleBookingSubmit = (values) => {
    setErrorSnackbar(false);
    setErrorMessage("Booking successful! We will contact you soon.");
    setOpenSnackbar(true);
    // console.log("Booking data:", values);
  };

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.imgFormSection}>
        <div className={styles.imageSection}>
          <img src={car.img} alt={car.model} className={styles.carImage} />
        </div>

        <BookingForm
          onSubmit={handleBookingSubmit}
          setErrorMessage={setErrorMessage}
          setOpenSnackbar={setOpenSnackbar}
          setErrorSnackbar={setErrorSnackbar}
        />
      </div>

      <div className={styles.detailsSection}>
        <h2 className={styles.title}>
          {car.brand} {car.model}, {car.year}{" "}
          <span className={styles.tId}>{`Id: ${car.id}`}</span>
        </h2>
        <p className={styles.underTitle}>
          <span>
            <svg className={styles.icon}>
              <use href={`${icons}#icon-location-pin`} />
            </svg>
            <span>{`${convertStrToArray(car.address)[1]}, ${
              convertStrToArray(car.address)[2]
            }`}</span>
          </span>
          <span>Mileage: {convertBigNumberToStr(car.mileage)} km</span>
        </p>
        <p className={styles.price}>{`$${car.rentalPrice}`}</p>
        <p className={styles.description}>{car.description}</p>

        <div className={styles.infoBox}>
          <div className={styles.section}>
            <h3>Rental Conditions:</h3>
            <ul className={styles.list}>
              {car.rentalConditions.map((cond, i) => (
                <li key={i}>
                  <svg className={styles.icon}>
                    <use href={`${icons}#icon-check-circle`} />
                  </svg>
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h3>Car Specifications:</h3>
            <ul className={styles.list}>
              {specs.map((spec, i) => (
                <li key={i}>
                  <svg className={styles.icon} aria-hidden="true">
                    <use href={`${icons}#${spec.icon}`} />
                  </svg>
                  <span>
                    {spec.name}: {spec.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h3>Accessories and functionalities:</h3>
            <ul className={styles.list}>
              {[...car.accessories, ...car.functionalities].map((item, i) => (
                <li key={i}>
                  <svg className={styles.icon}>
                    <use href={`${icons}#icon-check-circle`} />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <SnackbarAlerts
        open={openSnackbar}
        severity={errorSnackbar ? "error" : "success"}
        message={errorMessage}
        onClose={() => {
          setOpenSnackbar(false);
          setErrorSnackbar(false);
          setErrorMessage("");
        }}
      />
    </div>
  );
}
