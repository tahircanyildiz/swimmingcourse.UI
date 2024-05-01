import React, { useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
function CustomModal({ children, visible, setState }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setState(false);
      }
    };

    if (visible) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible, setState]);

  return (
    <div
      className={
        visible
          ? "fixed top-0 left-0 z-50 w-screen h-screen  flex justify-center items-center bg-black bg-opacity-30"
          : "hidden"
      }
    >
      <div className="shadow-md rounded-xl bg-white relative overflow-y-auto p-10">
        {children}
        <div onClick={() => setState(false)} className=" absolute top-3 right-3 text-black hover:cursor-pointer">
          <CloseIcon />
        </div>
      </div>
    </div>
  );
}

export default CustomModal;