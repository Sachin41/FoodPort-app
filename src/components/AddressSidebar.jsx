import e from "cors";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const AddressSidebar = ({ isOpen, onClose, mode = "add", addNewAddress, editAddress, data }) => {

    const addressSchema = yup.object({
        addressType: yup.string(),
        fullName: yup.string()
            .required("Full name is required")
            .min(3, "Name must be atleast 3 character"),
        phone: yup.string()
            .required("Mobile number is required")
            .matches(/^[6-9]\d{9}$/, "Enter a valid mobile number"),
        houseNo: yup.string()
            .required("House number is required"),
        street: yup.string()
            .required("street is required"),
        city: yup.string()
            .required("city is required"),
        state: yup.string()
            .required("state is required"),
        pincode: yup.string()
            .required("Pincode is required")
            .matches(/^[1-9][0-9]{5}$/, "Enter a valid Pincode"),
        isDefault: yup.boolean()
    });

    if (!isOpen) return null;

    const { register, handleSubmit, reset,
        setValue, watch, formState: { errors, isSubmitting } } = useForm({
            defaultValues: {
                addressType: data.addressType || "Home",
                fullName: data.fullName || "",
                phone: data.phone || "",
                houseNo: data.houseNo || "",
                street: data.street || "",
                city: data.city || "",
                state: data.state || "",
                pincode: data.pincode || "",
                landmark: data.landmark || "",
                isDefault: data.isDefault || false
            },
            resolver: yupResolver(addressSchema)
        })

    const selectedType = watch("addressType");
    const checkedDefault = watch("isDefault");

    const submit = (formData) => {
        if (mode === 'add') {
            addNewAddress(formData);
        }
        else editAddress(data._id, formData);
    }
    return (
        <div className="fixed top-20 inset-0 z-50 flex">
            {/* Overlay */}
            <div
                className="flex-1 bg-black/40"
                onClick={onClose}
            />

            {/* Sidebar */}
            <form onSubmit={handleSubmit(submit)}>
                <div className="w-full sm:w-[520px] bg-white h-full p-5 overflow-y-auto">
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
                                {...register("addressType")}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setValue("addressType", type, {
                                        shouldValidate: true
                                    })
                                }}
                                className={`px-4 py-2 rounded-full text-sm border
                ${selectedType === type
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
                        <div className='grid grid-cols-2 gap-3'>
                            <div>
                                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-1
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Full Name"
                                    {...register("fullName")} />
                                {errors.fullName && (<p className="text-red-500">
                                    {errors.fullName.message}
                                </p>)}
                            </div>
                            <div>
                                <input type="text" name="mobile" className="w-full border border-gray-300 rounded-lg px-4 py-1
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Mobile Number"
                                    {...register("phone")} />
                                {errors.phone && (<p className="text-red-500">
                                    {errors.phone.message}
                                </p>)}
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-3'>
                            <div>
                                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-1
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Flat / House No."
                                    {...register("houseNo")} />
                                {errors.houseNo && (<p className="text-red-500">
                                    {errors.houseNo.message}
                                </p>)}
                            </div>
                            <div>
                                <input className="w-full border border-gray-300 rounded-lg px-4 py-1
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Area / Street"
                                    {...register("street")} />
                                {errors.street && (<p className="text-red-500">
                                    {errors.street.message}
                                </p>)}
                            </div>
                        </div>

                        <input name="landmark" className="w-full border border-gray-300 rounded-lg px-4 py-1
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Landmark (Optional)"
                            {...register("landmark")} />

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-1
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex-1" placeholder="City"
                                    {...register("city")} />
                                {errors.city && (<p className="text-red-500">
                                    {errors.city.message}
                                </p>)}

                            </div>
                            <div>
                                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-1
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="State"
                                    {...register("state")} />
                                {errors.state && (<p className="text-red-500">
                                    {errors.state.message}
                                </p>)}
                            </div>

                        </div>

                        <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-1
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-0" placeholder="Pincode"
                            {...register("pincode")} />
                        {errors.pincode && (<p className="text-red-500">
                            {errors.pincode.message}
                        </p>)}

                        <input type='checkbox' className="input flex-1 mt-4" checked={checkedDefault}
                            onChange={(e) => setValue("isDefault", e.target.checked)} /> <label>Set as default Address</label>

                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-white pt-5 mt-6">
                        <button type="submit" className="w-full !bg-orange-500 text-white py-3 rounded-lg font-semibold">
                            Save Address
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddressSidebar;
