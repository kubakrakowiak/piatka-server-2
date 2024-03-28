import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import PlaceForm from "@/Components/Admin/PlaceForm";

export default function AddPlaceDashboard({auth}) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nowe miejsce</h2>}
        >
            <Head title="Nowe miejsce"/>

            <div>
                <PlaceForm/>
            </div>
        </AuthenticatedLayout>
    );
}
