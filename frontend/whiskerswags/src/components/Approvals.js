import React, { useState, useEffect } from "react";
import axios from "axios";
import ApprovalItem from "./ApprovalItem";
import "./Approvals.css";

// Approvals component to manage unapproved pet listings
const Approvals = () => {
  const [listings, setListings] = useState([]);

  //hook to fetch unapproved listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get("/api/petlisting/unapproved");
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching listings", error);
      }
    };
    fetchListings();
  }, []);

  //function to handle approval of a listing
  const handleApprove = async (id) => {
    try {
      await axios.put(`/api/petlisting/approve/${id}`);
      setListings(listings.filter((listing) => listing._id !== id));
    } catch (error) {
      console.error("Error approving listing", error);
    }
  };

  //function to handle deletion of a listing
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/petlisting/${id}`);
      setListings(listings.filter((listing) => listing._id !== id));
    } catch (error) {
      console.error("Error deleting listing", error);
    }
  };

  return (
    <div className="approvals-container">
      <h2>Unapproved Pet Listings</h2>
      <div className="approvals-grid">
        {/* Displaying unapproved listings and rendering a card for each*/}
        {listings.map((listing) => (
          <ApprovalItem
            key={listing._id}
            listing={listing}
            onApprove={handleApprove}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Approvals;
