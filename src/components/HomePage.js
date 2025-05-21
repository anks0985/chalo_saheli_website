import { useState, useEffect, useRef } from 'react';
import { Shield, Search, Users, Map } from 'lucide-react';
import InstagramCarousel from './Carousel';
import { Link } from 'react-router-dom';
const useIntersectionObserver = (options = {}) => {
  const [elements, setElements] = useState([]);
  const [entries, setEntries] = useState([]);
  const observer = useRef(null);
  const { root = null, rootMargin = "0px", threshold = 0.1 } = options;
  useEffect(() => {
    if (elements.length) {
      observer.current = new IntersectionObserver((observedEntries) => {
        setEntries(observedEntries);
      }, {
        root,
        rootMargin,
        threshold
      });
      elements.forEach(element => {
        if (element.current) {
          observer.current.observe(element.current);
        }
      });
      return () => {
        if (observer.current) {
          observer.current.disconnect();
        }
      };
    }
  }, [elements, root, rootMargin, threshold]);
  return { observer, setElements, entries };
};
const AnimatedElement = ({ children, animation = 'fade-up', delay = 0, duration = 0.5, className = '' }) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { setElements, entries } = useIntersectionObserver({
    threshold: 0.1
  });
  useEffect(() => {
    if (elementRef.current) {
      setElements([elementRef]);
    }
  }, [setElements]);
  useEffect(() => {
    const currentElement = elementRef.current;
    entries.forEach(entry => {
      if (entry.target === currentElement) {
        setIsVisible(entry.isIntersecting);
      }
    });
  }, [entries]);
  const getAnimationClass = () => {
    if (!isVisible) return `invisible opacity-0`;
    const baseTransition = `transition-all duration-${duration * 1000} delay-${delay * 1000} ease-out`;
    switch (animation) {
      case 'fade-up':
        return `transform translate-y-0 opacity-100 ${baseTransition}`;
      case 'fade-down':
        return `transform translate-y-0 opacity-100 ${baseTransition}`;
      case 'fade-left':
        return `transform translate-x-0 opacity-100 ${baseTransition}`;
      case 'fade-right':
        return `transform translate-x-0 opacity-100 ${baseTransition}`;
      case 'zoom-in':
        return `transform scale-100 opacity-100 ${baseTransition}`;
      case 'zoom-out':
        return `transform scale-100 opacity-100 ${baseTransition}`;
      default:
        return `opacity-100 ${baseTransition}`;
    }
  };
  const getInitialClass = () => {
    switch (animation) {
      case 'fade-up':
        return `transform translate-y-16`;
      case 'fade-down':
        return `transform -translate-y-16`;
      case 'fade-left':
        return `transform translate-x-16`;
      case 'fade-right':
        return `transform -translate-x-16`;
      case 'zoom-in':
        return `transform scale-90`;
      case 'zoom-out':
        return `transform scale-110`;
      default:
        return '';
    }
  };
  return (
    <div
      ref={elementRef}
      className={`${className} ${getInitialClass()} ${getAnimationClass()}`}
      style={{
        transition: `transform ${duration}s ease-out ${delay}s, opacity ${duration}s ease-out ${delay}s`
      }}
    >
      {children}
    </div>
  );
};
const HeroSection = () => {
  return (
    <div className="relative flex flex-col justify-center items-center text-center text-white h-[90vh] bg-cover bg-center"
      style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/assets/images/banner.png')" }}>
      <div className="z-10 max-w-3xl px-5">
        <AnimatedElement animation="zoom-in" duration={0.8}>
          <div className="w-32 h-32 bg-pink-600 rounded-full mb-5 flex justify-center items-center mx-auto">
            <img src="/assets/images/logo.png" alt="Chalo Saheli Logo" className="w-4/5 h-4/5 object-contain" />
          </div>
        </AnimatedElement>
        <AnimatedElement animation="fade-up" delay={0.2} duration={0.8}>
          <h1 className="text-6xl mb-5 drop-shadow-md">Chalo Saheli</h1>
        </AnimatedElement>
        <AnimatedElement animation="fade-up" delay={0.4} duration={0.8}>
          <p className="text-2xl mb-8">Where her 'maybe someday' becomes 'hell yes, today!'</p>
        </AnimatedElement>
        <AnimatedElement animation="fade-up" delay={0.6} duration={0.8}>
          <Link to='https://www.instagram.com/chalo.saheli/' className="bg-amber-500 text-white border-none py-4 px-10 text-xl rounded-full cursor-pointer transition-all duration-300 font-bold uppercase tracking-wider hover:bg-amber-600 hover:-translate-y-1 hover:shadow-lg">
            Join Our Community
          </Link>
        </AnimatedElement>
      </div>
    </div>
  );
};
const AnimatedBus = () => {
  return (
    <div className="relative h-auto overflow-hidden z-10 mt-24 bg-white">
      <div className="relative">
        <img
          src="/assets/images/bus.gif"
          alt="Travel Van"
          className="w-screen relative z-10"
        />
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
    <section className="pt-10 pb-24 px-12 text-center" id="about">
      <AnimatedElement animation="fade-up">
        <h2 className="text-4xl mb-5 text-amber-500">Women's Only Travel Community</h2>
      </AnimatedElement>
      <AnimatedElement animation="fade-up" delay={0.2}>
        <p className="text-lg mb-12">Empowering | Adventurous | Trustworthy | Inclusive</p>
      </AnimatedElement>
      <div className="flex flex-wrap justify-center gap-8">
        {features.map((feature, index) => (
          <AnimatedElement
            key={index}
            animation="fade-up"
            delay={0.2 + index * 0.15}
            className="w-72"
          >
            <div
              className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-3 hover:shadow-xl h-full"
            >
              <img src={feature.image} alt={feature.title} className="h-52 w-full object-cover" />
              <div className="p-5">
                <h3 className="text-xl mb-3 text-amber-500">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          </AnimatedElement>
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
    <section className="pt-10 pb-24 px-12 text-center bg-blue-100 relative" id="destinations">
      <AnimatedElement animation="fade-up">
        <h2 className="text-4xl mb-5 text-amber-500">Popular Destinations</h2>
      </AnimatedElement>
      <AnimatedElement animation="fade-up" delay={0.2}>
        <p className="text-lg mb-12">Discover new places with confidence and community support</p>
      </AnimatedElement>
      <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
        {destinations.map((destination, index) => (
          <AnimatedElement
            key={index}
            animation="fade-up"
            delay={0.2 + index * 0.15}
            className="w-72"
          >
            <div
              className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-3 hover:shadow-xl h-full"
            >
              <div className="h-52 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl mb-3 text-amber-500">{destination.title}</h3>
                <p>{destination.description}</p>
              </div>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </section>
  );
};
const CommunitySection = () => {
  const testimonials = [
    {
      image: "/assets/images/Simran Arora.png",
      name: "Simran Arora",
      location: "Delhi",
      testimonial: "Thanks to Chalo Saheli, I found the courage to take that solo trip to Rishikesh I'd been dreaming about for years. The safety tips and community support made all the difference!"
    },
    {
      image: "/assets/images/Dr. Harjeet Kaur.png",
      name: "Dr. Harjeet Kaur",
      location: "Patiala",
      testimonial: "At 49, I thought my travel dreams were behind me. Chalo Saheli connected me with women my age who love adventure just as much as I do. We're planning our third trip together!"
    },
    {
      image: "/assets/images/Priya Sharma.png",
      name: "Priya Sharma",
      location: "Bangalore",
      testimonial: "The local insights from other community members helped me discover hidden gems in Goa that I would have never found otherwise. This is more than just travel tips—it's a sisterhood."
    }
  ];
  return (
    <section className="pt-10 pb-24 px-12 text-center bg-pink-600 text-white" id="community">
      <AnimatedElement animation="fade-up">
        <h2 className="text-4xl mb-5">Meet Our Community</h2>
      </AnimatedElement>
      <AnimatedElement animation="fade-up" delay={0.2}>
        <p className="text-lg mb-12">Real women, real stories, real adventures</p>
      </AnimatedElement>
      <div className="flex flex-wrap justify-center gap-8">
        {testimonials.map((testimonial, index) => (
          <AnimatedElement
            key={index}
            animation="fade-up"
            delay={0.2 + index * 0.15}
            className="w-72"
          >
            <div className="bg-white text-black p-7 rounded-lg shadow-md text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full">
              <div className="flex items-center mb-5">
                <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </div>
              <p>{testimonial.testimonial}</p>
            </div>
          </AnimatedElement>
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
    <section className="pt-10 pb-24 px-12 text-center" id="safety">
      <AnimatedElement animation="fade-up">
        <h2 className="text-4xl mb-5 text-amber-500">Your Safety, Our Priority</h2>
      </AnimatedElement>
      <AnimatedElement animation="fade-up" delay={0.2}>
        <p className="text-lg mb-12">We believe every woman deserves to travel without fear</p>
      </AnimatedElement>
      <div className="flex flex-wrap justify-center gap-8 mt-12">
        {features.map((feature, index) => (
          <AnimatedElement
            key={index}
            animation="fade-up"
            delay={0.2 + index * 0.15}
            className="w-72"
          >
            <div className="p-5 text-center transition-all duration-300 hover:-translate-y-2">
              <div className="text-6xl text-pink-600 mb-5 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl mb-3 text-amber-500">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </section>
  );
};
const CounterSection = () => {
  const [counters, setCounters] = useState({
    travelers: 0,
    destinations: 0,
    trips: 0,
    ratings: 0
  });
  const counterRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationStarted = useRef(false);
  const { setElements, entries } = useIntersectionObserver({
    threshold: 0.1
  });
  useEffect(() => {
    if (counterRef.current) {
      setElements([counterRef]);
    }
  }, [setElements]);
  useEffect(() => {
    const currentElement = counterRef.current;
    entries.forEach(entry => {
      if (entry.target === currentElement) {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!animationStarted.current) {
            setCounters({
              travelers: 0,
              destinations: 0,
              trips: 0,
              ratings: 0
            });
            animationStarted.current = true;
          }
        } else {
          setIsVisible(false);
          animationStarted.current = false;
        }
      }
    });
  }, [entries]);
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCounters(prev => {
          const newCounters = { ...prev };
          if (newCounters.travelers < 15000) {
            newCounters.travelers = Math.min(newCounters.travelers + 500, 15000);
          }
          if (newCounters.destinations < 100) {
            newCounters.destinations = Math.min(newCounters.destinations + 4, 100);
          }
          if (newCounters.trips < 250) {
            newCounters.trips = Math.min(newCounters.trips + 10, 250);
          }
          if (newCounters.ratings < 4.8) {
            newCounters.ratings = Math.min(newCounters.ratings + 0.2, 4.8);
          }
          return newCounters;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isVisible]);
  const stats = [
    { label: "Happy Travelers", value: counters.travelers.toLocaleString(), suffix: "+" },
    { label: "Destinations", value: counters.destinations, suffix: "+" },
    { label: "Trips Organized", value: counters.trips, suffix: "+" },
    { label: "Average Rating", value: counters.ratings.toFixed(1), suffix: "/5" }
  ];
  return (
    <section
      ref={counterRef}
      className="py-16 bg-pink-50"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-700 ${isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
                }`}
              style={{
                transitionDelay: `${0.1 + index * 0.1}s`,
              }}
            >
              <div className="text-4xl font-bold text-pink-600 mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      <HeroSection />
      <AboutSection />
      <DestinationsSection />
      <CounterSection />
      <CommunitySection />
      <SafetySection />
      <InstagramCarousel />
    </div>
  );
};
export default HomePage;