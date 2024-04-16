import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import Header from "@/Components/Header/Header";
import List from "@/Components/Events/List";
import {useEffect, useState} from "react";


export default function Table({auth, ...props}) {


    const target = props.itemType;
    const {itemType, data} = props;

    const [title, setTitle] = useState("")

    useEffect(() => {
        switch (itemType) {
            case "company" :
                setTitle("Lista Organizatorów")
                break;
            case "event" :
                setTitle("Lista wydarzeń")
                break;
            case "artist" :
                setTitle("Lista artystów")
                break;
            case "event-type" :
                setTitle("Lista typów wydarzeń")
                break;
            case "user" :
                setTitle("Lista użytkowników")
                break;
            case 'place' :
                setTitle("Lista miejsc")
                break;
        }
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h2>}
        >
            <Head title={`${title}`}/>


            <Header target={`${target}.create`} data={data}/>

            <List data={data} target={target}/>

        </AuthenticatedLayout>
    );
}
