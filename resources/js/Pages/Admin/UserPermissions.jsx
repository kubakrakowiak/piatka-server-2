import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import Header from "@/Components/Header/Header";
import List from "@/Components/Events/List";
import {useState} from "react";


export default function Page({auth, user, userSystemRoles, userCompanies, companyRoles}) {

    const [isSystemPermissionModalOpen, setIsSystemPermissionModalOpen] = useState(false);
    const [isCompanyPermissionModalOpen, setIsCompanyPermissionModalOpen] = useState(false);

    const toggleSystemPermissionModal = () => setIsSystemPermissionModalOpen(!isSystemPermissionModalOpen);
    const toggleCompanyPermissionModal = () => setIsCompanyPermissionModalOpen(!isCompanyPermissionModalOpen);

    const sendPermissionRequest = () => {
        const response = axios.post(route('users.permissions.store', { id: '9940933e-f7fd-49bc-956f-29f039c978a9' }), {roleId: '2'})

    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Uprawnienia</h2>}
        >
            <Head title={"Uprawnienia Uzytkownika" + user.name}/>


            <Header target={"users"} title={"Uprawnienia Uzytkownika " + user.name}/>
            <div className="flex flex-row items-center">
                <div className="flex-1 p-4">
                    <div className="flex items-center justify-between">
                        <p>Uprawnienia Systemowe</p>
                        <button
                            onClick={toggleSystemPermissionModal}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Dodaj
                        </button>
                    </div>
                    <ul>
                        {userSystemRoles.map((role, index) => (
                            <li key={index}>{role.name}</li>
                        ))}
                    </ul>
                </div>

                <div className="w-px bg-gray-400 mx-2 h-full"></div>

                <div className="flex-1 p-4">
                    <div className="flex items-center justify-between">
                        <p>Uprawnienia Organizatorów</p>
                        <button
                            onClick={toggleCompanyPermissionModal}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Dodaj
                        </button>
                        <ul>
                            {userCompanies.map((company, index) => (
                                <li key={index}>{company.name} {company.pivot.role_name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {isSystemPermissionModalOpen && (
                <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="bg-white p-5 rounded-lg shadow-xl">
                            <div className="mb-4">
                                <h2 className="text-xl font-bold">Dodaj Uprawnienie Systemowe</h2>
                            </div>
                            <button
                                onClick={sendPermissionRequest}
                                className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded"
                            >
                                Zapisz
                            </button>
                            <button
                                onClick={toggleSystemPermissionModal}
                                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Zamknij
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isCompanyPermissionModalOpen && (
                <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="bg-white p-5 rounded-lg shadow-xl">
                            <div className="mb-4">
                                <h2 className="text-xl font-bold">Dodaj Uprawnienie Organizatorow</h2>
                            </div>
                            <button
                                onClick={toggleCompanyPermissionModal}
                                className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded"
                            >
                                Zapisz
                            </button>
                            <button
                                onClick={toggleCompanyPermissionModal}
                                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Zamknij
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </AuthenticatedLayout>
    );
}
