import React, { useState, useEffect } from "react";
import { getPeersStatus } from "../../lib/api-dashboard";

import Card from "../UI/Card/Card";

import classes from "./Chart.module.css";

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
      <div className={classes.peer}>
        <span>
          피어 {index}({peer ? peer : `피어${index}`}):{" "}
        </span>
        <span className={status === "OK" ? classes.online : classes.offline}>●</span>
      </div>
    );
  };

  return (
    <div className={classes.status}>
      {peerStatus.map((item, index) => (
        <Status key={item.peer} {...item} index={index}></Status>
      ))}
    </div>
  );
};

export default PeerStatus;
