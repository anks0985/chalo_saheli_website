import React from 'react';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-12 px-5 md:px-12 text-center" id="contact">
            <div className="flex flex-wrap justify-between max-w-6xl mx-auto">
                <div className="w-full md:w-1/2 lg:w-1/4 mb-8">
                    <h3 className="text-xl mb-4 text-pink-600">Chalo Saheli</h3>
                    <p className="mb-6">Where her 'maybe someday' becomes 'hell yes, today!'</p>
                    <div className="flex justify-center space-x-4">
                        <a href="#" className="w-10 h-10 bg-white rounded-full flex justify-center items-center transition-all duration-300 hover:bg-pink-600 hover:-translate-y-1">
                            <Instagram size={20} className="text-gray-800" />
                        </a>
                        <a href="#" className="w-10 h-10 bg-white rounded-full flex justify-center items-center transition-all duration-300 hover:bg-pink-600 hover:-translate-y-1">
                            <Facebook size={20} className="text-gray-800" />
                        </a>
                        <a href="#" className="w-10 h-10 bg-white rounded-full flex justify-center items-center transition-all duration-300 hover:bg-pink-600 hover:-translate-y-1">
                            <Twitter size={20} className="text-gray-800" />
                        </a>
                        <a href="#" className="w-10 h-10 bg-white rounded-full flex justify-center items-center transition-all duration-300 hover:bg-pink-600 hover:-translate-y-1">
                            <Youtube size={20} className="text-gray-800" />
                        </a>
                    </div>
                </div>

                <div className="w-full md:w-1/2 lg:w-1/4 mb-8">
                    <h3 className="text-xl mb-4 text-pink-600">Quick Links</h3>
                    <ul className="space-y-3 text-left md:text-center">
                        <li><a href="#about" className="hover:text-pink-600 transition-colors duration-300">About Us</a></li>
                        <li><a href="#destinations" className="hover:text-pink-600 transition-colors duration-300">Destinations</a></li>
                        <li><a href="#community" className="hover:text-pink-600 transition-colors duration-300">Community</a></li>
                        <li><a href="#safety" className="hover:text-pink-600 transition-colors duration-300">Safety</a></li>
                        <li><a href="#stories" className="hover:text-pink-600 transition-colors duration-300">Stories</a></li>
                    </ul>
                </div>

                <div className="w-full md:w-1/2 lg:w-1/4 mb-8">
                    <h3 className="text-xl mb-4 text-pink-600">Resources</h3>
                    <ul className="space-y-3 text-left md:text-center">
                        <li><a href="#" className="hover:text-pink-600 transition-colors duration-300">Safety Guidelines</a></li>
                        <li><a href="#" className="hover:text-pink-600 transition-colors duration-300">Travel Insurance</a></li>
                        <li><a href="#" className="hover:text-pink-600 transition-colors duration-300">Packing Tips</a></li>
                        <li><a href="#" className="hover:text-pink-600 transition-colors duration-300">Solo Travel Guide</a></li>
                        <li><a href="#" className="hover:text-pink-600 transition-colors duration-300">FAQs</a></li>
                    </ul>
                </div>

                <div className="w-full md:w-1/2 lg:w-1/4 mb-8">
                    <h3 className="text-xl mb-4 text-pink-600">Contact Us</h3>
                    <p className="mb-2">Email: hello@chalosaheli.com</p>
                    <p className="mb-2">Instagram: @Chalo.Saheli</p>
                    <p>Based in Delhi, India</p>
                </div>
            </div>

            <div className="text-gray-400 text-sm mt-12">
                &copy; 2025 Chalo Saheli. All Rights Reserved.
            </div>
        </footer>
    );
}

export default Footer;