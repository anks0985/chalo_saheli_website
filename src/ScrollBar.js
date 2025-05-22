import { useState, useEffect, useRef } from 'react';
const CustomRoadScrollbar = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const roadRef = useRef(null);
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
    const handleRoadClick = (e) => {
        if (isDragging) return;
        const road = roadRef.current;
        const roadRect = road.getBoundingClientRect();
        const clickPositionRatio = (e.clientX - roadRect.left) / roadRect.width;
        const newScrollPosition = clickPositionRatio * maxScroll;
        window.scrollTo({
            top: newScrollPosition,
            behavior: 'smooth'
        });
    };
    const handleRoadMouseDown = (e) => {
        e.preventDefault();
        const road = roadRef.current;
        const roadRect = road.getBoundingClientRect();
        const mousePositionRatio = (e.clientX - roadRect.left) / roadRect.width;
        const clampedRatio = Math.max(0, Math.min(1, mousePositionRatio));
        const newScrollPosition = clampedRatio * maxScroll;
        window.scrollTo({
            top: newScrollPosition,
            behavior: 'smooth'
        });
        setTimeout(() => {
            setIsDragging(true);
        }, 50);
    };
    const handleBusMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };
    const handleMouseMove = (e) => {
        if (!isDragging || !roadRef.current) return;
        const road = roadRef.current;
        const roadRect = road.getBoundingClientRect();
        const mousePositionRatio = (e.clientX - roadRect.left) / roadRect.width;
        const clampedRatio = Math.max(0, Math.min(1, mousePositionRatio));
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
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = '';
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
                onClick={handleRoadClick}
                onMouseDown={handleRoadMouseDown}
            >
                <div
                    className="w-full h-10"
                    style={{
                        backgroundImage: 'url(/assets/images/road.png)',
                        backgroundRepeat: 'repeat-x',
                        backgroundSize: 'auto 100%',
                        backgroundPosition: 'left center'
                    }}
                />
                <div
                    className={`absolute top- -translate-y-1/2 w-22 h-20 ${isDragging ? 'transition-none' : 'transition-all duration-100 ease-out'}`}
                    style={{
                        left: `${busPosition}vw`,
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
            <CustomRoadScrollbar />
        </div>
    );
};
export default ScrollbarWrapper;