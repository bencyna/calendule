import React from "react";
import Card from "./Card";
import { data } from "../../data";
import "./style.css";

const CardList = () => {
  return data.map((app) => {
    return <Card {...app} key={app.name} />;
  });
};

export default CardList;
