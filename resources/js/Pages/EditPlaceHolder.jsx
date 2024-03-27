import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router} from '@inertiajs/react';
export default function Page({auth, artists}) {
    console.log(artists)

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Artyści</h2>}
            >
                <Head title="Artyści"/>




            </AuthenticatedLayout>
        </>
    )
}
