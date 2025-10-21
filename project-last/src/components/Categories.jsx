import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [sliderRef, setSliderRef] = useState(null);

    const navigate = useNavigate();

 const Handleclick = (categoryName) => {
  navigate(`/category/${categoryName}`); // encode to handle spaces/special chars
};


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const res = await axios.get(`${API_URL}/api/categories`);
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="categories-section py-5 position-relative bg-light">
      <Container className="text-center">
        <h2 className="display-6 fw-bold mb-4 text-dark">Shop by Category</h2>

        {/* Arrows */}
        <button className="arrow left" onClick={() => sliderRef?.slickPrev()}>
          <FaChevronLeft />
        </button>
        <button className="arrow right" onClick={() => sliderRef?.slickNext()}>
          <FaChevronRight />
        </button>

        {/* Carousel */}
        <div className="categories-carousel">
          <Slider ref={setSliderRef} {...settings}>
            {categories.map((category) => (
              <div key={category._id} className="px-3" onClick={() => Handleclick(category.name)}>
                <div className="category-tile">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="category-img"
                  />
                  <div className="overlay">
                    <h5 className="category-title">{category.name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>

      <style jsx>{`
        .categories-section {
          background-color: #fafafa;
        }

        .categories-carousel {
          position: relative;
        }

        .category-tile {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          height: 280px;
        }

        .category-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          border-radius: 16px;
        }

        .category-tile:hover .category-img {
          transform: scale(1.05);
          filter: brightness(0.8);
        }

        .overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          top: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.35);
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: 16px;
        }

        .category-tile:hover .overlay {
          opacity: 1;
        }

        .category-title {
          color: #fff;
          font-size: 1.5rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: #000;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          z-index: 5;
          transition: all 0.3s ease;
        }

        .arrow:hover {
          background: #000;
          color: #fff;
        }

        .arrow.left {
          left: 2%;
        }

        .arrow.right {
          right: 2%;
        }

        @media (max-width: 768px) {
          .category-tile {
            height: 220px;
          }
          .category-title {
            font-size: 1.2rem;
          }
          .arrow {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
