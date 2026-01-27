import { FaHome, FaBriefcase, FaEdit, FaTrash } from "react-icons/fa";

const AddressCard = ({ isCart, address, selected, onSelect, onEdit, onDelete }) => {
   
  return (
    <div
      onClick={onSelect}
      className={`w-auto max-w-[280px] cursor-pointer border rounded-xl p-4 flex gap-4 items-start transition
        ${selected ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:shadow-md"}`}
    >
      <div className="text-orange-500 text-xl mt-[12px]">
        {address.type === "Home" ? <FaHome /> : <FaBriefcase />}
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center gap-4">
          <h3 className="font-semibold text-gray-800">{address.type}</h3>
          <div className="flex gap-2">
         {!isCart && <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="text-sm text-orange-500 flex items-center gap-1 !p-2"
          >
            <FaEdit /> Edit
          </button>}
         {!isCart && <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-sm text-orange-500 flex items-center gap-1 !p-2"
          >
            <FaTrash  /> Delete
          </button>} 
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-1">
          {address.line1}, {address.area}, {address.city} - {address.pincode}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
