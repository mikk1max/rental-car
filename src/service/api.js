import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

const options = {
  headers: {
    accept: "application/json",
  },
};

export const getAllBrands = async () => {
  const { data } = await axios.get("/brands");
  return data;
};

export async function getAllCars({
  brand,
  price,
  mileageFrom,
  mileageTo,
  page,
}) {
  const params = new URLSearchParams();

  if (brand) params.append("brand", brand);
  if (price) params.append("rentalPrice", price);
  if (mileageFrom) params.append("minMileage", mileageFrom);
  if (mileageTo) params.append("maxMileage", mileageTo);
  if (page) params.append("page", page);

  const { data } = await axios.get(`/cars?${params.toString()}`, options);
  return data;
}

export const getCarById = async (id) => {
  const { data } = await axios.get(`/cars/${id}`);
  return data;
};
