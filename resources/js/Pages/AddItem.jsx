import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {useEffect, useState} from "react";
import AddItemForm from "@/Components/Admin/AddItemForm";

export default function AddItem({auth, ...props}) {

    const itemType = props.itemType;
    const label = props?.editTarget ? "Edytuj" : "Dodaj";

    const [title, setTitle] = useState("")
    useEffect(() => {
        switch (itemType) {
            case "company" :
                setTitle(`${label} organizatora`)
                break;
            case "event" :
                setTitle(`${label} wydarzenie`)
                break;
            case "artist" :
                setTitle(`${label} artystę`)
                break;
            case "event-type" :
                setTitle(`${label} typ wydarzenia`)
                break;
            case "user" :
                setTitle(`${label} użytkownika`)
                break;
            case 'place' :
                setTitle(`${label} miejsce`)
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
