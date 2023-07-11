import { Link } from "react-router-dom";
import "./navigation.css";

export const Navigation = () => {
  return (
    <div>
      <nav>
        <ul>
          <div>
            <Link to="/">Dashboard</Link>
          </div>
          <div>
            <Link to="/products">Products</Link>
          </div>
          <div>
            <Link to="/register">Register</Link>
          </div>
          <div>
            <Link to="/login">Login</Link>
          </div>
        </ul>
      </nav>
    </div>
  );
};
