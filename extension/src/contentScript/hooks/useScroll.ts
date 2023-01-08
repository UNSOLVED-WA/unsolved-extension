import { useState, useEffect, useRef } from 'react';
import throttle from 'lodash/throttle';
import { ScrollDirection } from '../types';

export const useScroll = () => {
  const containerElementRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('down');

  useEffect(() => {
    let lastScrollTop = 0;
    const containerElement = containerElementRef.current;
    if (containerElement === null || containerElementRef.current === null) return;
    function handleScroll() {
      const scrollTop = containerElement.scrollTop;
      if (scrollTop > lastScrollTop || scrollTop > 30) {
        setScrollDirection('up');
      } else {
        setScrollDirection('down');
      }
      lastScrollTop = scrollTop;
    }
    containerElement.addEventListener('scroll', throttle(handleScroll, 100));
    return () => {
      containerElement.removeEventListener('scroll', throttle(handleScroll, 100));
    };
  }, []);

  return { scrollDirection, containerElementRef };
};
