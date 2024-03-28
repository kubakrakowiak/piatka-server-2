import {Inertia} from "@inertiajs/inertia";
import { buttonVariants, svgVariants } from '../Theme/Theme';
export default function EventList({data, target}){

    function formatDate(date) {
        const day = date.getDate();
        let month = date.getMonth() + 1;
        const months = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
        month = months[month - 1];
        const year = date.getFullYear();
        const hour = date.getHours();
        const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

        return day + " " + month + " " + year + " " + hour + ":" + minutes;
    }

    const removeEventFromDatabase = async (id) => {
        try {
            const url = route('data.destroy', {id});
            await axios.post(url, {
                _method: 'DELETE'
            });
            Inertia.reload({ only: ['data'] });
        } catch (error) {
            console.error('Błąd przy usuwaniu wydarzenia:', error);
        }
    }

    const handleEditEvent = async (id) => {
        const response = await axios.get(route('data.update', {id}));
    }





    return (
        <div>

            <div className="overflow-hidden border-t border-gray-100">
                <div className="">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <table className="w-full text-left">
                            <tbody>
                            {
                                data && data.map((item, index) => {

                                        const startingDate = new Date(item.starting_at);
                                        const endingDate = new Date(item.ending_at);

                                        const startingAt = formatDate(startingDate);
                                        const endingAt = formatDate(endingDate);

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
                                                                <div className={buttonVariants.primary}>Nadchodzące
                                                                </div>
                                                            </div>
                                                            <div className="mt-1 text-xs leading-5 text-gray-500">
                                                                <span className={"font-bold"}>Gdańsk,</span> Ulica
                                                                Elektryków, B90,
                                                                Plenum, Plener33

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="absolute bottom-0 right-full h-px w-screen bg-gray-100"></div>
                                                    <div
                                                        className="absolute bottom-0 left-0 h-px w-screen bg-gray-100"></div>
                                                </td>
                                                <td className="hidden py-5 pr-6 sm:table-cell">
                                                    <div className="text-sm leading-6 text-gray-900">
                                                        {
                                                            startingAt
                                                        }
                                                    </div>
                                                    <div className="mt-1 text-xs leading-5 text-gray-500">
                                                        {
                                                            endingAt
                                                        }
                                                    </div>
                                                </td>
                                                <td className="py-5 text-right">
                                                    <div className="flex justify-end">
                                                        <button
                                                            className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                                                            onClick={() => handleEditEvent(item.id)}
                                                        >
                                                            Edytuj
                                                        </button>
                                                        <button type="button"
                                                                className="ml-3 text-sm font-medium leading-6 text-red-600 hover:text-red-500"
                                                                onClick={() => removeEventFromDatabase(item.id)}
                                                        >
                                                            Usuń
                                                        </button>
                                                    </div>
                                                    <div
                                                        className="mt-1 text-xs leading-5 text-gray-500">Zainteresowanych <span
                                                        className="text-gray-900">512</span></div>
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
    )
}
