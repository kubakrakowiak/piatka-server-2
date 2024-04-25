"use client"


import {useEffect, useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import {router} from "@inertiajs/react";

const fieldConfigs = {
    company: [
        {name: 'name', type: 'text'},
    ],
    place: [
        {name: 'alias', type: 'text'},
        {name: 'x_coord', type: 'number'},
        {name: 'y_coord', type: 'number'},
    ],
    event: [
        {name: 'name', type: 'text'},
        {name: 'age_restriction', type: 'number'},
        {name: 'starting_at', type: 'datetime-local'},
        {name: 'ending_at', type: 'datetime-local'},
        {name: 'company_id', type: 'dropdown', collection: 'companiesCollection'},
        {name: 'place_id', type: 'dropdown', collection: 'placesCollection'},
        {name: 'event_type_id', type: 'dropdown', collection: 'eventTypes'},
        {name: 'artists', type: 'multiple-dropdown', collection: 'artistsCollection'},
        // {name: 'ticket_price', type: 'number'},

    ],
    artist: [
        {name: 'name', type: 'text'},
        {name: 'image', type: 'file'},
    ],
    'event-type': [
        {name: 'name', type: 'text'}
    ],
    user: [
        {name: 'name', type: 'text'},
        {name: 'email', type: 'email'}
    ]
};


export default function AddItemForm({...props}) {


    const {itemType} = props;
    const itemToUpdate = props?.editTarget;
    const operation = props?.editTarget ? "edit" : "create";

    const [formData, setFormData] = useState(() => {
        let initialData = {};
        fieldConfigs[itemType]?.forEach(field => {
            initialData[field.name] = itemToUpdate ? itemToUpdate[field.name] : "";
        });
        return initialData;
    });


    const handleChange = (event) => {

        const {name, value, type} = event.target;
        let formattedValue = value;

        const fieldConfig = fieldConfigs[itemType].find(f => f.name === name);

        if (fieldConfig) {
            switch (fieldConfig.type) {
                case 'number':
                    formattedValue = parseFloat(value);
                    if (isNaN(formattedValue)) formattedValue = null;
                    break;
                case 'datetime-local':
                    formattedValue = value;
                    break;
                case 'dropdown':
                    break;

                case 'multiple-dropdown':
                    formattedValue = Array.from(event.target.selectedOptions, option => option.value);
                    break;
            }
        }

        setFormData(prev => ({...prev, [name]: formattedValue}));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const convertNamesFromFormDataToCamelCase = (formData) => {
            let formattedData = {};
            for (const [key, value] of Object.entries(formData)) {
                formattedData[key.replace(/_./g, (x) => x[1].toUpperCase())] = value;
            }
            return formattedData;
        }
        const newFromData = convertNamesFromFormDataToCamelCase(formData);


        for (const [key, value] of Object.entries(newFromData)) {
            if (key.includes("_at")) {
                const date = new Date(value);
                formData[key] = date.toISOString().slice(0, 19).replace('T', ' ');
            }
        }


        if (operation === "create") {
            const response = axios.post(route(`${itemType}.store`), {
                ...newFromData,
            }).then((response) => {
                Inertia.visit(route(`${itemType}.index`));
            }).catch((error) => {
                console.log(error);
            })
        } else {
            const response = axios.patch(route(`${itemType}.update`, {id: itemToUpdate.id}), {
                ...newFromData,
            }).then((response) => {
                Inertia.visit(route(`${itemType}.index`));
            }).catch((error) => {
                console.log(error);
            })
        }
    };


    return (
        <>
            <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="border-b border-gray-900/10 pb-6">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Informacje
                        </h2>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                            {fieldConfigs[itemType]?.map(field => (
                                <div key={field.name} className="sm:col-span-3">
                                    <label htmlFor={field.name}
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                                    </label>
                                    <div className="mt-2">
                                        {
                                            field.type === 'dropdown' ? (
                                                <select
                                                    name={field.name}
                                                    id={field.name}

                                                    onChange={handleChange}
                                                >
                                                    <option>Wybierz...</option>
                                                    {props[field.collection].map(item => (
                                                        <option
                                                            key={item.id}
                                                            value={item.id}>
                                                            {item.name ? item.name : item.alias}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : field.type === 'multiple-dropdown' ? (
                                                <select
                                                    name={field.name}
                                                    id={field.name}
                                                    multiple
                                                    onChange={handleChange}
                                                >
                                                    {props[field.collection].map(item => (
                                                        <option
                                                            key={item.id}
                                                            value={item.id}>
                                                            {item.name ? item.name : item.alias}
                                                        </option>
                                                    ))}

                                                </select>
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    id={field.name}
                                                    value={formData[field.name]}
                                                    onChange={handleChange}
                                                    autoComplete="off"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            )
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {
                                operation === "create" ? "Dodaj" : "Edytuj"
                            }
                        </button>
                    </div>
                </form>
            </div>


        </>
    )
}
