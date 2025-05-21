import React, { useState, useEffect, useRef } from 'react';
import response from './posts.json';

const InstagramCarousel = () => {
    const carouselRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchInstagramPosts = async () => {
            try {
                if (!response || !response.instagramPosts || !Array.isArray(response.instagramPosts)) {
                    console.error("Invalid Instagram posts data structure");
                    setIsLoading(false);
                    return;
                }
                setPosts(response.instagramPosts);
                setIsLoading(false);
            } catch (error) {
                console.error("Instagram carousel error:", error);
                setIsLoading(false);
            }
        };
        fetchInstagramPosts();
    }, []);
    useEffect(() => {
        if (!posts.length) return;
        if (window.instgrm) {
            window.instgrm.Embeds.process();
        }
    }, [posts]);
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
    return (
        <section className="py-20 px-5 text-center bg-amber-500 text-white" id="stories">
            <h2 className="text-4xl mb-3">Join Our Instagram Community</h2>
            <p className="text-base mb-8 max-w-xl mx-auto">Follow @Chalo.Saheli for daily inspiration and travel stories</p>
            <div className="relative">
                <div className="carousel-wrapper overflow-x-auto overflow-y-hidden scroll-smooth pb-3 no-scrollbar">
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <div className="loading-indicator">Loading Instagram posts...</div>
                        </div>
                    ) : (
                        <div className="flex gap-5 w-max px-3" id="instagram-carousel" ref={carouselRef}>
                            {posts.map((url, index) => (
                                <div
                                    key={index}
                                    data-post-index={index}
                                    className="instagram-post bg-white rounded-lg p-3 shadow-md transition-transform duration-300 hover:scale-105"
                                >
                                    <div className="cursor-pointer">
                                        <blockquote
                                            className="instagram-media"
                                            data-instgrm-permalink={url}
                                            data-instgrm-version="14"
                                            style={{
                                                background: "black",
                                                border: "0",
                                                borderRadius: "3px",
                                                boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                                                margin: "1px",
                                                maxWidth: "540px",
                                                minWidth: "326px",
                                                padding: "0",
                                                width: "99.375%"
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </section>
    );
};

export default InstagramCarousel;