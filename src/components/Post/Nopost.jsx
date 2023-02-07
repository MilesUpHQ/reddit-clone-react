import React from "react";
import no_post from '../../images/no_post.png';
import { Link } from "react-router-dom";

const Nopost = () => {
    return (
        <div style={{ backgroundColor: "lightgray", display: "flex", alignItems: "center", justifyContent: "center", height: "90vh" }}>
            <div className="text-center">
                <img src={`${no_post}`} height="300px" alt="error" style={{ borderRadius: "50%" }} />
                <p className="fs-3">
                    Somwthing went wrong
                </p>
                <Link to="/" className="join-btn">
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default Nopost;