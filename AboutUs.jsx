import React from 'react';

export default function AboutUs() {
  return (
    <section className="about-section" id="about">
      <div className="about-copy">
        <p className="eyebrow">OUR STORY</p>
        <h2>A little more green, every day.</h2>
        <p>
          Paradise Nursery helps make it easy to bring the calming beauty of nature
          into your home. We bring together a thoughtful selection of indoor plants
          for new plant parents and experienced growers alike.
        </p>
        <p>
          Our mission is to make plant care approachable with welcoming guidance,
          quality choices, and greenery for every kind of space.
        </p>
      </div>
      <div className="about-highlight">
        <span className="about-leaf" aria-hidden="true">✿</span>
        <h3>Grow your happy place</h3>
        <p>Find a plant that feels right at home with you.</p>
      </div>
    </section>
  );
}
