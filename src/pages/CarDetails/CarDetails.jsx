import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCarDetails, fetchCarDetails } from "../../redux/details/slice";
import Loader from "../../components/ui/Loader/Loader";

export default function CarDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { car, loading, error } = useSelector((state) => state.carDetails);

  useEffect(() => {
    dispatch(fetchCarDetails(id));

    return () => {
      dispatch(clearCarDetails());
    };
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!car) return null;

  return (
    <div>
      <h2>
        {car.brand} {car.model} ({car.year})
      </h2>
      <img src={car.img} alt={car.model} width={300} />
      <p>
        <strong>Description:</strong> {car.description}
      </p>
      <p>
        <strong>Type:</strong> {car.type}
      </p>
      <p>
        <strong>Fuel Consumption:</strong> {car.fuelConsumption}L
      </p>
      <p>
        <strong>Engine:</strong> {car.engineSize}
      </p>
      <p>
        <strong>Rental Price:</strong> ${car.rentalPrice}/day
      </p>
      <p>
        <strong>Rental Company:</strong> {car.rentalCompany}
      </p>
      <p>
        <strong>Address:</strong> {car.address}
      </p>
      <p>
        <strong>Mileage:</strong> {car.mileage} km
      </p>

      <h3>Accessories</h3>
      <ul>
        {car.accessories.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3>Functionalities</h3>
      <ul>
        {car.functionalities.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3>Rental Conditions</h3>
      <ul>
        {car.rentalConditions.map((cond, i) => (
          <li key={i}>{cond}</li>
        ))}
      </ul>
    </div>
  );
}
