import { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './swipe.css';
import { cards } from './Cards';

interface SwipeProps {
  updateActive: (index: number) => void;
  onCardClick?: (card: (typeof cards)[0]) => void; // New prop for handling card clicks
}

const CarouselPage: React.FC<SwipeProps> = ({ updateActive, onCardClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const numCards = cards.length;

  // Refs for swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const SWIPE_THRESHOLD = 50;

  // Refs for hover timeout
  const hoverTimeoutRef = useRef<number | null>(null);
  const HOVER_DELAY_MS = 1000;

  useEffect(() => {
    updateActive(activeIndex);
  }, [activeIndex, updateActive]);

  const updateActiveIndex = (newIndex: number) => {
    setActiveIndex(newIndex);
  };

  const handlePrev = () => {
    updateActiveIndex((activeIndex - 1 + numCards) % numCards);
  };

  const handleNext = () => {
    updateActiveIndex((activeIndex + 1) % numCards);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleMouseEnterCard = (idx: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = window.setTimeout(() => {
      if (idx !== activeIndex) updateActiveIndex(idx);
    }, HOVER_DELAY_MS);
  };

  const handleMouseLeaveCard = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const CARD_WIDTH = 200;
  const CARD_HEIGHT = 180;
  const FAN_OFFSET_X = 100;
  const FAN_OFFSET_Z = -10;
  const FAN_ROTATION = 0.5;
  const SCALE_FACTOR = 1;

  const getCardStyle = (idx: number) => {
    let transform = 'translate(-50%, -50%)';
    let opacity = 0.5;
    let zIndex = 1;
    let pointerEvents: 'auto' | 'none' = 'none';

    const distance = idx - activeIndex;
    let normalizedDistance = distance;

    if (Math.abs(distance) > numCards / 2) {
      normalizedDistance = distance > 0 ? distance - numCards : distance + numCards;
    }

    const maxVisibleDistance = 10;
    if (Math.abs(normalizedDistance) > maxVisibleDistance) return { display: 'none' };

    const styleMap = {
      0: () => {
        transform += ` translateX(0) translateZ(0) rotateY(0) scale(1)`;
        opacity = 1;
        zIndex = 100;
        pointerEvents = 'auto';
      },
      1: () => {
        transform += ` translateX(${FAN_OFFSET_X}px) translateZ(${FAN_OFFSET_Z}px) rotateY(-${FAN_ROTATION}deg) scale(${SCALE_FACTOR})`;
        opacity = 0.9;
        zIndex = 99;
        pointerEvents = 'auto';
      },
      "-1": () => {
        transform += ` translateX(-${FAN_OFFSET_X}px) translateZ(${FAN_OFFSET_Z}px) rotateY(${FAN_ROTATION}deg) scale(${SCALE_FACTOR})`;
        opacity = 0.8;
        zIndex = 99;
        pointerEvents = 'auto';
      },
      2: () => {
        transform += ` translateX(${FAN_OFFSET_X * 1.8}px) translateZ(${FAN_OFFSET_Z * 1.5}px) rotateY(-${FAN_ROTATION * 1.5}deg) scale(${SCALE_FACTOR * 0.9})`;
        opacity = 0.8;
        zIndex = 89;
      },
      "-2": () => {
        transform += ` translateX(-${FAN_OFFSET_X * 1.8}px) translateZ(${FAN_OFFSET_Z * 1.5}px) rotateY(${FAN_ROTATION * 1.5}deg) scale(${SCALE_FACTOR * 0.9})`;
        opacity = 0.8;
        zIndex = 99;
      },
      3: () => {
        transform += ` translateX(${FAN_OFFSET_X * 2.5}px) translateZ(${FAN_OFFSET_Z * 2}px) rotateY(-${FAN_ROTATION * 2}deg) scale(${SCALE_FACTOR * 0.8})`;
        opacity = 0.7;
        zIndex = 99;
      },
      "-3": () => {
        transform += ` translateX(-${FAN_OFFSET_X * 2.5}px) translateZ(${FAN_OFFSET_Z * 2}px) rotateY(${FAN_ROTATION * 2}deg) scale(${SCALE_FACTOR * 0.8})`;
        opacity = 0.7;
        zIndex = 99;
      }
    };

    const styleFn = styleMap[normalizedDistance as keyof typeof styleMap];
    if (styleFn) styleFn();

    return {
      transform,
      opacity,
      zIndex,
      transition: 'all 0.6s ease',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: `${CARD_WIDTH}px`,
      height: `${CARD_HEIGHT}px`,
      cursor: 'pointer',
      transformOrigin: 'center center',
      pointerEvents,
      backfaceVisibility: 'hidden',
    };
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          height: '600px',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          perspective: '1500px',
          overflow: 'hidden',
          touchAction: 'pan-y',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {cards.map((card, idx) => (
            <div
              key={card.id}
              style={{
                ...getCardStyle(idx),
                borderRadius: '0.5rem',
                boxShadow: '0 1rem 3rem rgba(0,0,0,0.5)',
                color: 'white',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${card.image})`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1rem',
                boxSizing: 'border-box',
                borderWidth: 12,
                borderColor: 'black',
                height: idx === activeIndex ? 200 : 180,
              }}
              onClick={(e) => {
                if (idx !== activeIndex) {
                  updateActiveIndex(idx);
                }
                if (onCardClick) {
                  onCardClick(card); // Trigger the card click event
                }
                e.stopPropagation();
              }}
              onMouseEnter={() => handleMouseEnterCard(idx)}
              onMouseLeave={handleMouseLeaveCard}
            >
              <div
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '0 0 0.5rem 0.5rem',
                }}
              >
                <h6>{card.title}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselPage;
