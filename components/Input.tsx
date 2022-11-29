function Input({
  type,
  className,
  placeholder,
  value,
  onChange,
  onBlur,
  onKeyDown,
  error,
  errorMessage,
  valid,
  disabled,
}: {
  type: string;
  className?: string;
  placeholder?: string;
  value?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | any) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
  valid?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <input
        className={
          className
            ? className
            : "bg-[#d9d9d9] rounded-lg mx-5 px-2 h-8 shadow-md focus:outline-none"
        }
        style={
          error
            ? { border: "1px solid #EF4444", color: "#EF4444" }
            : valid
            ? { border: "1px solid #10B981", color: "#10B981" }
            : {}
        }
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
      {error ? <span className="text-red-500">{errorMessage}</span> : null}
    </div>
  );
}

export default Input;
