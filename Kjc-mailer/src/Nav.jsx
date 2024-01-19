import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <>
      <div className="nav">
        <div className="logo">
          <h1>MAILER</h1>
          <div className="icon1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="55"
              height="55"
              viewBox="0 0 25 25"
              fill="none"
            >
              <g clip-path="url(#clip0_524_16)">
                <path
                  d="M0 4.68339V9.37506C0 10.2039 0.32924 10.9987 0.915291 11.5848C1.50134 12.1708 2.2962 12.5001 3.125 12.5001H13.5417C14.3705 12.5001 15.1653 12.1708 15.7514 11.5848C16.3374 10.9987 16.6667 10.2039 16.6667 9.37506V4.68339L8.76042 8.24173C8.62613 8.30209 8.48057 8.3333 8.33333 8.3333C8.1861 8.3333 8.04054 8.30209 7.90625 8.24173L0 4.68339ZM0.0770832 2.43339L8.33333 6.15006L16.5896 2.43339C16.4327 1.7423 16.0456 1.12504 15.4918 0.682893C14.938 0.240744 14.2503 -3.46902e-05 13.5417 6.10637e-05H3.125C2.41633 -3.46902e-05 1.72867 0.240744 1.17485 0.682893C0.621028 1.12504 0.233936 1.7423 0.0770832 2.43339Z"
                  fill="#3D63F7"
                />
              </g>
              <defs>
                <clipPath id="clip0_524_16">
                  <rect width="55" height="55" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="list">
          <ul>
            <li>
              <a href="/">Composer</a>
            </li>
            <li>
            <Link to={`/SuccessReports`} title="Reports">Sent</Link>
            </li>            
            <li>
               <Link to={`/templateupload`} title="Upload Template">Upload Template</Link>
            </li>
            <li>
               <Link to={`/ErrorReport`} title="Error Report">Error Report</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
