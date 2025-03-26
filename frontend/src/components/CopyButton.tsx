interface CopyButtonProps {
    text: string;
  }
  
  const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
    const handleCopy = () => {
      navigator.clipboard.writeText(text);
      alert('Text copied to clipboard!');
    };
  
    return <button onClick={handleCopy} disabled={!text}>Copy Text</button>;
  };
  
  export default CopyButton;