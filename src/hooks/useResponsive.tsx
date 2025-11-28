import { useState, useEffect } from 'react';

interface Breakpoints {
  mobile: number;
  tablet: number;
}

interface ScreenSize {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
}

const defaultBreakpoints: Breakpoints = {
  mobile: 768,
  tablet: 1024
};

export const useResponsive = (breakpoints: Breakpoints = defaultBreakpoints): ScreenSize => {
  const getScreenSize = (): ScreenSize => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        width: 1024,
        height: 768
      };
    }

    const width = window.innerWidth;
    return {
      isMobile: width < breakpoints.mobile,
      isTablet: width >= breakpoints.mobile && width < breakpoints.tablet,
      isDesktop: width >= breakpoints.tablet,
      width: window.innerWidth,
      height: window.innerHeight
    };
  };

  const [screenSize, setScreenSize] = useState<ScreenSize>(getScreenSize);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: number;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScreenSize(getScreenSize());
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakpoints.mobile, breakpoints.tablet]);

  return screenSize;
};