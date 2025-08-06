// App.jsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./styles.css";

function CategoryPage() {
  const navigate = useNavigate();

  const categories = [
    "Cars",
    "Properties",
    "Mobiles",
    "Jobs",
    "Bikes",
    "Electronics & Appliances",
    "Commercial Vehicles & Spares",
    "Furniture",
    "Fashion",
    "Books, Sports & Hobbies",
    "Pets",
  ];

  return (
    <div className="container">
      <h1 className="title">POST YOUR AD</h1>
      <div className="card">
        <h2 className="subtitle">CHOOSE A CATEGORY</h2>
        {categories.map((cat, index) => (
          <div
            key={index}
            className="category-item"
            onClick={() => navigate("/post/attributes")}
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
}

function PropertyDetailsPage() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls].slice(0, 20));
  };

  const handleSubmit = () => {
    localStorage.setItem("listingImages", JSON.stringify(images));
    navigate("/post/submit");
  };

  return (
    <div className="container">
      <h1 className="title">POST YOUR AD</h1>
      <div className="card">
        <button onClick={() => navigate("/")} className="back-btn">
          ← Back
        </button>
        <h2 className="subtitle">INCLUDE SOME DETAILS</h2>
        <div className="section">
          <p>Type *</p>
          <div className="btn-group">
            {[
              "Flats / Apartments",
              "Independent / Builder Floors",
              "Farm House",
              "House & Villa",
            ].map((type, i) => (
              <button key={i}>{type}</button>
            ))}
          </div>
        </div>
        <div className="section">
          <p>BHK</p>
          <div className="btn-group">
            {["1", "2", "3", "4", "4+"].map((val, i) => (
              <button key={i}>{val}</button>
            ))}
          </div>
        </div>
        <div className="section">
          <p>Bathrooms</p>
          <div className="btn-group">
            {["1", "2", "3", "4", "4+"].map((val, i) => (
              <button key={i}>{val}</button>
            ))}
          </div>
        </div>
        <div className="section">
          <p>Furnishing</p>
          <div className="btn-group">
            {["Furnished", "Semi-Furnished", "Unfurnished"].map((furn, i) => (
              <button key={i}>{furn}</button>
            ))}
          </div>
        </div>
        <div className="section">
          <p>UPLOAD UP TO 20 PHOTOS</p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <div className="grid">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`upload-${i}`}
                className="photo-box"
              />
            ))}
            {[...Array(20 - images.length)].map((_, i) => (
              <div key={i} className="photo-box">
                Add Photo
              </div>
            ))}
          </div>
        </div>
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

function CardDisplayPage() {
  const navigate = useNavigate();
  const storedImages = JSON.parse(localStorage.getItem("listingImages")) || [];

  const cards = storedImages.map((img, i) => ({
    title: `Property ${i + 1}`,
    price: `₹${30 + i * 10} Lac`,
    image: img,
  }));

  return (
    <div className="container">
      <h1 className="title">Your Listings</h1>
      <div className="card">
        <button
          onClick={() => navigate("/post/attributes")}
          className="back-btn"
        >
          ← Back
        </button>
        <div className="card-grid">
          {cards.map((card, index) => (
            <div className="listing-card" key={index}>
              <img src={card.image} alt="property" />
              <h3>{card.title}</h3>
              <p>{card.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CategoryPage />} />
        <Route path="/post/attributes" element={<PropertyDetailsPage />} />
        <Route path="/post/submit" element={<CardDisplayPage />} />
      </Routes>
    </Router>
  );
}
