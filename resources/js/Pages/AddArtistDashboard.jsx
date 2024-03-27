import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import CompaniesForm from "@/Components/Admin/CompaniesForm";
import ArtistsForm from "@/Components/Admin/ArtistsForm";

export default function AddArtistDashboard({auth}) {
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nowy Artysta</h2>}
            >
                <Head title="Nowy Artysta"/>

                <ArtistsForm/>

            </AuthenticatedLayout>
        </>
    )
}
