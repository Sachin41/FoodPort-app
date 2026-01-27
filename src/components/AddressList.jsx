import { useState, useEffect } from "react";
import AddressCard from './AddressCard';
import AddressSidebar from "./AddressSidebar";
const AddressList = ({ isCart }) => {
    // const addresses = [
    //     {
    //         id: 1,
    //         type: "Home",
    //         line1: "Flat 203, Green Residency",
    //         area: "Sector 62",
    //         city: "Noida",
    //         pincode: "201301",
    //     }
    // ];
    let initAddress;
    if (localStorage.getItem("addresses") === null) {
        initAddress = [];
    } else {
        initAddress = JSON.parse(localStorage.getItem("addresses"))
    }

    const [selectedId, setSelectedId] = useState(1);
    const [data, setData] = useState({});
    const [addressList, setAddressList] = useState(initAddress);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("");
    useEffect(() => {
        localStorage.setItem('addresses', JSON.stringify(addressList));
    }, [addressList]);
    const handleDelete = (addrId) => {
        console.log("delete address")
        setAddressList(addressList.filter((addr) => addr.id !== addrId))
    }
    const handleEdit = (addr) => {
        setMode("edit");
        setOpen(true);
        setData(addr)
    }
    const addNewAddress = (addressType, line1, area, landmark, city, pincode) => {
        console.log("New", line1, area, landmark);
        let id = addressList.length ? addressList[addressList.length - 1].id + 1 : 1;
        const address = {
            id: id,
            type: addressType,
            line1: line1,
            area: area,
            city: city,
            pincode: pincode,
        }
        setAddressList([...addressList, address]);
        setOpen(false);
    }
    const editAddress = (addrId, addrs) => {
        console.log("edit address")
        setAddressList(addressList.map((addr) => {
            if(addr.id === addrId){
                addr = {...addrs, type: addrs.addressType, id: addrId};
            }
            return addr;
        }));
         setOpen(false);
    }
    return (
        <div className="address-list w-full h-full bg-white rounded-md p-4">
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => {
                        setMode("add");
                        setOpen(true);
                        setData({})
                    }}
                    className="w-[40%] max-w-[280px] !border-2 !border-dashed !border-orange-400 rounded-xl !p-2
                     whitespace-nowrap text-orange-500 font-semibold !hover:bg-orange-500">
                    + Add New Address
                </button>
                {
                     addressList.length === 0 ? <h3 className='p-3 font-bold'>No Address found, add an address</h3> :
                addressList.map((addr) => (
                    <AddressCard isCart={isCart}
                        key={addr.id}
                        address={addr}
                        selected={isCart && selectedId === addr.id}
                        onSelect={() => setSelectedId(addr.id)}
                        onEdit={() => handleEdit(addr)}
                        onDelete={() => handleDelete(addr.id)}
                    />
                ))}
            </div>
            <AddressSidebar
                key={data.id || 0}
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