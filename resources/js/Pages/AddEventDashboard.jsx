import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import EventsForm from "@/Components/Admin/EventsForm";

export default function Dashboard({auth, eventTypes, artistsCollection, companiesCollection, event}) {

    const data = {
        eventTypes: eventTypes,
        artists: artistsCollection,
        companies: companiesCollection
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nowe wydarzenie</h2>}
        >
            <Head title="Add New Events"/>

            <div>
                <EventsForm data={data}/>
            </div>
        </AuthenticatedLayout>
    );
}
