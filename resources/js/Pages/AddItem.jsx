import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {useEffect, useState} from "react";
import AddItemForm from "@/Components/Admin/AddItemForm";

export default function AddItem({auth, ...props}) {

    const itemType = props.itemType;


    const [title, setTitle] = useState("")
    useEffect(() => {
        switch (itemType) {
            case "company" :
                setTitle("Dodaj firmę")
                break;
            case "event" :
                setTitle("Dodaj wydarzenie")
                break;
            case "artist" :
                setTitle("Dodaj artystę")
                break;
            case "event-type" :
                setTitle("Dodaj typ wydarzenia")
                break;
            case "user" :
                setTitle("Dodaj użytkownika")
                break;
            case 'place' :
                setTitle("Dodaj miejsce")
                break;
        }
    }, []);


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h2>}
        >
            <Head title={`${title}`}/>

            <AddItemForm {...props} />

        </AuthenticatedLayout>
    );
}
