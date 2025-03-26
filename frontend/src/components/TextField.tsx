interface TextFieldProps {
    text: string;
  }
  
  const TextField: React.FC<TextFieldProps> = ({ text }) => {
    return (
      <div className="text-field">
        <h3>Extracted Text:</h3>
        <textarea value={text} readOnly rows={5} cols={50} />
      </div>
    );
  };
  
  export default TextField;