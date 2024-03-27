import {Inertia} from "@inertiajs/inertia";

export default function List({data, target}) {

    return (
        <>
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
                                {data.map((item) => (
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
                                                        {item.name || item.alias}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {item.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4"
                                               onClick={(e) => {
                                                   e.preventDefault();
                                                   Inertia.get(route(`${target}.edit`, item.id))
                                               }}>Edytuj</a>
                                            <a href="#" className="text-red-600 hover:text-indigo-900"
                                               onClick={(e) => {
                                                   e.preventDefault();
                                                   Inertia.delete(route(`${target}.destroy`, item.id))
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


        </>
    )
}
