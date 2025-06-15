import { useEffect } from "react";

export function useScrollToIndex(
  scrollToIndex,
  itemRefs,
  offsetCorrection = 68
) {
  useEffect(() => {
    if (scrollToIndex != null && itemRefs.current[scrollToIndex]) {
      const el = itemRefs.current[scrollToIndex];

      const elementTop = el.getBoundingClientRect().top;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      window.scrollTo({
        top: elementTop + scrollTop - offsetCorrection,
        behavior: "smooth",
      });
    }
  }, [scrollToIndex, itemRefs, offsetCorrection]);
}
