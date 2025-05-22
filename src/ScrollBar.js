import { useState, useEffect, useRef } from 'react';
const AnimatedRoadScrollbar = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const roadRef = useRef(null);
    const roadBackgroundRef = useRef(null);
    useEffect(() => {
        if (typeof document !== 'undefined' && !document.getElementById('road-animations')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'road-animations';
            styleSheet.innerHTML = `
                @keyframes road-moving-slow {
                    0% { background-position-x: 0px; }
                    100% { background-position-x: -200px; }
                }
                
                @keyframes road-moving-fast {
                    0% { background-position-x: 0px; }
                    100% { background-position-x: -200px; }
                }
                
                .road-animate-slow {
                    animation: road-moving-slow 4s linear infinite;
                }
                
                .road-animate-fast {
                    animation: road-moving-fast 1s linear infinite;
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }, []);
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        const updateScrollDimensions = () => {
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            setMaxScroll(documentHeight - windowHeight);
        };
        const handleScroll = () => {
            if (!isDragging) {
                const currentPosition = window.pageYOffset;
                setScrollPosition(currentPosition);
            }
        };
        checkMobile();
        updateScrollDimensions();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', () => {
            updateScrollDimensions();
            checkMobile();
        });
        const observer = new MutationObserver(updateScrollDimensions);
        const storiesElement = document.getElementById("stories");
        if (storiesElement) {
            observer.observe(storiesElement, {
                childList: true,
                subtree: true,
                attributes: true
            });
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateScrollDimensions);
            if (storiesElement) observer.disconnect();
        };
    }, [isDragging]);
    const getClickPosition = (e) => {
        const road = roadRef.current;
        if (!road) return 0;
        const roadRect = road.getBoundingClientRect();
        return (e.clientX - roadRect.left) / roadRect.width;
    };
    const handleRoadInteraction = (e) => {
        if (e.target.closest('.bus-container')) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const clickPositionRatio = getClickPosition(e);
        const clampedRatio = Math.max(0, Math.min(1, clickPositionRatio));
        const newScrollPosition = clampedRatio * maxScroll;
        
        window.scrollTo({
            top: newScrollPosition,
            behavior: 'smooth'
        });
    };
    const handleBusMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };
    const handleMouseMove = (e) => {
        if (!isDragging || !roadRef.current) return;
        
        const clickPositionRatio = getClickPosition(e);
        const clampedRatio = Math.max(0, Math.min(1, clickPositionRatio));
        const newScrollPosition = clampedRatio * maxScroll;
        
        setScrollPosition(newScrollPosition);
        window.scrollTo({
            top: newScrollPosition,
            behavior: 'auto'
        });
    };
    const handleMouseUp = () => {
        setIsDragging(false);
    };
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = 'none';
            document.body.style.cursor = 'grabbing';
        } else {
            document.body.style.cursor = '';
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        };
    }, [isDragging, maxScroll]);
    const busWidthPercent = 8;
    const roadWidth = 100 - busWidthPercent;
    const busPosition = maxScroll > 0
        ? (scrollPosition / maxScroll) * roadWidth
        : 0;
    if (isMobile) {
        return null;
    }
    return (
        <div className="fixed bottom-0 left-0 w-full z-50 select-none">
            <div
                ref={roadRef}
                className="w-full h-10 relative cursor-pointer flex items-center"
                onClick={handleRoadInteraction}
            >
                <div
                    ref={roadBackgroundRef}
                    className='absolute inset-0 w-full h-10 road-animate-slow pointer-events-none'
                    style={{
                        backgroundImage: 'url(/assets/images/road.png)',
                        backgroundRepeat: 'repeat-x',
                        backgroundSize: '100px 100%',
                        backgroundPosition: 'left center'
                    }}
                />
                
                <div
                    className={`bus-container absolute top- -translate-y-1/2 w-22 h-20 z-10 ${isDragging ? 'transition-none' : 'transition-all duration-100 ease-out'}`}
                    style={{
                        left: `${busPosition}%`,
                        transform: 'translateY(-50%)'
                    }}
                >
                    <img
                        src="/assets/images/bus.png"
                        alt="Bus"
                        className={`w-full h-full object-contain ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                        style={{
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                        }}
                        onMouseDown={handleBusMouseDown}
                        draggable={false}
                    />
                </div>
            </div>
        </div>
    );
};
const ScrollbarWrapper = ({ children }) => {
    return (
        <div className="relative">
            <div className="scroll-container">
                {children}
            </div>
            <AnimatedRoadScrollbar />
        </div>
    );
};
export default ScrollbarWrapper;