import React from "react";

const CustomProgressBar = ({ percentage }) => {
  const totalBarWidth = 400;
  const progressBarWidth = totalBarWidth * (percentage / 100);
  return (
    <>
      <div>Custom progress bar</div>
      <div
        id="progressBar"
        style={{
          border: "1px solid white",
          width: `${totalBarWidth}px`,
          height: "15px",
          borderRadius: "10px",
          margin: "10px",
        }}
      >
        <div
          style={{
            background: "orange",
            width: `${progressBarWidth}px`,
            height: "inherit",
            borderRadius: "inherit",
          }}
        ></div>
      </div>
    </>
  );
};

export default CustomProgressBar;
