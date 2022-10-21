function Button({ text, onClick }: { text: string; onClick?: () => void }) {
  return (
    <button
      className="rounded-lg bg-cyan-500 mx-5 py-2 font-medium text-white tracking-wide shadow-md"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
