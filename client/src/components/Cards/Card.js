import React from "react";

const Card = ({ img, name, href, color }) => {
  const NAME = name.charAt(0).toUpperCase() + name.substring(1, name.length);

  const handleFacebookClick = async () => {
    // const response = await fetch("/auth/facebook/", {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    // });
    window.location.href = "/api/auth/facebook";
  };

  return (
    <div
      className="card"
      style={{ border: `1px solid ${color}`, borderRadius: 2 }}
      onClick={handleFacebookClick}
    >
      <div>
        <p
          style={{ margin: 0, textAlign: "left", padding: "5px 0px 5px 10px" }}
        >
          {NAME}
        </p>
      </div>
      <div
        style={{
          minHeight: 100,
          minWidth: 100,
          background: `url("${img}") no repeat center center / 50% ${color}`,
        }}
      ></div>
    </div>
  );
};

export default Card;
