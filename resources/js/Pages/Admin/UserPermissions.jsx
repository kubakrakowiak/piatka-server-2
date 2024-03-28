import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import Header from "@/Components/Header/Header";
import List from "@/Components/Events/List";


export default function Page({auth, user, systemRoles, companies}) {

    console.log(user)
    console.log(systemRoles)
    console.log(companies)
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Uprawnienia</h2>}
        >
            <Head title="Uprawnienia Uzytkownika"/>


            <Header target={"users"} title={"Uprawnienia Uzytkownika"}/>
            <div className="flex flex-row items-center">
                <div className="flex-1 p-4">
                    <div className="flex items-center justify-between">
                        <p>Uprawnienia Systemowe</p>
                        <a href={`/users/add`}
                           className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Dodaj
                        </a>
                    </div>
                    <ul>
                        {systemRoles.map((role, index) => (
                            <li key={index}>{role.name}</li>
                        ))}
                    </ul>
                </div>

                <div className="w-px bg-gray-400 mx-2 h-full"></div>

                <div className="flex-1 p-4">
                    <div className="flex items-center justify-between">
                        <p>Uprawnienia Organizatorów</p>
                        <a href={`/users/add`}
                           className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Dodaj
                        </a>
                        <ul>
                            {companies.map((company, index) => (
                                <li key={index}>{company.name} {company.pivot.role_name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
