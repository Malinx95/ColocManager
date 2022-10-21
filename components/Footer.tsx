function Footer({ absolute }: { absolute?: boolean }) {
  return (
    <footer
      className="border-t border-gray-500 py-4 flex bottom-0 justify-center w-full"
      style={absolute ? { position: "absolute" } : {}}
    >
      <p>created by maxime grodet</p>
    </footer>
  );
}

export default Footer;
