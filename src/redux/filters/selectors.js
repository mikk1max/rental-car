export const selectBrands = (state) => state.filters.brands;
export const selectIsLoading = (state) => state.filters.isLoading;
export const selectError = (state) => state.filters.error;

export const selectSelectedBrand = (state) => state.filters.selectedBrand;
export const selectSelectedPrice = (state) => state.filters.selectedPrice;
export const selectMileageFrom = (state) => state.filters.mileageFrom;
export const selectMileageTo = (state) => state.filters.mileageTo;
export const selectPage = (state) => state.filters.page;
