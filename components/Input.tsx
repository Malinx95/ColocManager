function input({
  type,
  placeholder,
  value,
  onChange,
}: {
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      className="bg-[#d9d9d9] rounded-lg mx-5 px-2 h-8 shadow-md"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default input;
