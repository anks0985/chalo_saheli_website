import React, { useState, useEffect, useRef } from 'react';
import { Shield, Search, Users, Map } from 'lucide-react';
import response from './posts.json';
const HomePage = () => {
  const carouselRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchInstagramPosts = () => {
      try {
        if (!response || !response.instagramPosts || !Array.isArray(response.instagramPosts)) {
          console.error("Invalid Instagram posts data structure");
          setIsLoading(false);
          return;
        }
        const urls = response.instagramPosts;
        if (carouselRef.current) {
          carouselRef.current.innerHTML = '';
          urls.forEach(url => {
            const cleanUrl = url.trim();
            const container = document.createElement('div');
            container.className = 'instagram-post bg-white rounded-lg p-3 shadow-md transition-transform duration-300 hover:scale-102';
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
          loadInstagramScript();
        }
      } catch (error) {
        console.error("Instagram carousel error:", error);
        setIsLoading(false);
      }
    };
    const loadInstagramScript = () => {
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
        setupAutoScroll();
      };
    };
    const setupAutoScroll = () => {
      const wrapper = document.querySelector('.carousel-wrapper');
      if (!wrapper) return;
      let autoScrollInterval;
      const startAutoScroll = () => {
        clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => {
          if (!wrapper) return;
          wrapper.scrollBy({
            left: 2,
            behavior: 'smooth'
          });
          if (wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth - 5) {
            wrapper.scrollTo({ left: 0, behavior: 'smooth' });
          }
        }, 20);
      };
      startAutoScroll();
      wrapper.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
      wrapper.addEventListener('mouseleave', startAutoScroll);
      return () => {
        clearInterval(autoScrollInterval);
        wrapper.removeEventListener('mouseenter', () => clearInterval(autoScrollInterval));
        wrapper.removeEventListener('mouseleave', startAutoScroll);
      };
    };
    fetchInstagramPosts();
    return () => {
      const wrapper = document.querySelector('.carousel-wrapper');
      if (wrapper) {
        wrapper.removeEventListener('mouseenter', () => { });
        wrapper.removeEventListener('mouseleave', () => { });
      }
    };
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      <div className="relative flex flex-col justify-center items-center text-center text-white h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/assets/images/banner.png')" }}>
        <div className="z-10 max-w-3xl px-5">
          <div className="w-32 h-32 bg-pink-600 rounded-full mb-5 flex justify-center items-center mx-auto">
            <img src="/assets/images/logo.png" alt="Chalo Saheli Logo" className="w-4/5 h-4/5 object-contain" />
          </div>
          <h1 className="text-6xl mb-5 drop-shadow-md">Chalo Saheli</h1>
          <p className="text-2xl mb-8">Where her 'maybe someday' becomes 'hell yes, today!'</p>
          <button className="bg-amber-500 text-white border-none py-4 px-10 text-xl rounded-full cursor-pointer transition-all duration-300 font-bold uppercase tracking-wider hover:bg-amber-600 hover:-translate-y-1 hover:shadow-lg">
            Join Our Community
          </button>
        </div>
      </div>
      <div className="flex justify-center items-end h-36 overflow-hidden -mt-20 relative z-10">
        <div className="relative">
          <img src="/assets/images/bus.gif" alt="Travel Van" className="h-auto max-h-52 block mt-auto relative z-10" />
        </div>
      </div>
      <section className="py-24 px-12 text-center" id="about">
        <h2 className="text-4xl mb-5 text-amber-500">Women's Only Travel Community</h2>
        <p className="text-lg mb-12">Empowering | Adventurous | Trustworthy | Inclusive</p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white rounded-lg overflow-hidden w-72 shadow-md transition-all duration-300 hover:-translate-y-3 hover:shadow-xl">
            <img src="/assets/images/safety.png" alt="Safety First" className="h-52 w-full object-cover" />
            <div className="p-5">
              <h3 className="text-xl mb-3 text-amber-500">Safety First</h3>
              <p>Real safety protocols and testimonials from our community members who have traveled to various destinations.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden w-72 shadow-md transition-all duration-300 hover:-translate-y-3 hover:shadow-xl">
            <img src="/assets/images/community.png" alt="Build Community" className="h-52 w-full object-cover" />
            <div className="p-5">
              <h3 className="text-xl mb-3 text-amber-500">Build Community</h3>
              <p>Connect with like-minded women who share your passion for travel and adventure.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden w-72 shadow-md transition-all duration-300 hover:-translate-y-3 hover:shadow-xl">
            <img src="/assets/images/travelresources.png" alt="Travel Resources" className="h-52 w-full object-cover" />
            <div className="p-5">
              <h3 className="text-xl mb-3 text-amber-500">Travel Resources</h3>
              <p>Access to exclusive travel guides, tips, and deals specifically curated for women travelers.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 px-12 text-center bg-blue-100" id="destinations">
        <h2 className="text-4xl mb-5 text-amber-500">Popular Destinations</h2>
        <p className="text-lg mb-12">Discover new places with confidence and community support</p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white rounded-lg overflow-hidden w-72 shadow-md transition-all duration-300 hover:-translate-y-3 hover:shadow-xl">
            <img src="/assets/images/bali.png" alt="Bali" className="h-52 w-full object-cover" />
            <div className="p-5">
              <h3 className="text-xl mb-3 text-amber-500">Bali</h3>
              <p>Spiritual retreats, beautiful beaches, and vibrant culture.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden w-72 shadow-md transition-all duration-300 hover:-translate-y-3 hover:shadow-xl">
            <img src="/assets/images/himachal.png" alt="Himachal Pradesh" className="h-52 w-full object-cover" />
            <div className="p-5">
              <h3 className="text-xl mb-3 text-amber-500">Himachal Pradesh</h3>
              <p>Breathtaking mountains, peaceful retreats, and adventure sports.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden w-72 shadow-md transition-all duration-300 hover:-translate-y-3 hover:shadow-xl">
            <img src="/assets/images/rajasthan.png" alt="Rajasthan" className="h-52 w-full object-cover" />
            <div className="p-5">
              <h3 className="text-xl mb-3 text-amber-500">Rajasthan</h3>
              <p>Royal heritage, colorful culture, and desert adventures.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 px-12 text-center bg-pink-600 text-white" id="community">
        <h2 className="text-4xl mb-5">Meet Our Community</h2>
        <p className="text-lg mb-12">Real women, real stories, real adventures</p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white text-black p-7 rounded-lg w-72 shadow-md text-left">
            <div className="flex items-center mb-5">
              <img src="/api/placeholder/60/60" alt="Simran" className="w-16 h-16 rounded-full mr-4" />
              <div>
                <div className="font-bold">Simran Arora</div>
                <div className="text-sm text-gray-500">Delhi</div>
              </div>
            </div>
            <p>"Thanks to Chalo Saheli, I found the courage to take that solo trip to Rishikesh I'd been dreaming about for years. The safety tips and community support made all the difference!"</p>
          </div>
          <div className="bg-white text-black p-7 rounded-lg w-72 shadow-md text-left">
            <div className="flex items-center mb-5">
              <img src="/api/placeholder/60/60" alt="Dr. Harjeet" className="w-16 h-16 rounded-full mr-4" />
              <div>
                <div className="font-bold">Dr. Harjeet Kaur</div>
                <div className="text-sm text-gray-500">Patiala</div>
              </div>
            </div>
            <p>"At 49, I thought my travel dreams were behind me. Chalo Saheli connected me with women my age who love adventure just as much as I do. We're planning our third trip together!"</p>
          </div>
          <div className="bg-white text-black p-7 rounded-lg w-72 shadow-md text-left">
            <div className="flex items-center mb-5">
              <img src="/api/placeholder/60/60" alt="Priya" className="w-16 h-16 rounded-full mr-4" />
              <div>
                <div className="font-bold">Priya Sharma</div>
                <div className="text-sm text-gray-500">Bangalore</div>
              </div>
            </div>
            <p>"The local insights from other community members helped me discover hidden gems in Goa that I would have never found otherwise. This is more than just travel tips—it's a sisterhood."</p>
          </div>
        </div>
      </section>
      <section className="py-24 px-12 text-center" id="safety">
        <h2 className="text-4xl mb-5 text-amber-500">Your Safety, Our Priority</h2>
        <p className="text-lg mb-12">We believe every woman deserves to travel without fear</p>
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          <div className="w-72 p-5 text-center">
            <div className="text-6xl text-pink-600 mb-5 flex justify-center">
              <Shield size={64} />
            </div>
            <h3 className="text-xl mb-3 text-amber-500">Safety Protocols</h3>
            <p>Verified accommodations and transportation options specifically vetted for women travelers.</p>
          </div>
          <div className="w-72 p-5 text-center">
            <div className="text-6xl text-pink-600 mb-5 flex justify-center">
              <Search size={64} />
            </div>
            <h3 className="text-xl mb-3 text-amber-500">Emergency Support</h3>
            <p>Access to 24/7 emergency contact information and local support networks.</p>
          </div>
          <div className="w-72 p-5 text-center">
            <div className="text-6xl text-pink-600 mb-5 flex justify-center">
              <Users size={64} />
            </div>
            <h3 className="text-xl mb-3 text-amber-500">Travel Buddies</h3>
            <p>Connect with other community members planning trips to the same destination.</p>
          </div>
          <div className="w-72 p-5 text-center">
            <div className="text-6xl text-pink-600 mb-5 flex justify-center">
              <Map size={64} />
            </div>
            <h3 className="text-xl mb-3 text-amber-500">Local Insights</h3>
            <p>Detailed information about local customs, safe areas, and women-friendly establishments.</p>
          </div>
        </div>
      </section>
      <section className="py-20 px-5 text-center bg-amber-500 text-white" id="stories">
        <h2 className="text-4xl mb-3">Join Our Instagram Community</h2>
        <p className="text-base mb-8 max-w-xl mx-auto">Follow @Chalo.Saheli for daily inspiration and travel stories</p>
        <div className="overflow-x-auto overflow-y-hidden scroll-smooth overscroll-x-contain pb-3 scrollbar-hide">
          {isLoading ? (
            <div className="loading-indicator">Loading Instagram posts...</div>
          ) : null}
          <div className="flex gap-5 w-max px-3" id="instagram-carousel" ref={carouselRef}></div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;