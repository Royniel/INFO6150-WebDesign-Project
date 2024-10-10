# INFO6150-WebDesign-Project

## Whiskers & Wags 
- Website designed for Pet Adoption

Welcome to **Whiskers&Wags**, a heartwarming pet adoption platform dedicated to connecting loving homes with furry friends in need. Our mission is to facilitate pet adoption and promote responsible pet ownership, ensuring that every animal finds a safe and loving environment.
 
![Whiskers&Wags Logo](images/logo.jpg)
 
## Table of Contents
 
- [INFO6150-WebDesign-Project](#info6150-webdesign-project)
  - [Whiskers \& Wags](#whiskers--wags)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
    - [Why Pet Adoption?](#why-pet-adoption)
  - [Features](#features)
  - [Project Structure](#project-structure)
  - [Bootstrap Components](#bootstrap-components)
    - [forgetpassword.html](#forgetpasswordhtml)
    - [signup.html](#signuphtml)
    - [login.html](#loginhtml)
    - [home.html](#homehtml)
  - [Custom Styling](#custom-styling)
  - [JavaScript Integration](#javascript-integration)
  - [Dependencies](#dependencies)
 
## Project Overview
 
Whiskers&Wags is designed to make the pet adoption process easy and accessible. Users can browse through various pets available for adoption, learn about their personalities, and find their perfect match. We believe that every pet deserves a second chance, and our platform aims to facilitate this process through user-friendly navigation and engaging content.
 
### Why Pet Adoption?
 
Adopting a pet brings joy, companionship, and unconditional love into your life. By choosing to adopt, you are not only saving a life but also making space for another animal in need. Our website provides resources and information about responsible pet ownership, helping adopters make informed decisions.
 
## Features
 
- **User-Friendly Interface**: Easy navigation with clear links to login, signup, and password recovery pages.
- **Responsive Design**: Optimized for mobile and desktop devices using Bootstrap.
- **Pet Profiles**: Detailed information about each pet available for adoption, including images and descriptions.
- **User Authentication**: Secure login and signup process to manage user accounts.
- **Password Recovery**: Simple process for users to recover their passwords if forgotten.
- **Engaging Visuals**: High-quality images of pets to attract potential adopters.
 
## Project Structure
 
The project is organized as follows:
whiskers-wags/
│
├── home.html # Main landing page
├── login.html # User login page
├── signup.html # New user registration page
├── forgetpassword.html # Password recovery page
├── style.css # Custom styles
├── script.js # JavaScript functionality
└── images/ # Directory containing website images
 
 
 
## Custom Styling
 
In addition to Bootstrap’s default styles, we have implemented custom CSS to enhance the visual appeal of the website:
 
- A blur effect on the card background using `backdrop-filter` creates a soft focus effect that draws attention to the content.
- A unique color scheme featuring purple accents (#8a2be2) aligns with our branding while providing visual interest.
- Hover effects on buttons and links enhance interactivity and encourage user engagement.
- A full-screen background image featuring pets adds warmth and character to the site.
 
## JavaScript Integration
 
The JavaScript file (`script.js`) enhances user experience by providing:
 
- Form validation functionality to ensure users enter valid data before submission.
- Dynamic interactions such as error messages that guide users in filling out forms correctly.
 
## Dependencies
 
This project relies on several key libraries:
*Bootstrap 4.5.2:* For responsive design components.
*jQuery 3.5.1:* For DOM manipulation and event handling.
*Popper.js 2.5.2:* For managing popovers and tooltips in Bootstrap components.