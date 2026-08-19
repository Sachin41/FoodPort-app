import { useEffect } from "react";
import { FaHome, FaBriefcase } from "react-icons/fa";

const AddressCard = ({address, actions, selected, onSelect }) => {

  return (
    <div
      onClick={onSelect}
      className={`w-[266px] cursor-pointer border rounded-xl p-4 flex gap-2 items-start transition
       ${address.isDefault && "pb-0"} ${selected ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:shadow-md"}`}
    >
      <div className="text-orange-500 text-xl mt-[12px]">
        {address.addressType === "Home" ? <FaHome /> : <FaBriefcase />}
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">{address.addressType}</h3>

          {/* Actions supplied by HOC */}
          {actions}

        </div>
        <h3 className="font-semibold text-gray-600">{address.fullName} - {address.phone}</h3>
        <p className="text-sm text-gray-600 mt-1">
          {address.houseNo}, {address.street}, {address.landmark}, {address.city}, {address.state} - {address.pincode}
        </p>
        {address.isDefault && <p className="mt-1">
          <span className="inline-flex items-center rounded-md rounded-bl-none rounded-br-none bg-blue-50 px-2
         py-1 text-xs font-medium text-blue-700 inset-ring inset-ring-blue-700/10">Default Address</span>
        </p>}
      </div>
    </div>
  );
};

export default AddressCard;
