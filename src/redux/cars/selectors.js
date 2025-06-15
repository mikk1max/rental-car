export const selectIsLoading = (state) => state.cars.isLoading;
export const selectError = (state) => state.cars.error;

export const selectCarList = (state) => state.cars.list;
export const selectCarPage = (state) => state.cars.page;
export const selectTotalCars = (state) => state.cars.total;
export const selectTotalPages = (state) => state.cars.totalPages;
export const selectPage = (state) => state.cars.page;
export const selectLimit = (state) => state.cars.limit;
