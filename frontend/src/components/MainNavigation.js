import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import NewsletterSignup from "./news-letter-signup";

function MainNavigation() {
  const activeLinkClasses = ({ isActive }) =>
    isActive ? classes.active : undefined;
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/" className={activeLinkClasses} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/events" className={activeLinkClasses}>
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/newsletter" className={activeLinkClasses}>
              Newsletter
            </NavLink>
          </li>
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
