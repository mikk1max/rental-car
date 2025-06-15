import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./cars/slice";
import filtersReducer from "./filters/slice";
import favoritesReducer from "./favorites/slice";
import carDetailsReducer from "./details/slice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const carsPersistConfig = {
  key: "cars",
  storage,
  whitelist: ["list", "total", "totalPages"],
};

const filtersPersistConfig = {
  key: "filters",
  storage,
};

const favoritesPersistConfig = {
  key: "favorites",
  storage,
};

const persistedCarReducer = persistReducer(carsPersistConfig, carReducer);
const persistedFiltersReducer = persistReducer(
  filtersPersistConfig,
  filtersReducer
);
const persistedFavoritesReducer = persistReducer(
  favoritesPersistConfig,
  favoritesReducer
);

export const store = configureStore({
  reducer: {
    cars: persistedCarReducer,
    filters: persistedFiltersReducer,
    favorites: persistedFavoritesReducer,
    carDetails: carDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
