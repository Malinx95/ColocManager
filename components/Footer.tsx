function Footer({ absolute }: { absolute?: boolean }) {
  return (
    <footer
      className="border-t border-gray-500 py-4 flex flex-col justify-center items-center bottom-0 w-full"
      style={absolute ? { position: "absolute" } : {}}
    >
      <p>Cr&1t3d by maxime, batien et autre Gr0det</p>
      <p className="font-bold">Tom BLANC nez pas responsable de ça</p>
    </footer>
  );
}

export default Footer;
