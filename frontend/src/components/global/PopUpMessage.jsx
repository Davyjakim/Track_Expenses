import React from "react";
import { IoCloseOutline } from "react-icons/io5";
function PopUpMessage(props) {
  const { isPopupVisible, title, message, setisPopupVisible } = props;
  return (
    <div>
      {isPopupVisible && (
        <div className="fixed z-10 inset-0 flex items-center text-black justify-center bg-black bg-opacity-70">
          <div className="absolute top-28 bg-gray-50 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <p>{message}</p>
            <button className="absolute top-2 right-4" onClick={()=>{
                setisPopupVisible(false)
            }} >
              <IoCloseOutline size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopUpMessage;
