import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router} from '@inertiajs/react';
import ArtistsForm from "@/Components/Admin/ArtistsForm";
export default function Page({auth, artist}) {

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Artyści</h2>}
            >
                <Head title="Artyści"/>


                <ArtistsForm artist={artist} type={"edit"}/>



            </AuthenticatedLayout>
        </>
    )
}
