import React from "react";
import $ from "jquery";
function Landingpage() {
  const Height = $(window).height();
  return (
    <div
      style={{
        backgroundImage: `url("./bg.jpg")`,
        height: Height,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <img
          alt=""
          src={"./axe.svg"}
          style={{
            width: 135,
          }}
        />
      </div>
    </div>
  );
}

export default Landingpage;
