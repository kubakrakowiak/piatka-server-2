import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import EventsForm from "@/Components/Admin/EventsForm";

export default function Edit({ auth}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Control Panel</h2>}
        >
            <Head title="Admin" />

            <EventsForm/>
        </AuthenticatedLayout>
    );
}
