import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (location.pathname === '/') {
        const sections = ['about', 'destinations', 'community', 'safety', 'stories', 'contact'];
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigationItems = [
    { name: 'About Us', href: '/#about', section: 'about' },
    { name: 'Destinations', href: '/#destinations', section: 'destinations' },
    { name: 'Community', href: '/#community', section: 'community' },
    { name: 'Safety', href: '/#safety', section: 'safety' },
    { name: 'Stories', href: '/#stories', section: 'stories' },
    { name: 'Contact', href: '/#contact', section: 'contact' }
  ];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
      ? 'bg-white shadow-md py-2'
      : 'bg-transparent py-4'
      }`}>
      <div className="container mx-auto px-5 md:px-12 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className={`transition-all duration-300 flex items-center ${isScrolled ? 'scale-90' : 'scale-100'}`}>
            <img
              src="/assets/images/logo-main.png"
              alt="Chalo Saheli Logo"
              className="h-12 w-auto"
            />
          </a>
        </div>
        <button
          className="md:hidden focus:outline-none text-pink-600"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <div className="hidden md:block">
          <ul className="flex items-center space-x-1 lg:space-x-2">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <a href={item.href}
                  className={`px-3 py-2 rounded-full font-medium text-sm lg:text-base transition-all duration-200 inline-block ${activeSection === item.section
                    ? 'text-white bg-pink-600'
                    : isScrolled
                      ? 'text-gray-800 hover:text-pink-600 hover:bg-pink-50'
                      : 'text-white hover:bg-white/20'
                    }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li className="ml-2">
              <a href="https://www.instagram.com/chalo.saheli/"
                className="bg-amber-500 text-white px-5 py-2 rounded-full font-medium text-sm lg:text-base hover:bg-amber-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Join Now
              </a>
            </li>
          </ul>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={toggleMenu}></div>
      )}
      <div
        className={`md:hidden fixed top-0 right-0 bottom-0 w-64 bg-white shadow-xl z-50 transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } overflow-y-auto`}
      >
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <span className="font-bold text-pink-600 text-xl">Menu</span>
          <button className="text-gray-500" onClick={toggleMenu}>
            <X size={24} />
          </button>
        </div>
        <ul className="py-4">
          {navigationItems.map((item) => (
            <li key={item.name} className="border-b border-gray-100 last:border-b-0">
              <a href={item.href}
                className={`block px-5 py-3 font-medium transition-colors duration-200 ${activeSection === item.section
                  ? 'text-pink-600 bg-pink-50'
                  : 'text-gray-800 hover:text-pink-600 hover:bg-pink-50'
                  }`}
                onClick={toggleMenu}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="p-5">
          <a href="https://www.instagram.com/chalo.saheli/"
            className="block w-full bg-amber-500 text-white text-center py-3 rounded-full font-medium hover:bg-amber-600 transition-all duration-300 shadow-md"
            onClick={toggleMenu}
          >
            Join Our Community
          </a>
        </div>
      </div>
    </nav>
  );
}
export default Header;