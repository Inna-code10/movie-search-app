import './Navigation.css';
import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="navigation">
      <NavLink
        to="/"
        end
        className={({ isActive }) => (
          isActive ? 'nav-link active' : 'nav-link'
        )}
      >
        Home
      </NavLink>

      <NavLink
        to="/favorites"
        className={({ isActive }) => (
          isActive ? 'nav-link active' : 'nav-link'
        )}
      >
        Favorites
      </NavLink>
    </nav>
  );
};