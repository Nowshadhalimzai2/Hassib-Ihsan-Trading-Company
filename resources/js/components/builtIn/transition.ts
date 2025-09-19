function setupObserver(
  setIsVisible: (value: boolean) => void,
  ref: React.RefObject<HTMLDivElement> | React.RefObject<HTMLImageElement> | null,
  threshold?: number
): void {
  if (!ref?.current) return;

  const intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        intersectionObserver.disconnect(); // Stop observing after first trigger
      }
    },
    { threshold: threshold || 0.1  } // Slight threshold to avoid premature triggering
  );

  intersectionObserver.observe(ref.current);
}

export default setupObserver;


