import { useEffect, useRef } from 'react';
import { scanText } from '../utils/api';

interface CameraProps {
  setText: (text: string) => void;
  onCapture: (captureFn: () => Promise<void>) => void;
}

const Camera: React.FC<CameraProps> = ({ setText, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }).catch((err) => {
      console.error('Error accessing camera:', err);
      setText('Camera access denied');
    });
  }, [setText]);

  const captureAndScan = async () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        const imageData = canvas.toDataURL('image/jpeg');
        try {
          const extractedText = await scanText(imageData);
          setText(extractedText);
        } catch (error) {
          console.error('Error in captureAndScan:', error);
          setText('Error extracting text');
        }
      } else {
        setText('Canvas context unavailable');
      }
    } else {
      setText('Camera or canvas not ready');
    }
  };

  useEffect(() => {
    onCapture(captureAndScan);
  }, [onCapture]);

  return (
    <>
      <video ref={videoRef} autoPlay width="640" height="480" />
      <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
    </>
  );
};

export default Camera;