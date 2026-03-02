import React from "react";
import "./style.css";

export default function Recitor({ recitor, setRecitor }) {
  return (
    <div className="div-container">
      <label htmlFor="recitor" className="section-title">
        Recitor
      </label>
      <select
        name=""
        id="recitor"
        value={recitor}
        onChange={(e) => setRecitor(parseInt(e.target.value))}
        className="options"
      >
        <option value="1" className="">
          Recitor 1
        </option>
        <option value="2">Recitor 2</option>
      </select>
    </div>
  );
}
