import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Header from "./components/Header/Header.jsx";
import Loader from "./components/ui/Loader/Loader.jsx";

const Main = lazy(() => import("./pages/Main/Main.jsx"));
const Catalog = lazy(() => import("./pages/Catalog/Catalog.jsx"));
const CarDetails = lazy(() => import("./pages/CarDetails/CarDetails.jsx"));

export default function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<CarDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </>
  );
}
