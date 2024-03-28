import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router} from '@inertiajs/react';
import {Inertia} from "@inertiajs/inertia";
import List from "@/Components/Events/List";
import Header from "@/Components/Header/Header";

export default function Page({auth, artists}) {
    console.log(artists)

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Artyści</h2>}
            >
                <Head title="Artyści"/>

                <Header data={artists} target={'artists'} title={"Lista artystów"}/>

                <List data={artists} target={'artist'} />

            </AuthenticatedLayout>
        </>
    )
}
