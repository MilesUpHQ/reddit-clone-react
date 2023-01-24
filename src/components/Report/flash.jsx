import React, { useState } from "react";
import { Alert } from "reactstrap";

const FlashMessage = () => {
  const [flash, setFlash] = useState([]);

  const handleClose = (index) => {
    setFlash(flash.filter((_, i) => i !== index));
  };

  return (
    <>
      {flash.map((msg, index) => (
        <Alert key={index} color="success" toggle={() => handleClose(index)}>
          {msg}
        </Alert>
      ))}
    </>
  );
};

export default FlashMessage;