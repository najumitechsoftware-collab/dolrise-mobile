"use client";
import { useEffect, RefObject } from "react";

type OnLandmarks = (landmarks: any[]) => void;

export function useFaceMesh(
  videoRef: RefObject<HTMLVideoElement | null>,
  onLandmarks: OnLandmarks
) {
  useEffect(() => {
    let faceMesh: any;
    let camera: any;
    let cancelled = false;

    async function init() {
      const video = videoRef.current;
      if (!video) return;

      // ✅ WAIT until video is ACTUALLY playing
      if (video.readyState < 2) {
        video.onloadeddata = () => init();
        return;
      }

      await import("@mediapipe/face_mesh/face_mesh");

      // @ts-ignore
      faceMesh = new window.FaceMesh({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults((results: any) => {
        if (cancelled) return;
        if (results.multiFaceLandmarks?.[0]) {
          onLandmarks(results.multiFaceLandmarks[0]);
        }
      });

      const Camera = (await import("@mediapipe/camera_utils")).Camera;

      camera = new Camera(video, {
        onFrame: async () => {
          if (!video) return;
          await faceMesh.send({ image: video });
        },
        width: 640,
        height: 480,
      });

      camera.start();
    }

    init();

    return () => {
      cancelled = true;
      if (camera) camera.stop();
      if (faceMesh) faceMesh.close?.();
    };
  }, [videoRef, onLandmarks]);
}
