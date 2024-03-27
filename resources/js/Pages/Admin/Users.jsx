import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router} from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia'



export default function Page({auth, users}) {

    const removeEventFromDatabase = async (id) => {
        try {
            const url = route('events.destroy', {id});
            await axios.post(url, {
                _method: 'DELETE'
            });
            Inertia.reload({ only: ['events'] });
        } catch (error) {
            console.error('Błąd przy usuwaniu wydarzenia:', error);
        }
    }



    const buttonVariants = {
        primary: 'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20',
        secondary: 'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset text-gray-600 bg-gray-50 ring-gray-500/10',
        danger: 'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset text-red-700 bg-red-50 ring-red-600/10',
    }

    const svgVariants = {
        primary: (
            <svg className="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                 viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-4.75a.75.75 0 001.5 0V8.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0L6.2 9.74a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                      clipRule="evenodd"/>
            </svg>
        ),
        secondary: (
            <svg className="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                 viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L7.3 9.24a.75.75 0 00-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75z"
                      clipRule="evenodd"/>
            </svg>
        ),
        danger: (
            <svg className="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                 viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd"
                      d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                      clipRule="evenodd"/>
            </svg>
        )
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Uzytkownicy</h2>}
        >
            <Head title="Wydarzenia"/>


            <div>
                <div className="pb-12">
                    <div className="flex items-center justify-between">
                        <h2 className="text-l font-semibold text-gray-500">Lista uzytkownikow ({users ? users.length : 0})</h2>

                    </div>

                </div>
            </div>

            <div>

                <div className="overflow-hidden border-t border-gray-100">
                    <div className="">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                            <table className="w-full text-left">
                                <tbody>
                                {
                                    users && users.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="relative py-5 pr-6 ">
                                                        <div className="flex gap-x-6">
                                                            {
                                                                svgVariants.primary
                                                            }
                                                            <div className="flex-auto">
                                                                <div className="flex items-start gap-x-3">
                                                                    <div
                                                                        className="text-sm font-medium leading-6 text-gray-900">
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </div>
                                                                    <div>{
                                                                        item.email
                                                                    }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="absolute bottom-0 right-full h-px w-screen bg-gray-100"></div>
                                                        <div
                                                            className="absolute bottom-0 left-0 h-px w-screen bg-gray-100"></div>
                                                    </td>
                                                    <td className="hidden py-5 pr-6 sm:table-cell">
                                                    </td>
                                                    <td className="py-5 text-right">
                                                        <div className="flex justify-end">
                                                            <a href="#"
                                                               className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500">
                                                                Edytuj
                                                            </a>
                                                            <button type="button"
                                                                    className="ml-3 text-sm font-medium leading-6 text-red-600 hover:text-red-500"
                                                                onClick={() => removeEventFromDatabase(item.id)}
                                                            >
                                                                Usuń
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )

                                        }
                                    )
                                }

                                </tbody>
                            </table>


                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
