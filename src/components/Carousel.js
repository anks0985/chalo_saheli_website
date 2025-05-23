import { useState, useEffect, useRef } from 'react';
import { Instagram } from 'lucide-react';
const InstagramFeed = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const scrollContainerRef = useRef(null);
    useEffect(() => {
        const fetchInstagramPosts = async () => {
            try {
                let responseData = await fetch("https://script.google.com/macros/s/AKfycbzTal5tagxh0WHY1lik4DBC4mQ_wVNSxQXCKnDVtRg24zoEqhtMbd9Vffx5IiIY1sKg/exec");
                let response = await responseData.json();
                if (!response || !Array.isArray(response)) {
                    console.error("Invalid Instagram posts data structure");
                    setIsLoading(false);
                    return;
                }
                setPosts(response);
                setIsLoading(false);
            } catch (error) {
                console.error("Instagram feed error:", error);
                setIsLoading(false);
            }
        };
        fetchInstagramPosts();
    }, []);
    useEffect(() => {
        if (!posts.length) return;
        const loadInstagramScript = () => {
            return new Promise((resolve) => {
                const existingScript = document.getElementById('instagram-embed-script');
                if (existingScript) {
                    existingScript.remove();
                }
                const igScript = document.createElement('script');
                igScript.id = 'instagram-embed-script';
                igScript.src = "https://www.instagram.com/embed.js";
                igScript.async = true;
                igScript.defer = true;
                document.body.appendChild(igScript);
                igScript.onload = () => {
                    if (window.instgrm) {
                        window.instgrm.Embeds.process();
                    }
                    resolve();
                };
            });
        };
        loadInstagramScript();
    }, [posts]);
    useEffect(() => {
        if (!posts.length || !scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        let scrollInterval;
        const startAutoScroll = () => {
            scrollInterval = setInterval(() => {
                const maxScrollLeft = container.scrollWidth - container.clientWidth;
                if (container.scrollLeft >= maxScrollLeft) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: 320, behavior: 'smooth' });
                }
            }, 3000);
        };
        const stopAutoScroll = () => {
            if (scrollInterval) {
                clearInterval(scrollInterval);
            }
        };
        const timer = setTimeout(() => {
            startAutoScroll();
        }, 2000);
        container.addEventListener('mouseenter', stopAutoScroll);
        container.addEventListener('mouseleave', startAutoScroll);
        container.addEventListener('touchstart', stopAutoScroll);
        container.addEventListener('touchend', () => {
            setTimeout(startAutoScroll, 3000);
        });
        return () => {
            clearTimeout(timer);
            stopAutoScroll();
            container.removeEventListener('mouseenter', stopAutoScroll);
            container.removeEventListener('mouseleave', startAutoScroll);
            container.removeEventListener('touchstart', stopAutoScroll);
            container.removeEventListener('touchend', startAutoScroll);
        };
    }, [posts]);
    return (
        <section id="stories" className="py-16 relative bg-gradient-to-b from-purple-200 to-pink-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center mb-10">
                    <Instagram className="text-pink-500 mr-3" size={30} />
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
                        Explore Our Adventures
                    </h2>
                </div>
                <p className="text-lg text-center text-gray-700 mb-10 max-w-lg mx-auto">
                    Join <span className="font-semibold text-pink-500">@Chalo.Saheli</span> for daily wanderlust and authentic travel experiences from women explorers around the world
                </p>
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full border-4 border-pink-200 border-t-pink-500 animate-spin mb-4"></div>
                            <p className="text-gray-600">Loading amazing content...</p>
                        </div>
                    </div>
                ) : (
                    <div className="relative h-[650px] overflow-hidden">
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-6 overflow-x-auto py-4 px-6 snap-x scrollbar-hide scroll-smooth"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {posts.map((url, index) => (
                                <div
                                    key={index}
                                    className=""
                                >
                                    <div className="instagram-embed-container">
                                        <blockquote
                                            className="instagram-media"
                                            data-instgrm-permalink={url}
                                            data-instgrm-version="14"
                                            style={{
                                                background: "#FFF",
                                                border: "0",
                                                borderRadius: "0",
                                                boxShadow: "none",
                                                margin: "0",
                                                padding: "0",
                                                width: "100%"
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="flex justify-center mt-8">
                    <a
                        href="https://www.instagram.com/chalo.saheli/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300"
                    >
                        <Instagram size={20} className="mr-2" />
                        Follow Us on Instagram
                    </a>
                </div>
            </div>
        </section>
    );
};
export default InstagramFeed;