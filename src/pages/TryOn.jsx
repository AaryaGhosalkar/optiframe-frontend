import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";

const API_URL = "https://optiframe-backend.onrender.com";

export default function TryOn() {
  const videoRef = useRef(null);
  const frameRef = useRef(null);
  const location = useLocation();

  const framePath = location.state?.framePath;

  useEffect(() => {
    let camera;
    let faceMesh;

    const setup = async () => {
      if (!videoRef.current) return;

      faceMesh = new FaceMesh({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6,
      });

      faceMesh.onResults((results) => {
        const landmarks = results.multiFaceLandmarks?.[0];
        if (!landmarks || !frameRef.current || !videoRef.current) return;

        const leftEye = landmarks[33];
        const rightEye = landmarks[263];

        const videoWidth = videoRef.current.videoWidth;
        const videoHeight = videoRef.current.videoHeight;

        const lx = leftEye.x * videoWidth;
        const ly = leftEye.y * videoHeight;
        const rx = rightEye.x * videoWidth;
        const ry = rightEye.y * videoHeight;

        const centerX = (lx + rx) / 2;
        const centerY = (ly + ry) / 2;

        const dx = rx - lx;
        const dy = ry - ly;
        const eyeDistance = Math.sqrt(dx * dx + dy * dy);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

        const frameWidth = eyeDistance * 2.2;
        const frameHeight = frameWidth * 0.45;

        const frameEl = frameRef.current;
        frameEl.style.width = `${frameWidth}px`;
        frameEl.style.height = `${frameHeight}px`;

        frameEl.style.transform = `
          translate(${centerX - frameWidth / 2}px,
                    ${centerY - frameHeight / 2}px)
          rotate(${angle}deg)
        `;

        frameEl.style.opacity = "1";
      });

      camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await faceMesh.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });

      await camera.start();
    };

    setup();

    return () => {
      if (camera) camera.stop();
      if (faceMesh) faceMesh.close();
    };
  }, []);

  return (
    <div style={styles.container}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={styles.video}
      />

      {/* Frame from product */}
      <img
        ref={frameRef}
        src={`${API_URL}${framePath || "/frames/frame1.png"}`}
        alt="frame"
        style={styles.overlay}
      />
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "640px",
    height: "480px",
    margin: "40px auto",
    background: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 1,
    pointerEvents: "none",
  },
};
