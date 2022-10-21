function input({
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  errorMessage,
  valid,
  disabled,
}: {
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
  valid?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <input
        className="bg-[#d9d9d9] rounded-lg mx-5 px-2 h-8 shadow-md focus:outline-none"
        style={
          error
            ? { border: "1px solid #EF4444", color: "#EF4444" }
            : valid
            ? { border: "1px solid #10B981", color: "#10B981" }
            : {}
        }
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error ? <span className="text-red-500">{errorMessage}</span> : null}
    </div>
  );
}

export default input;
