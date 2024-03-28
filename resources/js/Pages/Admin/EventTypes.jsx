import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import Header from "@/Components/Header/Header";
import List from "@/Components/Events/List";


export default function Page({auth, eventTypes}) {


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Typy wydarzeń </h2>}
        >
            <Head title="Typy wydarzeń"/>


            <Header target={"event-type"} data={eventTypes} title={"Typy wydarzeń"}/>

            <List data={eventTypes} target={"event-types"}/>

        </AuthenticatedLayout>
    );
}
