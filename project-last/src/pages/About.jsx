import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <>
      {/* HERO */}
      <div
        style={{
          padding: "110px 0",
          background: "linear-gradient(135deg, #000000, #2F2F2F)",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontWeight: "700", fontSize: "50px" }}>About Flone</h1>
        <p style={{ opacity: "0.9", marginTop: "12px", fontSize: "18px" }}>
          Premium products. Minimal mindset.
        </p>
      </div>

      {/* CONTENT */}
      <Container style={{ paddingTop: "70px", paddingBottom: "80px" }}>
        <Row className="justify-content-center">
          <Col md={9}>

            <p style={{ fontSize: "18px", lineHeight: "1.8" }}>
              Flone started with a simple idea: the world already has too many products… 
              but very few products that actually make life better. We wanted to change that.
            </p>

            <h3 className="mt-5 mb-3" style={{ color: "#111" }}>Our Story</h3>
            <p style={{ fontSize: "18px", lineHeight: "1.8" }}>
              We began as a tiny project searching for products we personally loved using daily. 
              Slowly, we started curating products for people around us. We saw one pattern:
              <br/><br/>
              <strong>People don’t want more products, they want better products.</strong>
            </p>

            <p style={{ fontSize: "18px", lineHeight: "1.8" }}>
              So we built Flone around values like quality over quantity, transparency over hype 
              and experience over overload. Every item we add into Flone is selected with 
              purpose, design, durability and user experience in mind.
            </p>

            <h3 className="mt-5 mb-3" style={{ color: "#111" }}>What Makes Us Different</h3>
            <ul style={{ fontSize: "18px", lineHeight: "1.8" }}>
              <li>We don’t overwhelm with thousands of random options.</li>
              <li>We keep the interface clean & distraction free.</li>
              <li>We focus on modern, premium and minimal products.</li>
              <li>Checkout is fast, smooth and simple.</li>
              <li>Support is responsive and human.</li>
            </ul>

            <h3 className="mt-5 mb-3" style={{ color: "#111" }}>Our Vision</h3>
            <p style={{ fontSize: "18px", lineHeight: "1.8" }}>
              To become a global lifestyle brand known for smart, modern and trusted products.
            </p>

            <h3 className="mt-5 mb-3" style={{ color: "#111" }}>Our Mission</h3>
            <p style={{ fontSize: "18px", lineHeight: "1.8" }}>
              To build a store where every product adds real value — not just fills space 
              in a shelf.
            </p>

            <h3 className="mt-5 mb-3" style={{ color: "#111" }}>Our Future Plans</h3>
            <ul style={{ fontSize: "18px", lineHeight: "1.8" }}>
              <li>More curated categories</li>
              <li>Limited edition Flone originals</li>
              <li>Verified brand partnerships</li>
              <li>Faster Pan-India delivery</li>
              <li>Luxury unboxing experience</li>
            </ul>

            <p className="mt-5" style={{ fontSize: "18px", lineHeight: "1.8" }}>
              We are just at the beginning. Flone is evolving — and you are part of this journey.
              <br/><br/>
              <strong>Thank you for being part of the Flone community.</strong>
            </p>

          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
