import { Shield, Search, Users, Map } from 'lucide-react';
import InstagramCarousel from './Carousel';
const HeroSection = () => {
  return (
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
  );
};
const AnimatedBus = () => {
  return (
    <div className="flex justify-center items-end h-36 overflow-hidden -mt-20 relative z-10">
      <div className="relative">
        <img src="/assets/images/bus.gif" alt="Travel Van" className="h-auto max-h-52 block mt-auto relative z-10" />
      </div>
    </div>
  );
};
const AboutSection = () => {
  const features = [
    {
      image: "/assets/images/safety.png",
      title: "Safety First",
      description: "Real safety protocols and testimonials from our community members who have traveled to various destinations."
    },
    {
      image: "/assets/images/community.png",
      title: "Build Community",
      description: "Connect with like-minded women who share your passion for travel and adventure."
    },
    {
      image: "/assets/images/travelresources.png",
      title: "Travel Resources",
      description: "Access to exclusive travel guides, tips, and deals specifically curated for women travelers."
    }
  ];
  return (
    <section className="py-24 px-12 text-center" id="about">
      <h2 className="text-4xl mb-5 text-amber-500">Women's Only Travel Community</h2>
      <p className="text-lg mb-12">Empowering | Adventurous | Trustworthy | Inclusive</p>
      <div className="flex flex-wrap justify-center gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden w-72 shadow-md transition-all duration-300 hover:-translate-y-3 hover:shadow-xl"
          >
            <img src={feature.image} alt={feature.title} className="h-52 w-full object-cover" />
            <div className="p-5">
              <h3 className="text-xl mb-3 text-amber-500">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
const DestinationsSection = () => {
  const destinations = [
    {
      image: "/assets/images/bali.png",
      title: "Bali",
      description: "Spiritual retreats, beautiful beaches, and vibrant culture."
    },
    {
      image: "/assets/images/himachal.png",
      title: "Himachal Pradesh",
      description: "Breathtaking mountains, peaceful retreats, and adventure sports."
    },
    {
      image: "/assets/images/rajasthan.png",
      title: "Rajasthan",
      description: "Royal heritage, colorful culture, and desert adventures."
    }
  ];
  return (
    <section className="py-24 px-12 text-center bg-blue-100" id="destinations">
      <h2 className="text-4xl mb-5 text-amber-500">Popular Destinations</h2>
      <p className="text-lg mb-12">Discover new places with confidence and community support</p>
      <div className="flex flex-wrap justify-center gap-8">
        {destinations.map((destination, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden w-72 shadow-md transition-all duration-300 hover:-translate-y-3 hover:shadow-xl"
          >
            <img src={destination.image} alt={destination.title} className="h-52 w-full object-cover" />
            <div className="p-5">
              <h3 className="text-xl mb-3 text-amber-500">{destination.title}</h3>
              <p>{destination.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
const CommunitySection = () => {
  const testimonials = [
    {
      image: "/api/placeholder/60/60",
      name: "Simran Arora",
      location: "Delhi",
      testimonial: "Thanks to Chalo Saheli, I found the courage to take that solo trip to Rishikesh I'd been dreaming about for years. The safety tips and community support made all the difference!"
    },
    {
      image: "/api/placeholder/60/60",
      name: "Dr. Harjeet Kaur",
      location: "Patiala",
      testimonial: "At 49, I thought my travel dreams were behind me. Chalo Saheli connected me with women my age who love adventure just as much as I do. We're planning our third trip together!"
    },
    {
      image: "/api/placeholder/60/60",
      name: "Priya Sharma",
      location: "Bangalore",
      testimonial: "The local insights from other community members helped me discover hidden gems in Goa that I would have never found otherwise. This is more than just travel tips—it's a sisterhood."
    }
  ];
  return (
    <section className="py-24 px-12 text-center bg-pink-600 text-white" id="community">
      <h2 className="text-4xl mb-5">Meet Our Community</h2>
      <p className="text-lg mb-12">Real women, real stories, real adventures</p>
      <div className="flex flex-wrap justify-center gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white text-black p-7 rounded-lg w-72 shadow-md text-left">
            <div className="flex items-center mb-5">
              <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4" />
              <div>
                <div className="font-bold">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.location}</div>
              </div>
            </div>
            <p>{testimonial.testimonial}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
const SafetySection = () => {
  const features = [
    {
      icon: <Shield size={64} />,
      title: "Safety Protocols",
      description: "Verified accommodations and transportation options specifically vetted for women travelers."
    },
    {
      icon: <Search size={64} />,
      title: "Emergency Support",
      description: "Access to 24/7 emergency contact information and local support networks."
    },
    {
      icon: <Users size={64} />,
      title: "Travel Buddies",
      description: "Connect with other community members planning trips to the same destination."
    },
    {
      icon: <Map size={64} />,
      title: "Local Insights",
      description: "Detailed information about local customs, safe areas, and women-friendly establishments."
    }
  ];
  return (
    <section className="py-24 px-12 text-center" id="safety">
      <h2 className="text-4xl mb-5 text-amber-500">Your Safety, Our Priority</h2>
      <p className="text-lg mb-12">We believe every woman deserves to travel without fear</p>
      <div className="flex flex-wrap justify-center gap-8 mt-12">
        {features.map((feature, index) => (
          <div key={index} className="w-72 p-5 text-center">
            <div className="text-6xl text-pink-600 mb-5 flex justify-center">
              {feature.icon}
            </div>
            <h3 className="text-xl mb-3 text-amber-500">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      <HeroSection />
      <AnimatedBus />
      <AboutSection />
      <DestinationsSection />
      <CommunitySection />
      <SafetySection />
      <InstagramCarousel />
    </div>
  );
};
export default HomePage;