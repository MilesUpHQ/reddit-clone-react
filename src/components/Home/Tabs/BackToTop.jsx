import React, { useState, useEffect } from 'react';
import '../../../css/Community.css'

function BackToTop({profile}) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      setShowButton(window.scrollY > 200);
    });
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {showButton && (
        <button className={`btn-backtotop ${profile&&'new'}`} onClick={handleClick}>
          Back to Top
        </button>
      )}
    </>
  );
}

export default BackToTop;
