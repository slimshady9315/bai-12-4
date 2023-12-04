import { Link, NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="header">
      <div>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/collection"}>Collection</NavLink>
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/contact"}>Contact</NavLink>
        <NavLink to={"/policy"}>Policy</NavLink>
      </div>

      <div>
        <Link to={"/login"}>Login</Link>
        <Link to={"/signup"}>Signup</Link>
        <Link to={"/shopping-cart"}>Shopping Cart</Link>
      </div>
    </nav>
  );
}