import CarList from "../../components/CarList/CarList";
import Filters from "../../components/Filters/Filters";
import s from "./Catalog.module.css";

export default function Catalog() {
  return (
    <main>
      <Filters className={s.filters} />
      <CarList />
    </main>
  );
}
