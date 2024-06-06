import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navigation.css";

function ProfileButton({ user, clicked }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  const root = document.getElementById("root");
  root.addEventListener("click", () => {
    setShowMenu(true);
  });

  const iconClick = document.querySelector(".icon-nav-bar");
  if (iconClick) {
    iconClick.addEventListener("click", () => {
      setShowMenu(false);
    });
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {/* <button onClick={toggleMenu}>
        <i className="fas fa-user-circle" />
      </button> */}
      {showMenu === false ? (
        <ul className={ulClassName} ref={ulRef}>
          {/* <li>{user.username}</li> */}
          <li>Hello, {user.firstName}</li>
          <li>{user.email}</li>
          <li>
            <NavLink to={"/spots/current"}>Manage Spots</NavLink>
          </li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      ) : (
        <></>
      )}
    </>
  );
}

export default ProfileButton;
