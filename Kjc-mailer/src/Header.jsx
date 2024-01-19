import React from "react";
import "./App.css";
export const Header = () => {
  return (
    <>
      <header>
        <div className="dashboard">
          <h1>Dashboard</h1>
        </div>
        <div className="header-right">
          <div className="search1">
            <input
              className="search"
              type="search"
              name=""
              id=""
              placeholder="search"
            />
          </div>
          <div className="user"></div>
        </div>
      </header>
    </>
  );
};
