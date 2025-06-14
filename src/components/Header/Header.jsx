import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { scrollToTop } from "../../utils/scrollToTop";
import s from "./Header.module.css";
import { navigationArray } from "../../constants/navigation";
import clsx from "clsx";

export default function Header() {
  return (
    <header>
      <nav className={s.navigationContainer}>
        <div className={s.logoWrapper}>
          <NavLink to="/" onClick={scrollToTop}>
            <img src={logo} />
          </NavLink>
        </div>
        <ul className={s.navList}>
          {navigationArray.map(({ label, path }, index) => (
            <li key={index} className={s.navListItem}>
              <NavLink
                to={path}
                onClick={scrollToTop}
                className={({ isActive }) =>
                  clsx(s.link, isActive && s.activeLink)
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
