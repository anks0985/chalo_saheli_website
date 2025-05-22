import { useEffect, useState, useRef } from 'react';

const EnhancedBusPreloader = () => {
    const [fadeOut, setFadeOut] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [showLogo, setShowLogo] = useState(false);
    const [showText, setShowText] = useState(false);
    const [showBusAnimation, setShowBusAnimation] = useState(false);
    const [showSparkles, setShowSparkles] = useState(false);
    const [busPosition, setBusPosition] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        if (typeof document !== 'undefined' && !document.getElementById('preloader-animations')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'preloader-animations';
            styleSheet.innerHTML = `
                @keyframes diamond-rotate {
                    0% { transform: rotate(0deg) scale(0.8); opacity: 0; }
                    20% { opacity: 1; }
                    100% { transform: rotate(360deg) scale(1); opacity: 1; }
                }
                
                @keyframes logo-reveal {
                    0% { transform: scale(0.5); opacity: 0; filter: blur(10px); }
                    50% { transform: scale(1.1); opacity: 0.8; filter: blur(2px); }
                    100% { transform: scale(1); opacity: 1; filter: blur(0); }
                }
                
                @keyframes text-reveal {
                    0% { transform: translateY(20px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                
                @keyframes circle-pulse {
                    0%, 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(209, 74, 97, 0.7); }
                    50% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(209, 74, 97, 0); }
                }
                
                @keyframes ring-rotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes sparkle {
                    0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
                    50% { transform: scale(1) rotate(180deg); opacity: 1; }
                }
                
                @keyframes bus-drive {
                    0% { transform: translateX(-100px) translateY(0px); }
                    25% { transform: translateX(0px) translateY(-2px); }
                    50% { transform: translateX(100px) translateY(0px); }
                    75% { transform: translateX(200px) translateY(-2px); }
                    100% { transform: translateX(300px) translateY(0px); }
                }
                
                @keyframes road-slide {
                    0% { background-position: 0% center; }
                    100% { background-position: -100px center; }
                }
                
                @keyframes bus-bounce {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-3px); }
                }
                
                .ring-rotate {
                    animation: ring-rotate 10s linear infinite;
                }
                
                .diamond {
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    background: linear-gradient(135deg, #ffffff 0%, #ffc0cb 40%, #d14a61 60%, #ffffff 100%);
                    transform-origin: center;
                    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
                }
                
                .sparkle {
                    position: absolute;
                    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(209,74,97,0.3) 60%, rgba(255,255,255,0) 70%);
                    border-radius: 50%;
                    z-index: 5;
                    pointer-events: none;
                }
                
                .road-animated {
                    animation: road-slide 2s linear infinite;
                }
                
                .bus-animated {
                    animation: bus-bounce 0.8s ease-in-out infinite;
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingProgress(prev => {
                const newProgress = prev + Math.random() * 8 + 2;
                return newProgress > 100 ? 100 : newProgress;
            });
        }, 200);

        setTimeout(() => setShowLogo(true), 200);
        setTimeout(() => setShowText(true), 600);
        setTimeout(() => setShowBusAnimation(true), 1000);
        setTimeout(() => setShowSparkles(true), 1400);

        const timer = setTimeout(() => {
            clearInterval(interval);
            setLoadingProgress(100);
            setTimeout(() => setFadeOut(true), 500);
        }, 3500);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (!showBusAnimation) return;
        
        const busInterval = setInterval(() => {
            setBusPosition(prev => {
                const newPos = prev + 2;
                return newPos > 100 ? 0 : newPos;
            });
        }, 50);

        return () => clearInterval(busInterval);
    }, [showBusAnimation]);

    useEffect(() => {
        if (!showSparkles || !containerRef.current) return;

        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();

        const createSparkles = () => {
            if (container.querySelectorAll('.sparkle').length > 8) return;

            const size = Math.random() * 8 + 4;
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;
            sparkle.style.left = `${Math.random() * containerRect.width}px`;
            sparkle.style.top = `${Math.random() * containerRect.height}px`;
            sparkle.style.animation = `sparkle ${Math.random() * 1.5 + 1}s ease-in-out infinite`;
            sparkle.style.animationDelay = `${Math.random() * 1}s`;
            
            container.appendChild(sparkle);

            setTimeout(() => {
                if (sparkle && sparkle.parentNode === container) {
                    sparkle.remove();
                }
            }, 3000);
        };

        for (let i = 0; i < 6; i++) {
            createSparkles();
        }

        const sparkleInterval = setInterval(createSparkles, 400);
        return () => clearInterval(sparkleInterval);
    }, [showSparkles]);

    const renderDiamonds = () => {
        const diamonds = [];
        const total = 4;
        for (let i = 0; i < total; i++) {
            const delay = i * 0.2;
            const size = 8 + (i * 4);
            diamonds.push(
                <div
                    key={i}
                    className="diamond"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        animation: `diamond-rotate 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`,
                        animationDelay: `${delay}s`,
                        opacity: 0
                    }}
                />
            );
        }
        return diamonds;
    };

    return (
        <div
            className={`fixed inset-0 z-50 transition-opacity duration-700 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            style={{
                background: 'radial-gradient(circle, rgba(255,247,247,1) 0%, rgba(255,255,255,1) 100%)'
            }}
        >
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 opacity-10 w-64 h-64 rounded-full border border-pink-300 ring-rotate"></div>
                <div className="absolute bottom-1/4 right-1/3 opacity-10 w-48 h-48 rounded-full border border-pink-300 ring-rotate" style={{ animationDirection: 'reverse', animationDuration: '15s' }}></div>
            </div>

            <div
                ref={containerRef}
                className="flex flex-col items-center justify-center h-full relative"
            >
                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border-2 border-dashed border-pink-200 ring-rotate opacity-50"></div>
                    </div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                        {renderDiamonds()}
                    </div>
                    
                    <div
                        className={`relative w-24 h-24 rounded-full overflow-hidden border-4 border-pink-500 p-1 bg-white transition-all duration-1000 ${showSparkles ? 'shadow-lg shadow-pink-300/40' : ''}`}
                        style={{
                            animation: showSparkles ? 'circle-pulse 2s infinite ease-in-out' : 'none'
                        }}
                    >
                        <img
                            src="/assets/images/logo.png"
                            alt="Chalo Saheli Logo"
                            className="w-full h-full object-cover rounded-full"
                            style={{
                                animation: showLogo ? 'logo-reveal 1s forwards cubic-bezier(0.26, 0.53, 0.74, 1.48)' : 'none',
                                opacity: showLogo ? 1 : 0
                            }}
                        />
                        <div
                            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/30 rounded-full opacity-0 transition-opacity duration-700"
                            style={{ opacity: showLogo ? 0.6 : 0 }}
                        ></div>
                    </div>
                </div>

                <div
                    className="flex flex-col items-center overflow-hidden"
                    style={{ opacity: showText ? 1 : 0 }}
                >
                    <h2
                        className="text-2xl font-serif font-bold text-pink-800 mb-2"
                        style={{
                            animation: showText ? 'text-reveal 0.8s forwards ease-out' : 'none',
                            opacity: showText ? 1 : 0
                        }}
                    >
                        Chalo Saheli
                    </h2>
                    <p
                        className="text-pink-600 font-medium text-center px-4 mb-6"
                        style={{
                            animation: showText ? 'text-reveal 0.8s forwards ease-out 0.2s' : 'none',
                            opacity: showText ? 1 : 0
                        }}
                    >
                        Where her 'maybe someday' becomes 'hell yes, today!'
                    </p>
                </div>

                <div 
                    className={`relative w-80 transition-all duration-500 ${showBusAnimation ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}
                >
                    <div className="relative h-12 w-full rounded-lg shadow-lg">
                        <div
                            className={`w-full h-full ${showBusAnimation ? 'road-animated' : ''}`}
                            style={{
                                backgroundImage: 'url(/assets/images/road.png)',
                                backgroundRepeat: 'repeat-x',
                                backgroundSize: 'auto 100%',
                                backgroundPosition: 'left center'
                            }}
                        />
                        
                        <div
                            className={`absolute -top-1/4 -translate-y-1/2 w-16 h-12 transition-all duration-100 ${showBusAnimation ? 'bus-animated' : ''}`}
                            style={{
                                left: `${busPosition}%`,
                                transform: `translateX(-50%) translateY(-50%) ${showBusAnimation ? '' : 'scale(0.8)'}`,
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                            }}
                        >
                            <img
                                src="/assets/images/bus.png"
                                alt="Bus"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                    
                    <div className="mt-3 w-full h-1 bg-pink-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-pink-300 to-pink-500 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${loadingProgress}%` }}
                        ></div>
                    </div>
                    
                    <div className="text-center mt-2">
                        <span className="text-sm text-pink-600 font-medium">
                            Loading... {Math.round(loadingProgress)}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnhancedBusPreloader;