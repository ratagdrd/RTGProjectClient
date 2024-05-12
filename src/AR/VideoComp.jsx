import React, { useCallback, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
import * as THREE from "three";
import "../css/Video.css";
import FooterGraphic from "../FuncComp/FooterGraphic";

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

const VideoComp = () => {
  const containerRef = useRef(null);
  const rendererCommonRef = useRef(null);
  const mindarThreeRef = useRef(null);
  const videoRef = useRef(null);
  const [buttonVisible, setButtonVisible] = useState(true);

  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const [Instructions, setInstructions] = useState("");

  const cleanupResources = useCallback(() => {
    if (rendererCommonRef.current) {
      rendererCommonRef.current.setAnimationLoop(null);
      rendererCommonRef.current.dispose();
      rendererCommonRef.current = null;
    }
    if (mindarThreeRef.current) {
      mindarThreeRef.current.stop();
      mindarThreeRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = "";
      videoRef.current.load();
      videoRef.current = null;
    }
  }, []);

  const handleFinish = () => {
    cleanupResources();
    navigate("/AllGamesPage");
  };

  const loadVideo = useCallback((path) => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.addEventListener("loadedmetadata", () => {
        video.setAttribute("playsinline", "");
        videoRef.current = video;
        resolve(video);
      });
      video.src = path;
    });
  }, []);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    // Fetch from Activity Data table
    //localhost:7052/api/Activity/7
    https: fetch(
      "https://proj.ruppin.ac.il/cgroup60/test2/tar1/api/Activity/7",
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        }),
      }
    )
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
            console.log("Activity with code 7:", activity);
            const instructions = activity.instruction || "";
            console.log("Instructions:", instructions);
            setInstructions(instructions);
          } else {
            console.log("Activity with code 7 not found.");
          }
          // Process the result as needed
        },
        (error) => {
          console.log("Error fetching activity data:", error);
        }
      );
  };

  const initAR = useCallback(async () => {
    mindarThreeRef.current = new MindARThree({
      container: containerRef.current,
      imageTargetSrc: "/target/herod-palace.mind",
    });

    const { scene, camera } = mindarThreeRef.current;
    rendererCommonRef.current = mindarThreeRef.current.renderer;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const video = await loadVideo("/target/herod-palace.mp4");
    const texture = new THREE.VideoTexture(video);

    const geometry = new THREE.PlaneGeometry(1, 204 / 480);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);

    const anchor = mindarThreeRef.current.addAnchor(0);
    anchor.group.add(plane);

    anchor.onTargetFound = () => video.play();
    anchor.onTargetLost = () => video.pause();
    video.addEventListener("play", () => (video.currentTime = 7.5));

    await mindarThreeRef.current.start();
    rendererCommonRef.current.setAnimationLoop(() => {
      rendererCommonRef.current.render(scene, camera);
    });

    setButtonVisible(false); // Optionally hide the button after AR is initialized
  }, [loadVideo]);

  useEffect(() => {
    return () => cleanupResources(); // Cleanup resources when component unmounts
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
              width: "350px",
              padding: "0px 14px 10px",
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
      />
      {buttonVisible && (
        <>
          <button className="start-button" onClick={initAR}>
            התחל
          </button>
          <FooterGraphic />
        </>
      )}
      {!buttonVisible && (
        <button
          className="finish-button"
          style={{ zIndex: 10 }}
          onClick={handleFinish}
        >
          סיימנו, אפשר להמשיך
        </button>
      )}
    </>
  );
};

export default VideoComp;
