import {Link} from "@inertiajs/react";
import {Inertia} from "@inertiajs/inertia";

export default function Header({data, target}) {


    return (
        <div>
            <div className="pb-12">
                <div className="flex items-center justify-between">
                    <h2 className="text-l font-semibold text-gray-500">
                        Łącznie ({data ? data.length : 0})
                    </h2>

                    <button onClick={() => {
                        Inertia.visit(route(target))
                    }}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Dodaj
                    </button>

                </div>
            </div>
        </div>
    )
}
