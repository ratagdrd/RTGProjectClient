import React, { useCallback, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
import * as THREE from "three";
import "../css/Video.css";
import FooterGraphic from "../FuncComp/FooterGraphic";

const VideoComp = () => {
  const containerRef = useRef(null);
  const rendererCommonRef = useRef(null);
  const mindarThreeRef = useRef(null);
  const videoRef = useRef(null);
  const [buttonVisible, setButtonVisible] = useState(true);

  const navigate = useNavigate();

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
    navigate("/");
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

  return (
    <>
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
