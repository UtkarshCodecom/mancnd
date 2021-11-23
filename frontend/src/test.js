import React from "react";
import {useState, useEffect} from "react";
import Downbar from "./component/layout/Downbar/Downbar";
import Header from "./component/layout/Header/Header.js";

const Test = () => {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1450);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <div>
      <Header />
    </div>
  );
}

export default Test;