import { useState, useEffect } from "react";
import AddressCard from './AddressCard';
import AddressSidebar from "./AddressSidebar";
import AddressesWithActions from "./withAddressActions";

const AddressList = (props) => {

    const { isCart } = props;
    const [selectedId, setSelectedId] = useState(null);
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

        setAddressList(data.addresses);
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
            if (data.success) {
                setAddressList(data.addresses.addresses);
            }else console.log(data.message);
        });
    }, []);

    useEffect(()=>{
        const defaultAddr = addressList.find(addr => addr.isDefault === true);
        setSelectedId(defaultAddr ? defaultAddr._id : addressList?.[0]?._id);
    }, [addressList])

    const handleDelete = (addrId) => {
        if (confirm(`Are you sure, you want to delete this address?`)) {
            deleteAddress(addrId)
        } else return;

    }
    const handleEdit = (addr) => {
        setMode("edit");
        setOpen(true);
        setData(addr)
    }
    const addNewAddress = (data) => {
        addAddress(data)
        setOpen(false);
    }
    const editAddress = (addrId, addrs) => {
        updateAddress(addrId, addrs);
        setOpen(false);
    }
    return (
        <div className="address-list w-full h-full bg-white rounded-md px-4">
            {!isCart && props.children}
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
                    addressList.length === 0 ? <h3 className='p-3 font-bold'>No Address found, add an address</h3>
                        : isCart ?
                            addressList.map((addr) => (
                                <AddressCard
                                    key={addr._id}
                                    address={addr}
                                    selected={selectedId === addr._id}
                                    onSelect={() => setSelectedId(addr._id)}
                                />
                            )) :

                            addressList.map((addr) => (
                                <AddressesWithActions key={addr._id}
                                    address={addr}
                                    onEdit={() => handleEdit(addr)}
                                    onDelete={() => handleDelete(addr._id)}
                                />
                            ))
                }
            </div>
            {isCart && addressList?.length > 0 && (<div className="px-4 flex gap-4 mt-4 justify-end">
                {props.children}
            </div>)}
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