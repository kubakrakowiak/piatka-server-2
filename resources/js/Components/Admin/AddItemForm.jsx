"use client"


import {useState} from "react";

const fieldConfigs = {
    company: [
        { name: 'name', type: 'text' }
    ],
    place: [
        { name: 'name', type: 'text' },
        { name: 'coordX', type: 'number' },
        { name: 'coordY', type: 'number' }
    ],
    event: [
        { name: 'title', type: 'text' },
        { name: 'date', type: 'date' }
    ]
};


export default function AddItemForm({...props}) {

    const {itemType} = props;

    console.log("props", props)

    const [formData, setFormData] = useState(() => {
        let initialData = {};
        fieldConfigs[itemType]?.forEach(field => {
            initialData[field.name] = '';
        });
        return initialData;
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted data:', formData);
        // Możliwe miejsce na logikę do zapisu danych
    };


    return(
        <>

            <form onSubmit={handleSubmit}>
                {fieldConfigs[itemType]?.map(field => (
                    <div key={field.name}>
                        <label>{field.name.charAt(0).toUpperCase() + field.name.slice(1)}:</label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>


        </>
    )


}
