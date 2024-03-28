import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import Header from "@/Components/Header/Header";
import List from "@/Components/Events/List";


export default function Page({auth, users}) {


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Uzytkownicy</h2>}
        >
            <Head title="Uzytkownicy"/>


            <Header target={"users"} data={users} title={"Uzytkownicy"}/>

            <List data={users} target={"users"} changePermission={true}/>

        </AuthenticatedLayout>
    );
}
