import { useNavigate } from "react-router-dom";
import CustomButton from "../ui/CustomButton/CustomButton";
import s from "./Hero.module.css";
import { scrollToTop } from "../../utils/scrollToTop";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section>
      <div className={s.heroContainer}>
        <div className={s.textBox}>
          <h1>Find your perfect rental car</h1>
          <p>Reliable and budget-friendly rentals for any journey</p>
          <CustomButton
            text="View Catalog"
            preset={1}
            className={s.button}
            onClick={() => {
              scrollToTop();
              navigate("/catalog");
            }}
          />
        </div>
      </div>
    </section>
  );
}
