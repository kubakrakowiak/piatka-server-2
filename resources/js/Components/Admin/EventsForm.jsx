import EventsFormCopy from "@/Components/Admin/EventsForm-Copy";
import {PhotoIcon, UserCircleIcon} from '@heroicons/react/24/solid'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import {Combobox} from '@headlessui/react'
import {useState} from "react";

const places = [
    {
        id: 1,
        name: 'Ulica Elektryków',
    },
    {
        id: 2,
        name: 'B90',
    },
    {
        id: 3,
        name: 'Klub Bukszpryt',
    },
]

const eventTypes = [
    {
        id: 1,
        name: 'Impreza',
    },
    {
        id: 2,
        name: 'Koncert',
    },
    {
        id: 3,
        name: 'Festiwal',
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function EventsForm() {

    const [query, setQuery] = useState('')
    const [query2, setQuery2] = useState('')

    const [selectedPerson, setSelectedPerson] = useState(null)
    const [selectedEventType, setSelectedEventType] = useState(null)


    const filteredPlaces =
        query === ''
            ? places
            : places.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })

    const filteredEventTypes =
        query === ''
            ? eventTypes
            : eventTypes.filter((item) => {
                return item.name.toLowerCase().includes(query2.toLowerCase())
            })


    return (
        <form>
            <div className="space-y-12">


                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Informacje o wydarzeniu</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Najważniejsze informacje dotyczącey
                        wydarzenia.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Nazwa wydarzenia
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                        <Combobox as="div" value={selectedEventType} onChange={setSelectedEventType}>
                            <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Typ wydarzenia</Combobox.Label>
                            <div className="relative mt-2">
                                <Combobox.Input
                                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(event) => setQuery2(event.target.value)}
                                    displayValue={(x) => x?.name}
                                />
                                <Combobox.Button
                                    className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                </Combobox.Button>

                                {filteredEventTypes.length > 0 && (
                                    <Combobox.Options
                                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {filteredEventTypes.map((item) => (
                                            <Combobox.Option
                                                key={item.id}
                                                value={item}
                                                className={({active}) =>
                                                    classNames(
                                                        'relative cursor-default select-none py-2 pl-3 pr-9',
                                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                                    )
                                                }
                                            >
                                                {({active, selected}) => (
                                                    <>
                                                        <div className="flex items-center">
                                                            <span
                                                                className={classNames('truncate', selected && 'font-semibold')}>{item.name}</span>
                                                        </div>

                                                        {selected && (
                                                            <span
                                                                className={classNames(
                                                                    'absolute inset-y-0 right-0 flex items-center pr-4',
                                                                    active ? 'text-white' : 'text-indigo-600'
                                                                )}
                                                            >
                        <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                      </span>
                                                        )}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))}
                                    </Combobox.Options>
                                )}
                            </div>
                        </Combobox>


                        {/*<div className="col-span-full">*/}
                        {/*    <label htmlFor="street-address"*/}
                        {/*           className="block text-sm font-medium leading-6 text-gray-900">*/}
                        {/*        Street address*/}
                        {/*    </label>*/}
                        {/*    <div className="mt-2">*/}
                        {/*        <input*/}
                        {/*            type="text"*/}
                        {/*            name="street-address"*/}
                        {/*            id="street-address"*/}
                        {/*            autoComplete="street-address"*/}
                        {/*            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className="sm:col-span-1 sm:col-start-1">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                Miasto
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    autoComplete="address-level2"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-1">
                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                Ulica
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="street-address"
                                    id="street-address"
                                    autoComplete="street-address"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-1">
                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                Kod pocztowy
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="postal-code"
                                    id="postal-code"
                                    autoComplete="postal-code"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                        <div className="sm:col-span-3">
                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                Link do Google Maps
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="street-address"
                                    id="street-address"
                                    autoComplete="street-address"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                        <div className="sm:col-span-2">
                            <label htmlFor="datetime-start"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Data rozpoczęcia
                            </label>
                            <div className="mt-2">
                                <input
                                    type="datetime-local"
                                    name="datetime-start"
                                    id="datetime-start"
                                    autoComplete="datetime-start"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                Data Zakończenia
                            </label>
                            <div className="mt-2">
                                <input
                                    type="datetime-local"
                                    name="datetime-end"
                                    id="datetime-end"
                                    autoComplete="datetime-end"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                        <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
                            <Combobox.Label
                                className="block text-sm font-medium leading-6 text-gray-900">Miejsce</Combobox.Label>
                            <div className="relative mt-2">
                                <Combobox.Input
                                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(event) => setQuery(event.target.value)}
                                    displayValue={(x) => x?.name}
                                />
                                <Combobox.Button
                                    className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                </Combobox.Button>

                                {filteredPlaces.length > 0 && (
                                    <Combobox.Options
                                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {filteredPlaces.map((item) => (
                                            <Combobox.Option
                                                key={item.id}
                                                value={item}
                                                className={({active}) =>
                                                    classNames(
                                                        'relative cursor-default select-none py-2 pl-3 pr-9',
                                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                                    )
                                                }
                                            >
                                                {({active, selected}) => (
                                                    <>
                                                        <div className="flex items-center">
                                                            <span
                                                                className={classNames('truncate', selected && 'font-semibold')}>{item.name}</span>
                                                        </div>

                                                        {selected && (
                                                            <span
                                                                className={classNames(
                                                                    'absolute inset-y-0 right-0 flex items-center pr-4',
                                                                    active ? 'text-white' : 'text-indigo-600'
                                                                )}
                                                            >
                        <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                      </span>
                                                        )}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))}
                                    </Combobox.Options>
                                )}
                            </div>
                        </Combobox>

                    </div>


                </div>


                <div className="border-b border-gray-900/10 pb-12">
                    {/*<h2 className="text-base font-semibold leading-7 text-gray-900">Dodaj nowe wydarzenie</h2>*/}
                    {/*<p className="mt-1 text-sm leading-6 text-gray-600">*/}
                    {/*    This information will be displayed publicly so be careful what you share.*/}
                    {/*</p>*/}

                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Slug (URL)
                            </label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span
                                        className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">piatka.com/event/</span>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        autoComplete="username"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="janesmith"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                Opis Wydarzenia
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                        </div>


                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Zdjęcie wydarzenia
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
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                                        </label>
                                        <p className="pl-1">lub upuść je tutaj</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF do 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            {/*    <div className="border-b border-gray-900/10 pb-12">*/}
            {/*        <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>*/}
            {/*        <p className="mt-1 text-sm leading-6 text-gray-600">*/}
            {/*            We'll always let you know about important changes, but you pick what else you want to hear*/}
            {/*            about.*/}
            {/*        </p>*/}

            {/*        <div className="mt-10 space-y-10">*/}
            {/*            <fieldset>*/}
            {/*                <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>*/}
            {/*                <div className="mt-6 space-y-6">*/}
            {/*                    <div className="relative flex gap-x-3">*/}
            {/*                        <div className="flex h-6 items-center">*/}
            {/*                            <input*/}
            {/*                                id="comments"*/}
            {/*                                name="comments"*/}
            {/*                                type="checkbox"*/}
            {/*                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
            {/*                            />*/}
            {/*                        </div>*/}
            {/*                        <div className="text-sm leading-6">*/}
            {/*                            <label htmlFor="comments" className="font-medium text-gray-900">*/}
            {/*                                Comments*/}
            {/*                            </label>*/}
            {/*                            <p className="text-gray-500">Get notified when someones posts a comment on a*/}
            {/*                                posting.</p>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="relative flex gap-x-3">*/}
            {/*                        <div className="flex h-6 items-center">*/}
            {/*                            <input*/}
            {/*                                id="candidates"*/}
            {/*                                name="candidates"*/}
            {/*                                type="checkbox"*/}
            {/*                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
            {/*                            />*/}
            {/*                        </div>*/}
            {/*                        <div className="text-sm leading-6">*/}
            {/*                            <label htmlFor="candidates" className="font-medium text-gray-900">*/}
            {/*                                Candidates*/}
            {/*                            </label>*/}
            {/*                            <p className="text-gray-500">Get notified when a candidate applies for a*/}
            {/*                                job.</p>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="relative flex gap-x-3">*/}
            {/*                        <div className="flex h-6 items-center">*/}
            {/*                            <input*/}
            {/*                                id="offers"*/}
            {/*                                name="offers"*/}
            {/*                                type="checkbox"*/}
            {/*                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
            {/*                            />*/}
            {/*                        </div>*/}
            {/*                        <div className="text-sm leading-6">*/}
            {/*                            <label htmlFor="offers" className="font-medium text-gray-900">*/}
            {/*                                Offers*/}
            {/*                            </label>*/}
            {/*                            <p className="text-gray-500">Get notified when a candidate accepts or rejects an*/}
            {/*                                offer.</p>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </fieldset>*/}
            {/*            <fieldset>*/}
            {/*                <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications*/}
            {/*                </legend>*/}
            {/*                <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your*/}
            {/*                    mobile phone.</p>*/}
            {/*                <div className="mt-6 space-y-6">*/}
            {/*                    <div className="flex items-center gap-x-3">*/}
            {/*                        <input*/}
            {/*                            id="push-everything"*/}
            {/*                            name="push-notifications"*/}
            {/*                            type="radio"*/}
            {/*                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
            {/*                        />*/}
            {/*                        <label htmlFor="push-everything"*/}
            {/*                               className="block text-sm font-medium leading-6 text-gray-900">*/}
            {/*                            Everything*/}
            {/*                        </label>*/}
            {/*                    </div>*/}

            {/*                    <div className="flex items-center gap-x-3">*/}
            {/*                        <input*/}
            {/*                            id="push-email"*/}
            {/*                            name="push-notifications"*/}
            {/*                            type="radio"*/}
            {/*                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
            {/*                        />*/}
            {/*                        <label htmlFor="push-email"*/}
            {/*                               className="block text-sm font-medium leading-6 text-gray-900">*/}
            {/*                            Same as email*/}
            {/*                        </label>*/}
            {/*                    </div>*/}

            {/*                    <div className="flex items-center gap-x-3">*/}
            {/*                        <input*/}
            {/*                            id="push-nothing"*/}
            {/*                            name="push-notifications"*/}
            {/*                            type="radio"*/}
            {/*                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
            {/*                        />*/}
            {/*                        <label htmlFor="push-nothing"*/}
            {/*                               className="block text-sm font-medium leading-6 text-gray-900">*/}
            {/*                            No push notifications*/}
            {/*                        </label>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </fieldset>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                {/*<button type="button" className="text-sm font-semibold leading-6 text-gray-900">*/}
                {/*    Odrzuć*/}
                {/*</button>*/}
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Dodaj wydarzenie
                </button>
            </div>
        </form>
    )
}
