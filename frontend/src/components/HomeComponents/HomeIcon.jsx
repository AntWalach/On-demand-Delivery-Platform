import React from 'react';
import customHome from "../../assets/css/Home.module.css";

const HomeIcon = ({ icon: iconComponent, description }) => {
    return (
      <div
        className={`${customHome.customColWidth} col-2 d-flex justify-content-center mb-3`}
      >
        <div className='row'>
          <div className='col-md-12 d-flex justify-content-center'>
            {iconComponent}
          </div>
          <div className='col-md-12 d-flex justify-content-center'>
            <div className={`${customHome.customDescriptionHome}`}>{description}</div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HomeIcon;