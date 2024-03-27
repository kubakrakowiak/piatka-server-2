import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router} from '@inertiajs/react';
import {Inertia} from "@inertiajs/inertia";

export default function Places({auth, places}) {
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Miejsca</h2>}
            >
                <Head title="Miejsca"/>


                <div>
                    <div className="pb-12">
                        <div className="flex items-center justify-between">
                            <h2 className="text-l font-semibold text-gray-500">
                                Lista miejsc
                                ({places ? places.length : 0})</h2>

                            <a href="/places/add"
                               className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Dodaj miejsce
                            </a>

                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nazwa
                                        </th>

                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {places.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full"
                                                             src={item.logo ? item.logo : 'https://via.placeholder.com/150'}
                                                             alt=""/>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {item.alias}
                                                        </div>

                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                   onClick={(e) => {
                                                       e.preventDefault();
                                                       Inertia.get(route('place.edit', item.id))
                                                   }}>Edytuj</a>
                                                <a href="#" className="text-red-600 hover:text-indigo-900"
                                                   onClick={(e) => {
                                                       e.preventDefault();
                                                       Inertia.delete(route('place.destroy', item.id))
                                                   }}>Usuń</a>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </AuthenticatedLayout>
        </>
    )
}
