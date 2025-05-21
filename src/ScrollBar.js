import React, { useState, useEffect } from 'react';
const CustomRoadScrollbar = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    useEffect(() => {
        const updateScrollDimensions = () => {
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            setMaxScroll(documentHeight - windowHeight);
        };
        const handleScroll = () => {
            const currentPosition = window.pageYOffset;
            setScrollPosition(currentPosition);
        };
        updateScrollDimensions();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', updateScrollDimensions);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateScrollDimensions);
        };
    }, []);
    const handleRoadClick = (e) => {
        const road = e.currentTarget;
        const roadRect = road.getBoundingClientRect();
        const clickPositionRatio = (e.clientY - roadRect.top) / roadRect.height;
        const newScrollPosition = clickPositionRatio * maxScroll;
        window.scrollTo({
            top: newScrollPosition,
            behavior: 'smooth'
        });
    };
    const busHeightPercent = 20;
    const roadHeight = 100 - busHeightPercent;
    const busPosition = maxScroll > 0
        ? (scrollPosition / maxScroll) * roadHeight
        : 0;
    return (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 select-none">
            <div
                className="h-screen relative cursor-pointer flex justify-center"
                onClick={handleRoadClick}
            >
                <div className="relative h-full w-10">
                    <img
                        src="/assets/images/road.png"
                        alt="Road"
                        className="h-full object-cover object-center"
                    />
                </div>
                <div
                    className="absolute left-1/5 -translate-x-1/2 w-20 transition-all duration-100 ease-out"
                    style={{
                        top: `${busPosition}vh`,
                        height: '20vh',
                    }}
                >
                    <img
                        src="/assets/images/bus.png"
                        alt="Bus"
                        className="w-full h-full object-contain"
                        style={{
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                        }}
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
                <style jsx global>{`
                    html, body {
                        scrollbar-width: none;
                        -ms-overflow-style: none;
                    }
                    
                    body::-webkit-scrollbar {
                        width: 0;
                        height: 0;
                        display: none;
                    }
                `}</style>
                {children}
            </div>
            <CustomRoadScrollbar />
        </div>
    );
};
export default ScrollbarWrapper;