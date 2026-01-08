const Footer = () => {
  return (
    <footer className="bg-gray-50 py-8">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="font-heading text-lg font-bold text-primary-900">
            PREMSA.IO
          </span>
          <span className="text-sm text-gray-600">Intel·ligència regulatòria</span>
        </div>
        <span className="text-sm text-gray-500">© 2026 PREMSA.IO</span>
      </div>
    </footer>
  );
};

export default Footer;
