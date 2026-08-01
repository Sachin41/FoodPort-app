import { useState, useEffect } from "react";
import AddressCard from './AddressCard';
import AddressSidebar from "./AddressSidebar";
const AddressList = ({ isCart }) => {
    // const addresses = [
    //     {
    //         addressType: "Home",
    //         fullName: "Sachin Kumar",
    //         phone: "9876543210"
    //         houseNo: "Flat 203, Green Residency",
    //         street: "Sector 62",
    //         landmark: "Near Metro",
    //         city: "Noida",
    //         state: "Uttar Pradesh",
    //         pincode: "250001",
    //         isDefault: true,
    //         _id: "6a6b977107924cd400697ba2"
    //     }
    // ];
    // let initAddress;
    // // if (localStorage.getItem("addresses") === null) {
    // //     initAddress = [];
    // // } else {
    // //     initAddress = JSON.parse(localStorage.getItem("addresses"))
    // // }

    const [selectedId, setSelectedId] = useState(1);
    const [data, setData] = useState({});
    const [addressList, setAddressList] = useState([]);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("");

    const fetchAddress = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch('http://localhost:8000/api/address', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return await res.json();

        } catch (error) {
            console.log("ERROR:", error)
        }
    }

    const deleteAddress = async (addressId) => {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:8000/api/address/deleteAddress/${addressId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await res.json();

        setAddressList(data.addresses);
    }

    const addAddress = async (address) => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8000/api/address/addAddress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(address)
        });

        const data = await res.json();

        setAddressList(data.addresses)
    }

    const updateAddress = async (addressId, address) => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`http://localhost:8000/api/address/updateAddress/${addressId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(address)
            })
            const data = await res.json();
            setAddressList(data.addresses)
        } catch (error) {
            console.log("ERROR:", error)
        }
    }

    useEffect(() => {
        fetchAddress().then((data) => {
            setAddressList(data.addresses.addresses);
        })
        // localStorage.setItem('addresses', JSON.stringify(addressList));
    }, []);
    const handleDelete = (addrId) => {
        if (confirm(`Are you sure, you want to delete this address?`)) {
            // setAddressList(addressList.filter((addr) => addr.id !== addrId))
            deleteAddress(addrId)
        } else return;

    }
    const handleEdit = (addr) => {
        setMode("edit");
        setOpen(true);
        setData(addr)
    }
    const addNewAddress = (addressType, fullName, phone, houseNo, street, landmark, city, state, pincode, isDefault) => {

        // let id = addressList.length ? addressList[addressList.length - 1].id + 1 : 1;
        const address = {
            addressType: addressType,
            fullName: fullName,
            phone: phone,
            houseNo: houseNo,
            street: street,
            landmark: landmark,
            city: city,
            state: state,
            pincode: pincode,
            isDefault: isDefault
        }
        addAddress(address)
        // setAddressList([...addressList, address]);
        setOpen(false);
    }
    const editAddress = (addrId, addrs) => {

        // setAddressList(addressList.map((addr) => {
        //     if (addr.id === addrId) {
        //         addr = { ...addrs, addressType: addrs.addressType, id: addrId };
        //     }
        //     return addr;
        // }));
        updateAddress(addrId, addrs);
        setOpen(false);
    }
    return (
        <div className="address-list w-full h-full bg-white rounded-md px-4">
            {!isCart && (<p className="!text-[25px] mb-3 font-bold">
                Manage Addresses
            </p>)}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => {
                        setMode("add");
                        setOpen(true);
                        setData({})
                    }}
                    className="lg:w-[40%] w-auto max-w-[280px] !border-2 !border-dashed !border-orange-400 rounded-xl !p-2
                     whitespace-nowrap text-orange-500 font-semibold !hover:bg-orange-500">
                    + Add New Address
                </button>
                {
                    addressList.length === 0 ? <h3 className='p-3 font-bold'>No Address found, add an address</h3> :
                        addressList.map((addr) => (
                            <AddressCard isCart={isCart}
                                key={addr._id}
                                address={addr}
                                selected={isCart && selectedId === addr._id}
                                onSelect={() => setSelectedId(addr._id)}
                                onEdit={() => handleEdit(addr)}
                                onDelete={() => handleDelete(addr._id)}
                            />
                        ))}
            </div>
            <AddressSidebar
                key={data?._id}
                isOpen={open}
                mode={mode}
                addNewAddress={addNewAddress}
                editAddress={editAddress}
                onClose={() => setOpen(false)}
                data={data}
            />
        </div>
    );
};
export default AddressList;