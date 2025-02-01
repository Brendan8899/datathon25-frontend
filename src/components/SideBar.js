import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import ArrowIcon from './ArrowIcon'; // Assuming ArrowIcon is in the same folder

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className={`${styles.sidebar} ${!isOpen ? styles.closed : ''}`}>
      <button className={styles['toggle-btn']} onClick={toggleSidebar}>
        {isOpen ? <ArrowIcon direction="left" /> : <ArrowIcon direction="right" />}
      </button>
      {isOpen && (
        <nav>
          <ul>
            <li>
              <NavLink to="/BulkUpload" className={({ isActive }) => (isActive ? styles.active : '')}>
                Bulk Upload
              </NavLink>
            </li>
            <li>
              <NavLink to="/Upload-History" className={({ isActive }) => (isActive ? styles.active : '')}>
                Upload History
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Sidebar;
