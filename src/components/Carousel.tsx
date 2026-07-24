import React, { useRef, useState } from 'react';

interface CarouselProps {
  children: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    document.body.style.cursor = 'grabbing';
    scrollRef.current.dataset.dragged = 'false';
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault(); // Prevent native drag/selection
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    
    if (Math.abs(x - startX) > 5) {
      scrollRef.current.dataset.dragged = 'true';
    }
    
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    document.body.style.cursor = '';
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (scrollRef.current?.dataset.dragged === 'true') {
      e.stopPropagation();
      e.preventDefault();
      scrollRef.current.dataset.dragged = 'false';
    }
  };

  return (
    <div 
      style={{
        width: '100%',
        padding: '20px 0', // Reduced padding to allow taller product cards
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexGrow: 1,
        overflow: 'hidden'
      }}
    >
      <div 
        ref={scrollRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onClickCapture={handleClickCapture}
        className="hide-scrollbar mobile-carousel-padding"
        style={{
          display: 'flex',
          gap: '24px',
          padding: '0 48px', // match nav padding
          cursor: isDragging ? 'grabbing' : 'grab',
          overflowX: 'auto',
          scrollBehavior: isDragging ? 'auto' : 'smooth', // smooth when snapping/clicking, instant when dragging
          WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Carousel;
