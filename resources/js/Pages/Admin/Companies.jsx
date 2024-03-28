import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router} from '@inertiajs/react';
import {Inertia} from '@inertiajs/inertia'
import List from "@/Components/Events/List";
import Header from "@/Components/Header/Header";

export default function Page({auth, companies}) {


    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Organizatorzy</h2>}
            >
                <Head title="Organizatorzy"/>


                <Header data={companies} target={"company"} title={"Lista organizatorów"}/>

                <List data={companies} target={"company"}/>

            </AuthenticatedLayout>
        </>
    )
}
