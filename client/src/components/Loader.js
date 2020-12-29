import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div>
      <Spinner animation="border" role="status" variant="success" style={{
           position: "absolute",
           height: "100px",
           width: "100px",
           top: "50%",
           left: "50%",
           marginLeft: "-50px",
           marginTop: "-50px",
           backgroundSize: "100%"
      }} />
    </div>
  );
};

export default Loader;
