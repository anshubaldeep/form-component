import { ClipboardType } from "lucide-react";

const HeaderNavbar = () => {
  return (
    <nav className="border-gray-200 bg-gray-900 fixed w-screen z-50 h-14 top-0">
      <div className="flex flex-wrap items-center gap-3 mx-auto pl-6 pt-3">
        <div className="flex item-center">
          <ClipboardType color="#fff" size={32} />
          </div>
          <h1 className="text-2xl text-white font-bold pl-2">Form</h1>
      </div>
    </nav>
  );
};

export default HeaderNavbar;
