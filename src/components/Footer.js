import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-12 px-5 md:px-12 text-center" id="contact">
            <div className="flex flex-wrap justify-between max-w-6xl mx-auto">
                <div className="w-full md:w-1/2 lg:w-1/4 mb-8">
                    <h3 className="text-xl mb-4 text-pink-600">Chalo Saheli</h3>
                    <p className="mb-6">Where her 'maybe someday' becomes 'hell yes, today!'</p>
                    <div className="flex justify-center space-x-4">
                        <Link to="https://www.instagram.com/chalo.saheli/" className="w-10 h-10 bg-white rounded-full flex justify-center items-center transition-all duration-300 hover:bg-pink-600 hover:-translate-y-1">
                            <Instagram size={20} className="text-gray-800" />
                        </Link>
                        <Link to="#" className="w-10 h-10 bg-white rounded-full flex justify-center items-center transition-all duration-300 hover:bg-pink-600 hover:-translate-y-1">
                            <Facebook size={20} className="text-gray-800" />
                        </Link>
                        <Link to="#" className="w-10 h-10 bg-white rounded-full flex justify-center items-center transition-all duration-300 hover:bg-pink-600 hover:-translate-y-1">
                            <Twitter size={20} className="text-gray-800" />
                        </Link>
                        <Link to="#" className="w-10 h-10 bg-white rounded-full flex justify-center items-center transition-all duration-300 hover:bg-pink-600 hover:-translate-y-1">
                            <Youtube size={20} className="text-gray-800" />
                        </Link>
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 mb-8">
                    <h3 className="text-xl mb-4 text-pink-600">Quick Links</h3>
                    <ul className="space-y-3 text-left md:text-center">
                        <li><Link to="/#about" className="hover:text-pink-600 transition-colors duration-300">About Us</Link></li>
                        <li><Link to="/#destinations" className="hover:text-pink-600 transition-colors duration-300">Destinations</Link></li>
                        <li><Link to="/#community" className="hover:text-pink-600 transition-colors duration-300">Community</Link></li>
                        <li><Link to="/#safety" className="hover:text-pink-600 transition-colors duration-300">Safety</Link></li>
                        <li><Link to="/#stories" className="hover:text-pink-600 transition-colors duration-300">Stories</Link></li>
                        <li><Link to="/contact" className="hover:text-pink-600 transition-colors duration-300">Contact</Link></li>
                    </ul>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 mb-8">
                    <h3 className="text-xl mb-4 text-pink-600">Resources</h3>
                    <ul className="space-y-3 text-left md:text-center">
                        <li><Link to="#" className="hover:text-pink-600 transition-colors duration-300">Safety Guidelines</Link></li>
                        <li><Link to="#" className="hover:text-pink-600 transition-colors duration-300">Travel Insurance</Link></li>
                        <li><Link to="#" className="hover:text-pink-600 transition-colors duration-300">Packing Tips</Link></li>
                        <li><Link to="#" className="hover:text-pink-600 transition-colors duration-300">Solo Travel Guide</Link></li>
                        <li><Link to="#" className="hover:text-pink-600 transition-colors duration-300">FAQs</Link></li>
                    </ul>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 mb-8">
                    <h3 className="text-xl mb-4 text-pink-600">Contact Us</h3>
                    <p className="mb-2">Email: <Link to="mailto:hello@chalosaheli.com" className="hover:text-pink-600 transition-colors duration-300">hello@chalosaheli.com</Link></p>
                    <p className="mb-2">Instagram: <Link to="https://www.instagram.com/chalo.saheli/" className="hover:text-pink-600 transition-colors duration-300">@Chalo.Saheli</Link></p>
                    <p>Based in Delhi, India</p>
                    <Link to="/contact" className="inline-block mt-4 px-4 py-2 bg-pink-600 rounded-full hover:bg-pink-700 transition-colors duration-300">Contact Page</Link>
                </div>
            </div>
            <div className="text-gray-400 text-sm mt-12">
                &copy; 2025 Chalo Saheli. All Rights Reserved.
            </div>
        </footer>
    );
}
export default Footer;