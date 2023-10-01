import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import "./styleSidebar.css";
import { IconContext } from "react-icons";
import { SidebarItemsAdmin } from "./SidebarItems";

function Slider() {
  const ref = useRef();
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (sidebar && ref.current && !ref.current.contains(e.target)) {
        setSidebar(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [sidebar]);

  return (
    <>
      <IconContext.Provider value={{ color: "white" }}>
        <div className="slider" ref={ref}>
          <Link to="#" className="menu-bars">
            {sidebar ? (
              <AiIcons.AiOutlineClose
                onClick={() => setSidebar(oldState => !oldState)}
              />
            ) : (
              <FaIcons.FaBars
                onClick={() => setSidebar(oldState => !oldState)}
              />
            )}
          </Link>

          <nav className={sidebar ? "nav-menu-active" : "nav-menu"}>
            <ul
              className="nev-menu-items"
              onClick={() => setSidebar(oldState => !oldState)}
            >
              {SidebarItemsAdmin.map((item, key) => {
                return (
                  <> 
                  <li key={key} className={item.className}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                  </>
                );
              })}
            </ul>
          </nav>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Slider;
