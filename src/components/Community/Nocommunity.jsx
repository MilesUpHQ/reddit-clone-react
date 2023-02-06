import React from "react";
import no_community from '../../images/no_community.jpg';
import { Link } from "react-router-dom";
const Nocommunity = () => {
    return (
        <div style={{ backgroundColor: "lightgray", display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <div className="text-center">
                <img src={`${no_community}`} height="100px" width="100px" alt="error" style={{ borderRadius: "50%" }} />
                <p className="fs-3">
                    <span className="text-danger">Sorry </span> There aren’t any communities on Reddit with that name.
                </p>
                <p className="lead">This community may have been banned or the community name is incorrect.</p>
                <Link to="/" className="btn btn-primary">
                    Go Home
                </Link>
                <div style={{ fontSize: "12px", textAlign: "center", marginTop: "20px" }}>
                    Use of this site constitutes acceptance of our User Agreement and Privacy Policy.
                    <br />
                    ©2023 reddit inc. All rights reserved.
                    <br />
                    REDDIT and the ALIEN Logo are registered trademarks of reddit inc.
                </div>
            </div>
        </div>
    );
};

export default Nocommunity;