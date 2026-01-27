import e from "cors";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const AddressSidebar = ({ isOpen, onClose, mode = "add", addNewAddress, editAddress, data }) => {
    console.log(data);
    const [addressType, setAddressType] = useState(data.type || "Home");
    // const [addressData, setAddressData] = useState(data || {})
    const [line1, setLine1] = useState(data.line1 || "");
    const [area, setArea] = useState(data.area || "");
    const [city, setCity] = useState(data.city || "");
    const [pincode, setPincode] = useState(data.pincode || "");
    const [landmark, setLandmark] = useState(data.landmark || "");
    if (!isOpen) return null;
    const submit = (e) => {
        e.preventDefault();
        if (!line1 || !area) {
            console.log("line1 or Area can not be blank");
        } else {
           if(mode === 'add'){
            addNewAddress(addressType, line1, area, landmark, city, pincode);
                        setLine1('');
            setArea('');
            setCity('');
            setPincode('');
            setLandmark('');
           }else editAddress(data.id, { addressType, line1, area, landmark, city, pincode });

        }
    }
    return (
        <div className="fixed top-20 inset-0 z-50 flex">
            {/* Overlay */}
            <div
                className="flex-1 bg-black/40"
                onClick={onClose}
            />

            {/* Sidebar */}
            <form onSubmit={submit}>
                <div className="w-full sm:w-[420px] bg-white h-full p-5 overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg font-semibold">
                            {mode === "add" ? "Add New Address" : "Edit Address"}
                        </h2>
                        <button onClick={onClose}>
                            <IoClose size={22} />
                        </button>
                    </div>

                    {/* Address Type */}
                    <div className="flex gap-3 mb-5">
                        {["Home", "Work", "Other"].map(type => (
                            <button
                                key={type}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setAddressType(type)
                                }}
                                className={`px-4 py-2 rounded-full text-sm border
                ${addressType === type
                                        ? "!bg-orange-500 text-white !border-orange-500"
                                        : "!bg-gray"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        <input className="input" placeholder="Flat / House No." value={line1}
                            onChange={(e) => setLine1(e.target.value)} />
                        <input className="input" placeholder="Area / Street" value={area}
                            onChange={(e) => setArea(e.target.value)} />
                        <input className="input" placeholder="Landmark (Optional)" value={landmark}
                            onChange={(e) => setLandmark(e.target.value)} />
                        <div className="flex gap-3">
                            <input className="input flex-1" placeholder="City" value={city}
                                onChange={(e) => setCity(e.target.value)} />
                            <input className="input flex-1" placeholder="Pincode" value={pincode}
                                onChange={(e) => setPincode(e.target.value)} />
                        </div>
                        {/* <input className="input" placeholder="State" defaultValue={data.state} />
          <input className="input" placeholder="Mobile Number" defaultValue={data.mobile} /> */}
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-white pt-5 mt-6">
                        <button type="submit" className="w-full !bg-orange-500 text-white py-3 rounded-lg font-semibold">
                            Save Address
                        </button>

                        {/* {mode === "edit" && (
                            <button className="w-full mt-3 text-red-500 font-medium">
                                Delete Address
                            </button>
                        )} */}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddressSidebar;
