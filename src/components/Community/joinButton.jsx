import React, { useState } from "react";

function MyButton() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsClicked(false)}
      onMouseLeave={() => setIsClicked(false)}
      onClick={() => setIsClicked(!isClicked)}
    >
      {isClicked ? "Leave" : "Join"}
    </button>
  );
}

export default MyButton