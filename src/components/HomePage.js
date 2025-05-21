import React, { useState, useEffect, useRef } from 'react';
import response from './posts.json';
const HomePage = () => {
  const carouselRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchInstagramPosts = () => {
      try {
        // Make sure we have the data
        if (!response || !response.instagramPosts || !Array.isArray(response.instagramPosts)) {
          console.error("Invalid Instagram posts data structure");
          setIsLoading(false);
          return;
        }
        const urls = response.instagramPosts;
        // Clear any existing content
        if (carouselRef.current) {
          carouselRef.current.innerHTML = '';
          // Create post containers
          urls.forEach(url => {
            const cleanUrl = url.trim();
            const container = document.createElement('div');
            container.className = 'instagram-post';
            container.innerHTML = `
              <blockquote 
                class="instagram-media"
                data-instgrm-permalink="${cleanUrl}"
                data-instgrm-version="14"
                style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%;">
              </blockquote>
            `;
            carouselRef.current.appendChild(container);
          });
          // Load Instagram embed script
          loadInstagramScript();
        }
      } catch (error) {
        console.error("Instagram carousel error:", error);
        setIsLoading(false);
      }
    };
    const loadInstagramScript = () => {
      // Remove any existing script first
      const existingScript = document.getElementById('instagram-embed-script');
      if (existingScript) {
        existingScript.remove();
      }
      const igScript = document.createElement('script');
      igScript.id = 'instagram-embed-script';
      igScript.src = "https://www.instagram.com/embed.js";
      igScript.async = true;
      document.body.appendChild(igScript);
      igScript.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
        setIsLoading(false);
        // Set up auto-scrolling after embeds are loaded
        setupAutoScroll();
      };
    };
    const setupAutoScroll = () => {
      const wrapper = document.querySelector('.carousel-wrapper');
      if (!wrapper) return;
      let autoScrollInterval;
      const startAutoScroll = () => {
        // Clear any existing interval first
        clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => {
          if (!wrapper) return;
          wrapper.scrollBy({
            left: 2,
            behavior: 'smooth'
          });
          // Check if we need to reset scroll position
          if (wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth - 5) {
            wrapper.scrollTo({ left: 0, behavior: 'smooth' });
          }
        }, 20);
      };
      // Start auto-scrolling
      startAutoScroll();
      // Add event listeners for hover effects
      wrapper.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
      wrapper.addEventListener('mouseleave', startAutoScroll);
      // Clean up on unmount
      return () => {
        clearInterval(autoScrollInterval);
        wrapper.removeEventListener('mouseenter', () => clearInterval(autoScrollInterval));
        wrapper.removeEventListener('mouseleave', startAutoScroll);
      };
    };
    // Initial fetch
    fetchInstagramPosts();
    // Cleanup function
    return () => {
      const wrapper = document.querySelector('.carousel-wrapper');
      if (wrapper) {
        wrapper.removeEventListener('mouseenter', () => { });
        wrapper.removeEventListener('mouseleave', () => { });
      }
    };
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white relative overflow-hidden">
      <div className="hero">
        <div className="hero-content">
          <div className="logo">
            <img src="/assets/images/logo.png" alt="Chalo Saheli Logo" />
          </div>
          <h1>Chalo Saheli</h1>
          <p className="tagline">Where her 'maybe someday' becomes 'hell yes, today!'</p>
          <button className="cta-button">Join Our Community</button>
        </div>
      </div>
      <div className="van-graphic">
        <div className="van-container">
          <img src="/assets/images/bus.gif" alt="Travel Van" className="van-img" />
        </div>
      </div>
      <section className="section" id="about">
        <h2>Women's Only Travel Community</h2>
        <p>Empowering | Adventurous | Trustworthy | Inclusive</p>
        <div className="cards-container">
          <div className="card">
            <img src="/assets/images/safety.png" alt="Safety First" className="card-img" />
            <div className="card-content">
              <h3>Safety First</h3>
              <p>Real safety protocols and testimonials from our community members who have traveled to various
                destinations.</p>
            </div>
          </div>
          <div className="card">
            <img src="/assets/images/community.png" alt="Build Community" className="card-img" />
            <div className="card-content">
              <h3>Build Community</h3>
              <p>Connect with like-minded women who share your passion for travel and adventure.</p>
            </div>
          </div>
          <div className="card">
            <img src="/assets/images/travelresources.png" alt="Travel Resources" className="card-img" />
            <div className="card-content">
              <h3>Travel Resources</h3>
              <p>Access to exclusive travel guides, tips, and deals specifically curated for women travelers.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-blue" id="destinations">
        <h2>Popular Destinations</h2>
        <p>Discover new places with confidence and community support</p>
        <div className="cards-container">
          <div className="card">
            <img src="/assets/images/bali.png" alt="Bali" className="card-img" />
            <div className="card-content">
              <h3>Bali</h3>
              <p>Spiritual retreats, beautiful beaches, and vibrant culture.</p>
            </div>
          </div>
          <div className="card">
            <img src="/assets/images/himachal.png" alt="Himachal Pradesh" className="card-img" />
            <div className="card-content">
              <h3>Himachal Pradesh</h3>
              <p>Breathtaking mountains, peaceful retreats, and adventure sports.</p>
            </div>
          </div>
          <div className="card">
            <img src="/assets/images/rajasthan.png" alt="Rajasthan" className="card-img" />
            <div className="card-content">
              <h3>Rajasthan</h3>
              <p>Royal heritage, colorful culture, and desert adventures.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-pink" id="community">
        <h2>Meet Our Community</h2>
        <p>Real women, real stories, real adventures</p>
        <div className="testimonials">
          <div className="testimonial">
            <div className="testimonial-header">
              <img src="/api/placeholder/60/60" alt="Simran" className="testimonial-img" />
              <div>
                <div className="testimonial-name">Simran Arora</div>
                <div className="testimonial-location">Delhi</div>
              </div>
            </div>
            <p>"Thanks to Chalo Saheli, I found the courage to take that solo trip to Rishikesh I'd been dreaming
              about for years. The safety tips and community support made all the difference!"</p>
          </div>
          <div className="testimonial">
            <div className="testimonial-header">
              <img src="/api/placeholder/60/60" alt="Dr. Harjeet" className="testimonial-img" />
              <div>
                <div className="testimonial-name">Dr. Harjeet Kaur</div>
                <div className="testimonial-location">Patiala</div>
              </div>
            </div>
            <p>"At 49, I thought my travel dreams were behind me. Chalo Saheli connected me with women my age who
              love adventure just as much as I do. We're planning our third trip together!"</p>
          </div>
          <div className="testimonial">
            <div className="testimonial-header">
              <img src="/api/placeholder/60/60" alt="Priya" className="testimonial-img" />
              <div>
                <div className="testimonial-name">Priya Sharma</div>
                <div className="testimonial-location">Bangalore</div>
              </div>
            </div>
            <p>"The local insights from other community members helped me discover hidden gems in Goa that I would
              have never found otherwise. This is more than just travel tips—it's a sisterhood."</p>
          </div>
        </div>
      </section>
      <section className="section" id="safety">
        <h2>Your Safety, Our Priority</h2>
        <p>We believe every woman deserves to travel without fear</p>
        <div className="features">
          <div className="feature">
            <div className="feature-icon">🛡️</div>
            <h3>Safety Protocols</h3>
            <p>Verified accommodations and transportation options specifically vetted for women travelers.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🔍</div>
            <h3>Emergency Support</h3>
            <p>Access to 24/7 emergency contact information and local support networks.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">👭</div>
            <h3>Travel Buddies</h3>
            <p>Connect with other community members planning trips to the same destination.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🗺️</div>
            <h3>Local Insights</h3>
            <p>Detailed information about local customs, safe areas, and women-friendly establishments.</p>
          </div>
        </div>
      </section>
      {/* Instagram Section */}
      <section className="instagram-section" id="stories">
        <h2>Join Our Instagram Community</h2>
        <p>Follow @Chalo.Saheli for daily inspiration and travel stories</p>
        <div className="carousel-wrapper">
          {isLoading ? (
            <div className="loading-indicator">Loading Instagram posts...</div>
          ) : null}
          <div className="carousel" id="instagram-carousel" ref={carouselRef}></div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;