import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

import * as THREE from "three";

import "../css/Remake.css";

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

const AmfiComp = () => {
  const containerRef = useRef(null);
  const [buttonVisible, setButtonVisible] = useState(false);
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate("/");
  };
  useEffect(() => {
    let mindarThree;
    let rendererCommon;

    async function initAR() {
      mindarThree = new MindARThree({
        container: containerRef.current,
        imageTargetSrc: "/target/theater.mind",
      });
      console.log("mind", mindarThree);
      const { scene, camera } = mindarThree;
      rendererCommon = mindarThree.renderer;

      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
      scene.add(light);
      console.log("light", light);
      // Use the loadTexture function to load the image as a texture
      const texture = await loadTexture("/target/amfi.jpg"); // Ensure this is correctly pathed
      console.log("texture", texture);

      const geometry = new THREE.PlaneGeometry(1, 0.55); // Adjust size as needed, consider aspect ratio
      console.log("geometry", geometry);

      const material = new THREE.MeshBasicMaterial({ map: texture });
      console.log("material", material);

      const plane = new THREE.Mesh(geometry, material);
      plane.rotation.x = -Math.PI / 16; // Adjust rotation as needed
      plane.position.set(0, 0, 0); // Adjust position as needed
      console.log("plane", plane);

      const anchor = mindarThree.addAnchor(0);
      anchor.group.add(plane);

      await mindarThree.start();

      rendererCommon?.setAnimationLoop(() => {
        rendererCommon.render(scene, camera);
      });

      setButtonVisible(true); // Optionally hide the button after AR is initialized
    }

    initAR();

    return () => {
      rendererCommon?.setAnimationLoop(null); // This stops the animation loop when component unmounts
      mindarThree.stop(); // Ensure you properly stop and dispose of resources to prevent memory leaks
    };
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
      ></div>
      {buttonVisible && (
        <button className="finish-button" onClick={handleFinish}>
          סיימנו, אפשר להמשיך
        </button>
      )}
    </>
  );
};

export default AmfiComp;
