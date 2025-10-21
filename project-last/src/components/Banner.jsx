import React from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function WelcomeBannerCarousel() {
  const slides = [
    {
      id: 1,
      subtitle: "Welcome to Flone",
      title: "Discover Your",
      title2: "Style",
      buttonText: "SHOP NOW",
      bgColor: "#E9D5FF",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop" // Fashion/Lifestyle
    },
    {
      id: 2,
      subtitle: "Fresh & Organic",
      title: "Grocery",
      title2: "Essentials",
      buttonText: "EXPLORE NOW",
      bgColor: "#FBCFE8",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=800&fit=crop" // Grocery
    },
    {
      id: 3,
      subtitle: "Home & Living",
      title: "Lifestyle",
      title2: "Collection",
      buttonText: "SHOP SALE",
      bgColor: "#BFDBFE",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=800&fit=crop" // Lifestyle/Home
    }
  ];

  return (
    <>
      <Carousel 
        prevIcon={<BsChevronLeft size={40} color="#000" />}
        nextIcon={<BsChevronRight size={40} color="#000" />}
        interval={5000}
        className="welcome-carousel"
      >
        {slides.map((slide) => (
          <Carousel.Item key={slide.id} style={{ backgroundColor: slide.bgColor }}>
            <div className="carousel-slide-content" style={{ minHeight: '80vh' }}>
              <Container className="h-100">
                <Row className="h-100 align-items-center">
                  {/* Left Content */}
                  <Col lg={6} className="text-start py-5">
                    <p className="subtitle mb-3">{slide.subtitle}</p>
                    <h1 className="display-1 fw-bold mb-0 text-dark">{slide.title}</h1>
                    <h1 className="display-1 fw-bold mb-4 text-dark">{slide.title2}</h1>
                    <Button 
                      variant="outline-dark" 
                      size="lg" 
                      className="mt-4 px-5 py-3 fw-semibold shop-btn"
                    >
                      {slide.buttonText}
                    </Button>
                  </Col>

                  {/* Right Image */}
                  <Col lg={6} className="d-none d-lg-flex align-items-end justify-content-center position-relative">
                    <div className="image-placeholder">
                      <img 
                        src={slide.image} 
                        alt={slide.title}
                        className="carousel-image"
                      />
                      <div className="bag bag-1"></div>
                      <div className="bag bag-2"></div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Custom CSS */}
      <style jsx>{`
        .welcome-carousel {
          position: relative;
        }

        .carousel-slide-content {
          display: flex;
          align-items: center;
        }

        .subtitle {
          font-size: 1.1rem;
          font-weight: 500;
          color: #4b5563;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .shop-btn {
          border-width: 2px !important;
          letter-spacing: 0.1em;
          transition: all 0.3s ease;
        }

        .shop-btn:hover {
          background-color: #000 !important;
          color: #fff !important;
          border-color: #000 !important;
        }

        .image-placeholder {
          position: relative;
          width: 100%;
          height: 400px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .person-placeholder {
          width: 280px;
          height: 350px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        .carousel-image {
          width: 350px;
          height: 450px;
          object-fit: cover;
          border-radius: 10px;
          position: relative;
          z-index: 2;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .bag {
          position: absolute;
          bottom: 0;
          border-radius: 8px 8px 0 0;
          opacity: 0.8;
        }

        .bag-1 {
          width: 100px;
          height: 130px;
          background: #3B82F6;
          right: 80px;
          z-index: 1;
        }

        .bag-2 {
          width: 85px;
          height: 115px;
          background: #67E8F9;
          right: 130px;
          z-index: 0;
        }

        .carousel-control-prev,
        .carousel-control-next {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
          opacity: 1;
        }

        .carousel-control-prev:hover,
        .carousel-control-next:hover {
          background: rgba(255, 255, 255, 0.9);
        }

        .carousel-control-prev {
          left: 20px;
        }

        .carousel-control-next {
          right: 20px;
        }

        .carousel-indicators {
          bottom: 30px;
        }

        .carousel-indicators [data-bs-target] {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          border: none;
          margin: 0 6px;
          transition: all 0.3s ease;
        }

        .carousel-indicators .active {
          width: 30px;
          border-radius: 6px;
          background-color: #000;
        }

        @media (max-width: 991px) {
          .display-1 {
            font-size: 3.5rem;
          }
        }

        @media (max-width: 576px) {
          .display-1 {
            font-size: 2.5rem;
          }
          
          .subtitle {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </>
  );
}

// Installation:
// npm install react-bootstrap bootstrap react-icons
// 
// Import in your main file:
// import 'bootstrap/dist/css/bootstrap.min.css';