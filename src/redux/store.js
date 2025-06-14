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

// ✅ Correct per-slice persist configs
const carsPersistConfig = {
  key: "cars",
  storage,
  whitelist: ["items"],
};

const filtersPersistConfig = {
  key: "filters",
  storage,
};

const favoritesPersistConfig = {
  key: "favorites",
  storage,
  whitelist: ["list"], // ensure your slice uses `list` as the favorites array
};

// ✅ Wrap each reducer with its own persist config
const persistedCarReducer = persistReducer(carsPersistConfig, carReducer);
const persistedFiltersReducer = persistReducer(
  filtersPersistConfig,
  filtersReducer
);
const persistedFavoritesReducer = persistReducer(
  favoritesPersistConfig,
  favoritesReducer
);

// ✅ Store configuration
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

// ✅ Export the persistor
export const persistor = persistStore(store);
