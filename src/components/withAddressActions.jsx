import React from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import AddressCard from './AddressCard';


export const withAddressActions = (wrappedComponent) => {

    return function NewComponent({ address, onEdit, onDelete, ...props }) {
        const actions = (
            <div className="flex gap-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit();
                    }}
                    className="text-sm text-orange-500 flex items-center gap-1 !p-2"
                >
                    <FaEdit /> Edit
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    className="text-sm text-orange-500 flex items-center gap-1 !p-2"
                >
                    <FaTrash /> Delete
                </button>
            </div>
        )
        return (
            <AddressCard {...props}
                address={address}
                actions={actions} />
        )
    }


}

const AddressesWithActions = withAddressActions(AddressCard);
export default AddressesWithActions;
