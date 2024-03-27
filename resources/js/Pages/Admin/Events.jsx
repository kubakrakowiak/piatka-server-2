import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router} from '@inertiajs/react';
import {Inertia} from '@inertiajs/inertia'
import Header from "@/Components/Header/Header";
import EventList from "@/Components/Events/EventList";


export default function Page({auth, events}) {


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Wszystkie wydarzenia</h2>}
        >
            <Head title="Wydarzenia"/>


            <Header target={"event"} title={"Lista wydarzeń"} data={events}/>

            <EventList data={events} target={"event"}/>


        </AuthenticatedLayout>
    );
}
