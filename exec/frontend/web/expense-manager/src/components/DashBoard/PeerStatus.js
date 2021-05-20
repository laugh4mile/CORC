import React, { useState, useEffect } from "react";
import { getPeersStatus } from "../../lib/api-dashboard";
const axios = require("axios").default;
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

const PeerStatus = () => {
  const [peerStatus, setPeerStatus] = useState([]);

  useEffect(() => {
    getPeersStatus()
      .then((data) => {
        setPeerStatus(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const Status = ({ peer, status, index }) => {
    return (
      <span style={{ margin: "0 10px" }}>
        피어{index}({peer ? peer : `피어${index}`}): {status == "OK" ? "Online" : "Offline"}
      </span>
    );
  };

  return (
    <div>
      {peerStatus.map((item, index) => (
        <Status {...item} index={index}></Status>
      ))}
    </div>
  );
};

export default PeerStatus;
