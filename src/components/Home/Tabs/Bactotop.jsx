import React, { useState, useEffect } from 'react';
import '../../../css/Community.css'

function BackToTop() {
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
          <button className="btn-primary join-btn" style={{ position: 'fixed', width: '200px', bottom: '20px', right: '200px' }} onClick={handleClick}>
          Back to Top
        </button>
      )}
    </>
  );
}

export default BackToTop;
