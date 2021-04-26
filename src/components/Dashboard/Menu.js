import React, { useEffect } from "react";
import styles from "../../css/Dashboard/Dashboard.module.css";
import { Link } from "react-router-dom";
import { FiGrid, FiBriefcase, FiFileText } from "react-icons/fi";
const Menu = ({ selected }) => {
  useEffect(() => {
    document.getElementById(selected).className = styles.selected;
  });

  return (
    <div className={styles.menu}>
      <p>Booking.app</p>
      <div id="dashboard">
        <Link to="/">
          <button>
            <FiGrid></FiGrid> Dashboard
          </button>
        </Link>
      </div>
      <div id="service">
        <Link to="/service">
          <button>
            <FiBriefcase></FiBriefcase> Service
          </button>
        </Link>
      </div>
      <div id="booking">
        <Link to="/booking">
          <button>
            <FiFileText></FiFileText> Booking
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
