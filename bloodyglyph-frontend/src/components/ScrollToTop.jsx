import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//componente che serve per fare in modo che ad ogni cambio route, la pagina carichi dall'alto
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
