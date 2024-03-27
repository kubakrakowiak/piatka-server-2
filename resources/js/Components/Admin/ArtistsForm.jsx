import {useState} from "react";
import {PhotoIcon} from "@heroicons/react/24/solid";
import {Inertia} from "@inertiajs/inertia";

export default function ArtistsForm({artist, type}) {


    const [initialData, setInitialData] = useState(artist ? {
        name: artist.name,
    } : {
        name: "",
    });


    let requiredState = false;

    const handleSubmit = (e) => {

        e.preventDefault();

        if (type === "create") {
            function createUuid() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0,
                        v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }

            Inertia.post(route('artist.store', {
                name: initialData.name,
                imageId: "1188b2c5-53d7-4dde-bc81-50a87d7c1ea0"
            }))
        } else if (type === "edit") {
            Inertia.patch(route('artist.update', {id: artist.id}), {
                name: initialData.name,
                imageId: "1188b2c5-53d7-4dde-bc81-50a87d7c1ea0"
            })

        }
    }


    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Informacje o
                                artyście
                            </h2>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="title"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Nazwa artysty
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            required={requiredState}
                                            value={initialData.name}
                                            onChange={(event) => setInitialData({
                                                ...initialData,
                                                name: event.target.value
                                            })}
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="cover-photo"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Zdjęcie artysty
                                    </label>
                                    <div
                                        className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/>
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                    <span>Prześlij zdjecie</span>
                                                    <input id="file-upload" name="file-upload" type="file"
                                                           className="sr-only"/>
                                                </label>
                                                <p className="pl-1">lub upuść je tutaj</p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF do 10MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        {/*<button type="button" className="text-sm font-semibold leading-6 text-gray-900">*/}
                        {/*    Odrzuć*/}
                        {/*</button>*/}


                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Dodaj artyste
                        </button>


                    </div>

                    <div>
                <pre>
                        {JSON.stringify(initialData, null, 2)}
                </pre>
                    </div>

                </form>
            </div>


        </>
    )
}
