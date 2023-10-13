import "./style.css";
import React, { useState, useEffect } from "react";
import dice from "../../assets/icon-dice.svg";
import dividerWide from "./pattern-divider-desktop.svg";
import dividerMobile from "./pattern-divider-mobile.svg";

const Card = () => {
  const apiUrl = "https://api.adviceslip.com/advice";
  const [advice, setAdvice] = useState("Loading..."); // State for advice text
  const [id, setId] = useState(null); // State for advice ID
  const [loading, setLoading] = useState(true); // State to track loading status
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // State to track screen width

  // Function to fetch advice from the API
  const fetchAdvice = () => {
    setLoading(true); // Set loading to true while fetching
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setAdvice(`"${data?.slip?.advice ?? "No advice available"}"`);
        setId(`Advice #${data?.slip?.id ?? null}`);
      })
      .catch((error) => {
        console.error("Error fetching advice:", error);
        setAdvice("An error occurred while fetching advice.");
      })
      .finally(() => {
        // Introduce a timeout of 200 miliseconds before setting loading to false
        setTimeout(() => {
          setLoading(false);
        }, 200);
      });
  };

  // Fetch advice when the component mounts
  useEffect(() => {
    fetchAdvice();
  }, []);

  // Function to update screen width when the window is resized
  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  // Add an event listener to track screen width changes
  useEffect(() => {
    window.addEventListener("resize", updateScreenWidth);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  return (
    <>
      <div className="card lg:w-max lg:max-w-4xl h-auto p-12 rounded-xl shadow-lg">
        <p className="advice-id mt-5 mb-5 text-sm tracking-widest uppercase">
          {loading ? "" : id}
        </p>
        <p>{loading ? "Loading..." : advice}</p>
        <div className="mb-8 mt-8 flex place-content-center">
          {screenWidth > 1199 ? (
            <img src={dividerWide} alt="Wide Divider" />
          ) : (
            <img src={dividerMobile} alt="Mobile Divider" />
          )}
        </div>
      </div>
      <button
        onClick={fetchAdvice}
        className="relative  p-5 rounded-full bottom-8 transition-all duration-200"
      >
        <img src={dice} alt="button dice" />
      </button>
    </>
  );
};

export default Card;
