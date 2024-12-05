import React from "react";
import { Link } from "react-router-dom";
import "./Gallery.css";
import dogIcon from "../../assets/icons/dog.svg";
import catIcon from "../../assets/icons/cat.svg";
import rabbitIcon from "../../assets/icons/rabbit.svg";
import birdIcon from "../../assets/icons/bird.svg";

// Image gallery component for the pet matching page
const ImageGallery = () => {
  // Array of pet categories with their respective icons and links
  const images = [
    { name: "Dog", icon: dogIcon, link: "/petmatching/dog" },
    { name: "Cat", icon: catIcon, link: "/petmatching/cat" },
    { name: "Rabbit", icon: rabbitIcon, link: "/petmatching/rabbit" },
    { name: "Bird", icon: birdIcon, link: "/petmatching/bird" },
  ];

  return (
    <div className="singleLineImageContainer">
      {/*Mapping through the images array to create icon element */}
      {images.map((image, index) => (
        <div
          key={index}
          className="image"
          style={{ backgroundImage: `url(${image.icon})` }}
        >
          {/*Link to the respective pet category page */}
          <Link to={image.link} className="image-link">
            {}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
