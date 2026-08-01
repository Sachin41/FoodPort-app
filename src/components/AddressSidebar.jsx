import e from "cors";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const AddressSidebar = ({ isOpen, onClose, mode = "add", addNewAddress, editAddress, data }) => {
    console.log(data);
    const [addressType, setAddressType] = useState(data.type || "Home");
    // const [addressData, setAddressData] = useState(data || {})
    const [fullName, setFullName] = useState(data.fullName || "");
    const [phone, setPhone] = useState(data.phone || "");
    const [houseNo, setHouseNo] = useState(data.houseNo || "");
    const [street, setStreet] = useState(data.street || "");
    const [city, setCity] = useState(data.city || "");
    const [state, setState] = useState(data.state || "");
    const [pincode, setPincode] = useState(data.pincode || "");
    const [landmark, setLandmark] = useState(data.landmark || "");
    const [isDefault, setIsDefault] = useState(data.isDefault || false);

    if (!isOpen) return null;

    const submit = (e) => {
        e.preventDefault();
        if (!houseNo || !street) {
            console.log("houseNo or Area can not be blank");
        } else {
            if (mode === 'add') {
                addNewAddress(addressType, fullName, phone, houseNo, street, landmark, city, state, pincode, isDefault);
                setFullName('');
                setPhone('');
                setHouseNo('');
                setStreet('');
                setCity('');
                setState('')
                setPincode('');
                setLandmark('');
                setIsDefault(false);
            } else editAddress(data._id, { addressType, fullName, phone, houseNo, street, landmark, city, state, pincode, isDefault });

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
                        <input className="input" placeholder="Full Name" value={fullName}
                            onChange={(e) => setFullName(e.target.value)} />
                        <input className="input" placeholder="Mobile Number" defaultValue={phone}
                            onChange={(e) => setPhone(e.target.value)} />
                        <input className="input" placeholder="Flat / House No." value={houseNo}
                            onChange={(e) => setHouseNo(e.target.value)} />
                        <input className="input" placeholder="Area / Street" value={street}
                            onChange={(e) => setStreet(e.target.value)} />
                        <input className="input" placeholder="Landmark (Optional)" value={landmark}
                            onChange={(e) => setLandmark(e.target.value)} />
                        <div className="flex gap-3">
                            <input className="input flex-1" placeholder="City" value={city}
                                onChange={(e) => setCity(e.target.value)} />
                            <input className="input" placeholder="State" value={state}
                                onChange={(e) => setState(e.target.value)} />
                        </div>
                        <input className="input flex-1" placeholder="Pincode" value={pincode}
                            onChange={(e) => setPincode(e.target.value)} />

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
