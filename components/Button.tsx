function Button({
  text,
  onClick,
  disabled,
}: {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className="rounded-lg bg-cyan-500 mx-5 py-2 font-medium text-white tracking-wide shadow-md"
      style={disabled ? { opacity: 0.5 } : {}}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
