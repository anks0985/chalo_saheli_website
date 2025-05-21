import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Instagram } from 'lucide-react';
const AnimatedElement = ({ children, animation = 'fade-up', delay = 0, duration = 0.5, className = '' }) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const getAnimationClass = () => {
    if (!isVisible) return `invisible opacity-0`;
    const baseTransition = `transition-all duration-${duration * 1000} ease-out`;
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
const ContactHero = () => {
  return (
    <div className="relative flex flex-col justify-center items-center text-center text-white h-[50vh] bg-cover bg-center"
      style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/api/placeholder/1600/800')" }}>
      <div className="z-10 max-w-3xl px-5">
        <AnimatedElement animation="zoom-in" duration={0.8}>
          <h1 className="text-6xl mb-5 drop-shadow-md">Contact Us</h1>
        </AnimatedElement>
        <AnimatedElement animation="fade-up" delay={0.2} duration={0.8}>
          <p className="text-2xl mb-8">Let's plan your next adventure together!</p>
        </AnimatedElement>
      </div>
    </div>
  );
};
const ContactInfoSection = () => {
  const contactMethods = [
    {
      icon: <Mail size={40} />,
      title: "Email Us",
      info: "hello@chalosaheli.com",
      description: "Send us an email anytime, we typically respond within 24 hours."
    },
    {
      icon: <Phone size={40} />,
      title: "Call Us",
      info: "+91 98765 43210",
      description: "Available Monday to Friday, 10:00 AM to 6:00 PM IST."
    },
    {
      icon: <MapPin size={40} />,
      title: "Visit Us",
      info: "Delhi, India",
      description: "Based in Delhi with community members across India."
    },
    {
      icon: <Instagram size={40} />,
      title: "Social Media",
      info: "@chalo.saheli",
      description: "Follow us on Instagram for daily updates and inspiration."
    }
  ];
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <AnimatedElement animation="fade-up">
          <h2 className="text-4xl mb-5 text-amber-500 text-center">Get In Touch</h2>
        </AnimatedElement>
        <AnimatedElement animation="fade-up" delay={0.2}>
          <p className="text-lg mb-12 text-center max-w-2xl mx-auto">
            Have questions about our community, travel plans, or just want to say hello? We'd love to hear from you!
          </p>
        </AnimatedElement>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {contactMethods.map((method, index) => (
            <AnimatedElement
              key={index}
              animation="fade-up"
              delay={0.2 + index * 0.15}
            >
              <div className="bg-white p-8 rounded-lg shadow-md text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full">
                <div className="text-pink-600 mb-4 flex justify-center">
                  {method.icon}
                </div>
                <h3 className="text-xl mb-2 text-amber-500">{method.title}</h3>
                <p className="font-bold mb-3">{method.info}</p>
                <p className="text-gray-600">{method.description}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
};
const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-pink-600 text-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/5 p-8 md:p-12">
              <AnimatedElement animation="fade-left">
                <h3 className="text-3xl mb-6">Send Us a Message</h3>
              </AnimatedElement>
              <AnimatedElement animation="fade-left" delay={0.2}>
                <p className="mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </AnimatedElement>
              <AnimatedElement animation="fade-up" delay={0.3}>
                <div className="contact-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm">Your Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md bg-pink-700 text-white placeholder-pink-200 border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        placeholder="Full Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm">Your Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md bg-pink-700 text-white placeholder-pink-200 border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        placeholder="Email Address"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="block mb-2 text-sm">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md bg-pink-700 text-white placeholder-pink-200 border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        placeholder="Phone Number"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block mb-2 text-sm">Subject *</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md bg-pink-700 text-white placeholder-pink-200 border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        placeholder="Subject"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block mb-2 text-sm">Your Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-4 py-3 rounded-md bg-pink-700 text-white placeholder-pink-200 border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      placeholder="Type your message here..."
                    />
                  </div>
                  <div
                    onClick={handleSubmit}
                    className="bg-amber-500 text-white border-none py-3 px-8 text-lg rounded-full cursor-pointer transition-all duration-300 font-bold uppercase tracking-wider hover:bg-amber-600 hover:-translate-y-1 hover:shadow-lg flex items-center inline-block"
                  >
                    Send Message <Send size={18} className="ml-2" />
                  </div>
                  {submitted && (
                    <div className="mt-4 p-3 bg-green-600 text-white rounded-md text-center">
                      Thank you! Your message has been sent successfully.
                    </div>
                  )}
                </div>
              </AnimatedElement>
            </div>
            <div className="w-full md:w-2/5 bg-cover bg-center hidden md:block" style={{ backgroundImage: "url('/api/placeholder/800/600')" }}>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };
  const faqs = [
    {
      question: "How do I join the Chalo Saheli community?",
      answer: "You can join our community by following us on Instagram @chalo.saheli and filling out the join form on our website. Once submitted, you'll receive an email with next steps to become a member."
    },
    {
      question: "Are your trips only for women from India?",
      answer: "While we primarily serve women from India, we welcome women travelers from all over the world who are interested in exploring India safely and with a supportive community."
    },
    {
      question: "Do you organize international trips?",
      answer: "Yes! We organize both domestic and international trips. Some of our popular international destinations include Bali, Thailand, and Nepal."
    },
    {
      question: "I'm a solo traveler. Can I still join your trips?",
      answer: "Absolutely! In fact, most of our community members start as solo travelers looking for travel buddies. You'll quickly make friends on our trips and can choose to join group activities or explore on your own."
    },
    {
      question: "How do you ensure safety on your trips?",
      answer: "Safety is our top priority. We thoroughly vet all accommodations and transportation options, provide 24/7 emergency contacts, create detailed itineraries with safe routes, and ensure that our trip leaders are trained in basic first aid and emergency protocols."
    }
  ];
  return (
    <section className="py-16 px-4 bg-blue-100">
      <div className="container mx-auto max-w-3xl">
        <AnimatedElement animation="fade-up">
          <h2 className="text-4xl mb-5 text-amber-500 text-center">Frequently Asked Questions</h2>
        </AnimatedElement>
        <AnimatedElement animation="fade-up" delay={0.2}>
          <p className="text-lg mb-12 text-center">
            Can't find what you're looking for? Contact us directly!
          </p>
        </AnimatedElement>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <AnimatedElement
              key={index}
              animation="fade-up"
              delay={0.2 + index * 0.1}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div
                  className="w-full text-left p-6 focus:outline-none flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-xl font-medium text-amber-500">{faq.question}</span>
                  <span className="text-pink-600 text-xl">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </div>
                <div className={`px-6 pb-6 ${openIndex === index ? 'block' : 'hidden'}`}>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
};
const MapSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <AnimatedElement animation="fade-up">
          <h2 className="text-4xl mb-5 text-amber-500 text-center">Find Us</h2>
        </AnimatedElement>
        <AnimatedElement animation="fade-up" delay={0.2}>
          <p className="text-lg mb-12 text-center">
            Our community is spread across India, with our headquarters in Delhi
          </p>
        </AnimatedElement>
        <AnimatedElement animation="fade-up" delay={0.3}>
          <div className="rounded-lg overflow-hidden shadow-xl h-96 w-full bg-gray-200">
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <div className="text-center">
                <MapPin size={48} className="text-pink-600 mx-auto mb-4" />
                <p className="text-xl font-bold">Map Placeholder</p>
                <p className="text-gray-600">Delhi, India</p>
              </div>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};
const CallToAction = () => {
  return (
    <section className="py-16 px-4 bg-pink-600 text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <AnimatedElement animation="zoom-in">
          <h2 className="text-4xl mb-6">Join Our Community Today!</h2>
        </AnimatedElement>
        <AnimatedElement animation="fade-up" delay={0.2}>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Connect with like-minded women travelers, access exclusive resources,
            and embark on amazing adventures with the support of our community.
          </p>
        </AnimatedElement>
        <AnimatedElement animation="fade-up" delay={0.4}>
          <a href="https://www.instagram.com/chalo.saheli/" className="bg-amber-500 text-white border-none py-4 px-10 text-xl rounded-full cursor-pointer transition-all duration-300 font-bold uppercase tracking-wider hover:bg-amber-600 hover:-translate-y-1 hover:shadow-lg inline-block">
            Follow On Instagram
          </a>
        </AnimatedElement>
      </div>
    </section>
  );
};
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="w-12 h-12 bg-pink-600 rounded-full mr-3 flex justify-center items-center">
                <img src="/api/placeholder/100/100" alt="Chalo Saheli Logo" className="w-8 h-8 object-contain" />
              </div>
              <h4 className="text-xl font-bold">Chalo Saheli</h4>
            </div>
            <p className="text-gray-400 mb-4">Where her 'maybe someday' becomes 'hell yes, today!'</p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Destinations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Safety</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Safety Guidelines</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Travel Insurance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Packing Tips</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Solo Travel Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-pink-600" />
                <a href="mailto:hello@chalosaheli.com" className="text-gray-400 hover:text-white transition-colors">hello@chalosaheli.com</a>
              </li>
              <li className="flex items-center">
                <Instagram size={18} className="mr-2 text-pink-600" />
                <a href="https://www.instagram.com/chalo.saheli/" className="text-gray-400 hover:text-white transition-colors">@chalo.saheli</a>
              </li>
              <li className="flex items-center">
                <MapPin size={18} className="mr-2 text-pink-600" />
                <span className="text-gray-400">Based in Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 mt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© 2025 Chalo Saheli. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white pt-16">
      <ContactHero />
      <ContactInfoSection />
      <ContactFormSection />
      <FAQSection />
      <MapSection />
      <CallToAction />
    </div>
  );
};
export default ContactPage;