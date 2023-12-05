import React from "react";
import "../App.css";
  
const Menu = ({ setLineColor, setLineWidth, 
setLineOpacity, brushSize, brushOpacity }) => {
  return (
    <div className="Menu">
      <label>Brush Color </label>
      <input
        type="color"
        onChange={(e) => {
          setLineColor(e.target.value);
        }}
      />
      <label>Brush Width </label>
      <input
        type="range"
        min="3"
        max="20"
        value={brushSize}
        onChange={(e) => {
          setLineWidth(e.target.value);
        }}
      />
      <label>Brush Opacity</label>
      <input
        type="range"
        min="1"
        max="100"
        value={brushOpacity * 100}
        onChange={(e) => {
          setLineOpacity(e.target.value / 100);
        }}
      />
    </div>
  );
};
  
export default Menu;