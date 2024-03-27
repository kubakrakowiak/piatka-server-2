import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router} from '@inertiajs/react';
import {Inertia} from "@inertiajs/inertia";
import List from "@/Components/Events/List";
import Header from "@/Components/Header/Header";

export default function Places({auth, places}) {
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Miejsca</h2>}
            >
                <Head title="Miejsca"/>


                <Header data={places} target={'places'} title={"Lista miejsc"}/>

                <List data={places} target="place"/>

            </AuthenticatedLayout>
        </>
    )
}
