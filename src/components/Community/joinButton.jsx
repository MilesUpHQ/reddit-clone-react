import React, { useState } from "react";

function JoinButton() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <button className="create-post join-btn"
      onMouseEnter={() => setIsClicked(false)}
      onMouseLeave={() => setIsClicked(false)}
      onClick={() => setIsClicked(!isClicked)}
    >
      {isClicked ? "Leave" : "Join"}
    </button>
  );
}

export default JoinButton