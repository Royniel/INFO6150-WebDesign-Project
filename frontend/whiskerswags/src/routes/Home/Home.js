import React from "react";
import "./Home.css";
import HeroImage from "../../components/HeroImage/HeroImage";
import backgroundImage from "../../assets/images/background.jpg";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import NavBar from "../../components/Navbar/Navbar";

// Home component to display the home page
const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <NavBar />
      <HeroImage />
      <ImageGallery />
    </div>
  );
};

export default Home;
