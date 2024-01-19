import React from "react";


export const Card = ({ template, onClick, key}) => {
  return (
    <div className="card" onClick={onClick}  key={key} >
      <div className="text">
        <h1>{template}</h1>
        <div className="edit">
        
        </div>
      </div>
    </div>
  );
};
