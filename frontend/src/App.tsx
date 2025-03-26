import { useState } from 'react';
import Camera from './components/Camera';
import TextField from './components/TextField';
import CopyButton from './components/CopyButton';
import './index.css';

const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [captureTrigger, setCaptureTrigger] = useState<(() => Promise<void>) | null>(null);

  const handleCapture = async () => {
    if (captureTrigger) {
      await captureTrigger();
    }
  };

  return (
    <div className="app">
      <h1>Text Scanner</h1>
      <Camera setText={setText} onCapture={(captureFn) => setCaptureTrigger(() => captureFn)} />
      <button onClick={handleCapture} className="capture-button">Capture</button>
      <TextField text={text} />
      <CopyButton text={text} />
    </div>
  );
};

export default App;