const FormInput = ({ placeholder, setOnChange }) => {
  return (
    <div className="formInput">
      <input
        placeholder={placeholder}
        onChange={(e) => setOnChange(e.target.value)}
      ></input>
    </div>
  );
};
