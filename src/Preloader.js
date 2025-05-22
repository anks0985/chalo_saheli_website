import { useEffect, useState, useRef } from 'react';
const EnhancedBusPreloader = () => {
    const [fadeOut, setFadeOut] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [showLogo, setShowLogo] = useState(false);
    const [showText, setShowText] = useState(false);
    const [showBusAnimation, setShowBusAnimation] = useState(false);
    const [showSparkles, setShowSparkles] = useState(false);
    const [busAngle, setBusAngle] = useState(0);
    const radius = 50;
    const containerRef = useRef(null);
    useEffect(() => {
        if (typeof document !== 'undefined' && !document.getElementById('preloader-animations')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'preloader-animations';
            styleSheet.innerHTML = `
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
                @keyframes bus-bounce {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-3px); }
                }
                .ring-rotate {
                    animation: ring-rotate 10s linear infinite;
                }
                .sparkle {
                    position: absolute;
                    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(209,74,97,0.3) 60%, rgba(255,255,255,0) 70%);
                    border-radius: 50%;
                    z-index: 5;
                    pointer-events: none;
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
        }, 3000);
        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);
    useEffect(() => {
        if (!showBusAnimation) return;
        const animationInterval = setInterval(() => {
            setBusAngle(prev => (prev + 2) % 360);
        }, 50);
        return () => clearInterval(animationInterval);
    }, [showBusAnimation]);
    const getBusPosition = () => {
        const angleInRadians = ((busAngle - 135) * Math.PI) / 180;
        const busRadius = radius + 45;
        const x = Math.cos(angleInRadians) * busRadius;
        const y = Math.sin(angleInRadians) * busRadius;
        return { x, y };
    };
    const busPos = getBusPosition();

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
                    <div
                        className="relative"
                        style={{ width: `${radius * 2 + 60}px`, height: `${radius * 2 + 60}px` }}
                    >
                        <div
                            className="absolute"
                            style={{
                                width: `${radius * 2}px`,
                                height: `${radius * 2}px`,
                                left: '30px',
                                top: '30px'
                            }}
                        >
                            {showBusAnimation}
                        </div>
                        <div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                        >
                            <div
                                className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-pink-500 p-1 bg-white"
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
                            </div>
                        </div>
                        {showBusAnimation && (
                            <div
                                className="absolute w-24 h-10 z-20"
                                style={{
                                    left: `${busPos.x + radius + 30}px`,
                                    top: `${busPos.y + radius + 30}px`,
                                    transform: `translate(-50%, -50%) rotate(${busAngle - 45}deg)`,
                                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                                }}
                            >
                                <img
                                    src="/assets/images/bus.png"
                                    alt="Bus"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className="flex flex-col items-center overflow-hidden mb-4"
                    style={{ opacity: showText ? 1 : 0 }}
                >
                    <h2
                        className="text-xl font-serif font-bold text-pink-800 mb-1"
                        style={{
                            animation: showText ? 'text-reveal 0.8s forwards ease-out' : 'none',
                            opacity: showText ? 1 : 0
                        }}
                    >
                        Chalo Saheli
                    </h2>
                    <p
                        className="text-pink-600 font-medium text-center px-4 mb-4 text-sm"
                        style={{
                            animation: showText ? 'text-reveal 0.8s forwards ease-out 0.2s' : 'none',
                            opacity: showText ? 1 : 0
                        }}
                    >
                        Where her 'maybe someday' becomes 'hell yes, today!'
                    </p>
                </div>
                <div
                    className={`transition-all duration-500 ${showBusAnimation ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}
                >
                    <div className="w-72 h-1 bg-pink-100 rounded-full overflow-hidden">
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