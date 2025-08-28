import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/icon01.png"; // adjust path as needed

const NavbarContainer = styled.nav`
  background-color:rgba(25, 33, 42, 0.73);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  font-weight: 600;
  text-decoration: none;
  &:hover {
    color: #d1d5db;
  }
`;

const Logo = styled.img`
  height: 40px;
  margin-right: 1rem;
  cursor: pointer;
  transition: filter 0.3s ease;
  
  &:hover {
    filter: brightness(1.9);
  }
`;


const Navbar = () => {
  const navigate = useNavigate();
  const authenticated = true; // replace with logic
  const isAdmin = false;
  const isProvider = true;

  const handleLogout = () => {
    // remove token logic
    navigate("/login");
  };

  return (
    <NavbarContainer>
      <NavLeft>
        <Logo src={logo} alt="Logo" onClick={() => navigate("/")} />
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">SignUp</NavLink>
        <NavLink to="Admins/login">Admin</NavLink>
        
      </NavLeft>
      <NavRight>
        {!authenticated && (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">SignUp</NavLink>
            {/* <NavLink to="Admins/register">Admin SignUp</NavLink> */}
          </>
        )}
        {authenticated && (
          <>
            {isAdmin && <NavLink to="/admin/dashboard">Admin</NavLink>}
            {isProvider && <NavLink to="Login">Provider</NavLink>}
            <button
              onClick={handleLogout}
              style={{
                background: "#ef4444",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </NavRight>
    </NavbarContainer>
  );
};

export default Navbar;
