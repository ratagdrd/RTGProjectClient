import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

import * as THREE from "three";

import "../css/Remake.css";

import {
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const loadTexture = (path) => {
  return new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader();
    console.log("loader in promise", loader);
    loader.load(
      path,
      (texture) => {
        console.log("recived texture", texture);
        resolve(texture);
      },
      (event) => {
        console.log("event", event);
      },
      (err) => {
        console.log("error", err);
        reject(err);
      }
    );
  });
};

const HipodromComp = () => {
  const containerRef = useRef(null);
  const [buttonVisible, setButtonVisible] = useState(false);
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const [Instructions, setInstructions] = useState("");

  const handleFinish = () => {
    cleanUpOverlays();
    navigate("/cgroup60/test2/tar3/AllGamesPage");
  };

  const cleanUpOverlays = () => {
    const overlays = document.querySelectorAll(".mindar-ui-overlay");
    overlays.forEach((overlay) => overlay.remove());
  };

  useEffect(() => {
    let mindarThree;
    let rendererCommon;

    async function initAR() {
      //https://localhost:7052/api/Activity/4
      const apiUrl = `https://proj.ruppin.ac.il/cgroup60/test2/tar1/api/Activity/4`;
      // const apiUrl =
      //   window.location.hostname === "localhost" ||
      //   location.hostname === "127.0.0.1"
      //     ? `https://localhost:7052/api/Activity/4`
      //     : `https://proj.ruppin.ac.il/cgroup60/test2/tar1/api/Activity/4`;

      fetch(apiUrl, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        }),
      })
        .then((res) => {
          console.log("res=", res);
          console.log("res.status", res.status);
          console.log("res.ok", res.ok);
          return res.json();
        })
        .then(
          (activity) => {
            console.log("Activity fetch result: ", activity);
            if (activity) {
              console.log("Activity with code 4:", activity);
              const instructions = activity.instruction || "";
              console.log("Instructions:", instructions);
              setInstructions(instructions);
            } else {
              console.log("Activity with code 4 not found.");
            }
          },
          (error) => {
            console.log("Error fetching word data:", error);
          }
        );

      mindarThree = new MindARThree({
        container: containerRef.current,
        imageTargetSrc: "/cgroup60/test2/tar3/target/hipodrom.mind",
      });
      console.log("mind", mindarThree);
      const { scene, camera } = mindarThree;
      rendererCommon = mindarThree.renderer;

      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
      scene.add(light);
      // Use the loadTexture function to load the image as a texture
      const texture = await loadTexture(
        "/cgroup60/test2/tar3/target/remake-hipodrom.jpg"
      );

      const geometry = new THREE.PlaneGeometry(1, 1);

      const material = new THREE.MeshBasicMaterial({ map: texture });

      const plane = new THREE.Mesh(geometry, material);
      plane.rotation.x = -Math.PI / 16;
      plane.position.set(0, 0, 0);

      const anchor = mindarThree.addAnchor(0);
      anchor.group.add(plane);

      await mindarThree.start();

      rendererCommon?.setAnimationLoop(() => {
        rendererCommon.render(scene, camera);
      });

      setButtonVisible(true); //  hide the button after AR is initialized
    }

    initAR();

    return () => {
      rendererCommon.setAnimationLoop(null); // This stops the animation loop when component unmounts
      mindarThree.stop(); // stop and dispose of resources to prevent memory leaks
      cleanUpOverlays();
    };
  }, []);

  const handleInfoClick = () => {
    setShowInfo(!showInfo);
  };
  const handleInfoClose = () => {
    setShowInfo(false);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          top: 30,
          right: 150,
          zIndex: 10,
        }}
      >
        <IconButton onClick={handleInfoClick}>
          <InfoIcon />
        </IconButton>
        <Dialog open={showInfo} onClose={handleInfoClose}>
          <DialogTitle style={{ direction: "rtl", padding: "10px 14px" }}>
            {" "}
            הוראות
          </DialogTitle>
          <DialogContent
            style={{
              direction: "rtl",
              width: "95%",
              padding: "0px 0px 10px",
            }}
          >
            <Typography> {Instructions} </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleInfoClose}
              style={{ direction: "rtl", color: "#004a3a" }}
            >
              סגור
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 5,
        }}
      ></div>
      {buttonVisible && (
        <button className="finish-button" onClick={handleFinish}>
          סיימנו, אפשר להמשיך
        </button>
      )}
    </>
  );
};

export default HipodromComp;
