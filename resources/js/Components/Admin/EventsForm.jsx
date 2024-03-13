import {PhotoIcon, UserCircleIcon} from '@heroicons/react/24/solid'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import {Combobox} from '@headlessui/react'
import {useState} from "react";


const musicCollection = [{
    id: 1, name: "Hip-Hop"
}, {
    id: 2, name: "Techno"
}, {
    id: 3, name: "Rap"
}, {
    id: 4, name: "Elektroniczna"
},]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function EventsForm({test}) {

    const requiredState = false;


    const [initialData, setInitialData] = useState(test)

    const eventTypes = initialData.eventTypes;
    const artistCollection = initialData.artists;
    const placesCollection = initialData.places;


    const [query, setQuery] = useState('')
    const [query2, setQuery2] = useState('')
    const [artistsQuerry, setArtistsQuerry] = useState('')
    const [musicQuerry, setMusicQuerry] = useState('')

    const [slugInput, setSlugInput] = useState('')
    const [selectedEventPlaces, setSelectedEventPlaces] = useState([])
    const [selectedEventType, setSelectedEventType] = useState(null)
    const [selectedMusicTypes, setSelectedMusicTypes] = useState([])
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [data, setData] = useState({
        title: '',
        startDate: '',
        endDate: '',
        description: '',
        premium: false,
        slug: '',
        restrictions: {
            age: false,
            extra1: false,
            extra2: false
        },
        places: [],
        artists: [],
        music: [],
        address: {
            city: '',
            street: '',
            postalCode: '',
        },
        googleMapsLink: ''
    })


    const filteredPlaces = query === '' ? placesCollection : placesCollection.filter((item) => {
        return item.alias.toLowerCase().includes(query.toLowerCase())
    })

    const filteredEventTypes = query2 === '' ? eventTypes : eventTypes.filter((item) => {
        return item.name.toLowerCase().includes(query2.toLowerCase())
    })

    const filteredArtistsCollection = artistsQuerry === '' ? artistCollection : artistCollection.filter((item) => {
        return item.name.toLowerCase().includes(artistsQuerry.toLowerCase())
    })

    const filteredMusicCollection = musicQuerry === '' ? musicCollection : musicCollection.filter((item) => {
        return item.name.toLowerCase().includes(musicQuerry.toLowerCase())
    })

    const handleEventTypeChange = (selectedType) => {
        const newData = {...data, type: selectedType};
        setData(newData);
    };

    const handleEventPlacesChange = (selectedPlace) => {
        const findPlaceInArray = data.places?.find((place) => place.id === selectedPlace.id);

        if (findPlaceInArray) return;

        const newData = {
            ...data, places: Array.isArray(data.places) ? [...data.places, {
                id: selectedPlace.id, alias: selectedPlace.alias
            }] : [{id: selectedPlace.id, alias: selectedPlace.alias}]
        };
        setData(newData);
    }

    const handleArtistChange = (selectedArtist) => {
        const x = data.artists?.find((item) => item.id === selectedArtist.id);
        if (x) return;

        const newData = {
            ...data, artists: Array.isArray(data.artists) ? [...data.artists, {
                id: selectedArtist.id, name: selectedArtist.name
            }] : [{id: selectedArtist.id, name: selectedArtist.name}]
        };
        setData(newData);
    }

    const handleMusicChange = (selectedMusic) => {
        const x = data.music?.find((item) => item.id === selectedMusic.id);
        if (x) return;

        const newData = {
            ...data, music: Array.isArray(data.music) ? [...data.music, {
                id: selectedMusic.id, name: selectedMusic.name
            }] : [{id: selectedMusic.id, name: selectedMusic.name}]
        };
        setData(newData);
    }


    const saveData = (name, value) => {
        switch (name) {
            case 'title':
                setData({...data, title: value});
                break;
            case 'datetime-start':
                setData({...data, startDate: value});
                break;
            case 'datetime-end':
                setData({...data, endDate: value});
                break;
            case 'description' :
                setData({...data, description: value});
                break;
            case 'regular-event' :
                setData({...data, premium: false})
                break;
            case 'premium-event' :
                setData({...data, premium: true})
                break;
            case 'slug' :
                setSlugInput(value.replace(/\s/g, '-'))
                setData({...data, slug: value.replace(/\s/g, '-')})
                break;
            case 'ageRestriction' :
                setData({...data, restrictions: {...data.restrictions, age: value}})
                break;
            case 'extraRestriction1' :
                setData({...data, restrictions: {...data.restrictions, extra1: value}})
                break;
            case 'extraRestriction2' :
                setData({...data, restrictions: {...data.restrictions, extra2: value}})
                break;

        }
    }

    const removePlaceFromPlacesArray = (id) => {
        const newData = {
            ...data, places: data.places.filter((item) => item.id !== id)
        }
        setData(newData);
    }

    const removeArtistsFromArray = (id) => {
        const newData = {
            ...data, artists: data.artists.filter((item) => item.id !== id)
        }
        setData(newData);
    }

    const removeMusicFromArray = (id) => {
        const newData = {
            ...data, music: data.music.filter((item) => item.id !== id)
        }
        setData(newData);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        function formatDate(date) {
            const d = new Date(date);
            let month = '' + (d.getMonth() + 1);
            let day = '' + d.getDate();
            let year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
        }

        const dataToSend = {
            "companyId": "1",
            "placeId": data.places[0].id,
            "eventTypeId": data.type.id,
            "name": data.title,
            "startingAt": formatDate(data.startDate),
            "ticketPrice": "1.15",
            "endingAt": formatDate(data.endDate),
            "artists": []
        }

        const response = axios.post(route('events.store'), dataToSend)


    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Informacje o wydarzeniu</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Najważniejsze informacje dotyczącey
                        wydarzenia.</p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Nazwa wydarzenia</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    required={requiredState}
                                    onChange={(event) => saveData(event.target.name, event.target.value)}
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <Combobox as="div" value={selectedEventType} onChange={(newValue) => {
                            setSelectedEventType(newValue);
                            handleEventTypeChange(newValue);
                        }}>
                            <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Typ
                                wydarzenia</Combobox.Label>
                            <div className="relative mt-2">
                                <Combobox.Input
                                    required={requiredState}

                                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(event) => setQuery2(event.target.value)}
                                    displayValue={(x) => x?.name}
                                />
                                <Combobox.Button
                                    className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                </Combobox.Button>

                                {filteredEventTypes.length > 0 && (<Combobox.Options
                                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {filteredEventTypes.map((item) => (<Combobox.Option

                                        key={item.id}
                                        value={item}
                                        className={({active}) => classNames('relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900')}
                                    >
                                        {({active, selected}) => (<>
                                            <div className="flex items-center">
                                                            <span
                                                                className={classNames('truncate', selected && 'font-semibold')}>{item.name}</span>
                                            </div>

                                            {selected && (<span
                                                className={classNames('absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600')}
                                            >
                        <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                      </span>)}
                                        </>)}
                                    </Combobox.Option>))}
                                </Combobox.Options>)}
                            </div>
                        </Combobox>


                        <div className="sm:col-span-1 sm:col-start-1">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                Miasto
                            </label>
                            <div className="mt-2">
                                <input
                                    required={requiredState}

                                    onChange={(event) => setData({
                                        ...data, address: {...data.address, city: event.target.value}
                                    })}
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
                                    onChange={(event) => setData({
                                        ...data, address: {...data.address, street: event.target.value}
                                    })}
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
                                    onChange={(event) => setData({
                                        ...data, address: {...data.address, postalCode: event.target.value}
                                    })}
                                    id="postal-code"
                                    autoComplete="postal-code"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                        <div className="sm:col-span-3">
                            <label htmlFor="google-maps-link"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Link do Google Maps
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    onChange={(event) => setData({...data, googleMapsLink: event.target.value})}
                                    name="google-maps-link"
                                    id="google-maps-link"
                                    autoComplete="google-maps-link"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                        <div className="sm:col-span-2">
                            <label htmlFor="datetime-start"
                                   className="block text-sm font-medium leading-6 text-gray-900">Data
                                rozpoczęcia</label>
                            <div className="mt-2">
                                <input
                                    required={requiredState}

                                    type="datetime-local"
                                    name="datetime-start"
                                    id="datetime-start"
                                    autoComplete="datetime-start"
                                    onChange={(event) => saveData(event.target.name, event.target.value)}
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
                                    required={requiredState}

                                    type="datetime-local"
                                    name="datetime-end"
                                    id="datetime-end"
                                    onChange={(event) => saveData(event.target.name, event.target.value)}
                                    autoComplete="datetime-end"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <Combobox as="div" value={selectedEventPlaces} onChange={(newValue) => {
                            setSelectedEventPlaces(newValue);
                            handleEventPlacesChange(newValue);
                        }}>
                            <Combobox.Label
                                className="block text-sm font-medium leading-6 text-gray-900">Miejsce/Miejsca</Combobox.Label>
                            <div className="relative mt-2">
                                <Combobox.Input
                                    required={requiredState}

                                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(event) => setQuery(event.target.value)}
                                    displayValue={(x) => x?.alias}
                                />
                                <Combobox.Button
                                    className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                </Combobox.Button>

                                {filteredPlaces.length > 0 && (<Combobox.Options
                                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {filteredPlaces.map((item) => (
                                        <Combobox.Option
                                            key={item.id}
                                            value={item}
                                            className={({active}) => classNames('relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900')}
                                        >
                                            {({active, selected}) => (<>
                                                <div className="flex items-center">
                                                            <span
                                                                className={classNames('truncate', selected && 'font-semibold')}>{item.alias}</span>
                                                </div>

                                                {selected && (<span
                                                    className={classNames('absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600')}
                                                >
                        <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                      </span>)}
                                            </>)}
                                        </Combobox.Option>))}
                                </Combobox.Options>)}
                            </div>
                        </Combobox>


                    </div>

                    {data.places && data.places.length >= 1 && (<>
                        <div>
                            <p className="mt-5 text-sm leading-6 text-gray-600">Wybrane {data.places.length > 1 ? 'miejsca' : 'miejsce'}
                            </p>
                            <div className={"flex gap-2 mt-2"}>
                                {data.places.map((place, index) => {
                                    return (<button type="button"
                                                    onClick={() => removePlaceFromPlacesArray(place.id)}
                                                    className="rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        {place.alias}
                                    </button>)
                                })}
                            </div>
                        </div>

                    </>)}

                </div>


                <div className="border-b border-gray-900/10 pb-12">
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
                                        required={requiredState}
                                        type="text"
                                        name="slug"
                                        id="slug"
                                        onChange={(event) => saveData(event.target.name, event.target.value)}
                                        value={slugInput}
                                        autoComplete="slug"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="unikalna-nazwa-wydarzenia"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Opis Wydarzenia
                            </label>
                            <div className="mt-2">
                                <textarea
                                    required={requiredState}

                                    id="description"
                                    name="description"
                                    onChange={(event) => saveData(event.target.name, event.target.value)}
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

                        <div className={"flex flex-col gap-2 col-span-full"}>


                            <Combobox as="div" value={selectedArtists} onChange={(newValue) => {
                                setSelectedArtists(newValue);
                                handleArtistChange(newValue)
                            }}
                            >
                                <Combobox.Label
                                    className="block text-sm font-medium leading-6 text-gray-900">Artyści</Combobox.Label>
                                <div className="relative mt-2">
                                    <Combobox.Input
                                        required={requiredState}

                                        className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(event) => setArtistsQuerry(event.target.value)}
                                        displayValue={(x) => x?.name}
                                    />
                                    <Combobox.Button
                                        className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                    </Combobox.Button>

                                    {filteredArtistsCollection.length > 0 && (<Combobox.Options
                                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {filteredArtistsCollection.map((item) => (<Combobox.Option

                                            key={item.id}
                                            value={item}
                                            className={({active}) => classNames('relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900')}
                                        >
                                            {({active, selected}) => (<>
                                                <div className="flex items-center">
                                                            <span
                                                                className={classNames('truncate', selected && 'font-semibold')}>{item.name}</span>
                                                </div>

                                                {selected && (<span
                                                    className={classNames('absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600')}
                                                >
                        <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                      </span>)}
                                            </>)}
                                        </Combobox.Option>))}
                                    </Combobox.Options>)}
                                </div>
                            </Combobox>


                            {data.artists && data.artists.length >= 1 && (<>
                                <div>
                                    <p className="text-sm leading-6 text-gray-600">{data.artists.length > 1 ? 'Wybrani Artyści' : 'Wybrany Artysta'}</p>
                                    <div className={"flex gap-2 mt-2"}>
                                        {data.artists.map((item, index) => {
                                            return (<button type="button"
                                                            onClick={() => removeArtistsFromArray(item.id)}
                                                            className="rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                {item.name}
                                            </button>)
                                        })}
                                    </div>
                                </div>

                            </>)}

                        </div>


                        <div className={"flex flex-col gap-2 col-span-full"}>


                            <Combobox as="div" value={selectedMusicTypes} onChange={(newValue) => {
                                setSelectedMusicTypes(newValue);
                                handleMusicChange(newValue)
                            }}
                            >
                                <Combobox.Label
                                    className="block text-sm font-medium leading-6 text-gray-900">Muzyka</Combobox.Label>
                                <div className="relative mt-2">
                                    <Combobox.Input
                                        required={requiredState}

                                        className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(event) => setMusicQuerry(event.target.value)}
                                        displayValue={(x) => x?.name}
                                    />
                                    <Combobox.Button
                                        className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                    </Combobox.Button>

                                    {filteredMusicCollection.length > 0 && (<Combobox.Options
                                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {filteredMusicCollection.map((item) => (<Combobox.Option

                                            key={item.id}
                                            value={item}
                                            className={({active}) => classNames('relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900')}
                                        >
                                            {({active, selected}) => (<>
                                                <div className="flex items-center">
                                                            <span
                                                                className={classNames('truncate', selected && 'font-semibold')}>{item.name}</span>
                                                </div>

                                                {selected && (<span
                                                    className={classNames('absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600')}
                                                >
                        <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                      </span>)}
                                            </>)}
                                        </Combobox.Option>))}
                                    </Combobox.Options>)}
                                </div>
                            </Combobox>


                            {data.music && data.music.length >= 1 && (<>
                                <div>
                                    <p className="text-sm leading-6 text-gray-600">{data.music.length > 1 ? 'Wybrane Typy Muzyki' : 'Wybrany Typ Muzyki'}</p>
                                    <div className={"flex gap-2 mt-2"}>
                                        {data.music.map((item, index) => {
                                            return (<button type="button"
                                                            onClick={() => removeMusicFromArray(item.id)}
                                                            className="rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                {item.name}
                                            </button>)
                                        })}
                                    </div>
                                </div>

                            </>)}

                        </div>


                    </div>
                </div>


                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Restrykcje</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Wszelkie restrykcje dotyczące wydarzenia.
                    </p>

                    <div className="mt-10 space-y-10">
                        <fieldset>
                            <div className="space-y-6">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="ageRestriction"
                                            name="ageRestriction"
                                            type="checkbox"
                                            onChange={(event) => saveData(event.target.id, event.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="ageRestriction" className="font-medium text-gray-900">
                                            +18
                                        </label>
                                        <p className="text-gray-500">Wydarzenie dla osób pełnoletnich.</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="extraRestriction1"
                                            name="extraRestriction1"
                                            onChange={(event) => saveData(event.target.id, event.target.checked)}
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="extraRestriction1" className="font-medium text-gray-900">
                                            Restrykcja 2
                                        </label>
                                        <p className="text-gray-500">Opis restrykcji 2.</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="extraRestriction2"
                                            onChange={(event) => saveData(event.target.id, event.target.checked)}
                                            name="extraRestriction2"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="extraRestriction2" className="font-medium text-gray-900">
                                            Restrykcja 3
                                        </label>
                                        <p className="text-gray-500">
                                            Opis restrykcji 3.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </fieldset>


                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">
                                Typ wydarzenia
                            </legend>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Określa czy wydarzenie ma się być
                                szczególnie wyróżnione w aplikacji.</p>
                            <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="premium-event"
                                        name="event-label"
                                        type="radio"
                                        required={requiredState}
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        onChange={(event) => saveData(event.target.id, null)}

                                    />
                                    <label htmlFor="premium-event"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Polecane wydarzenie
                                    </label>
                                </div>

                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="regular-event"
                                        name="event-label"
                                        type="radio"
                                        required={requiredState}

                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        onChange={(event) => saveData(event.target.id, null)}
                                    />
                                    <label htmlFor="regular-event"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Zwykłe wydarzenie
                                    </label>
                                </div>

                            </div>
                        </fieldset>
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
                    Dodaj wydarzenie
                </button>
            </div>

            <div>
                <pre>
                        {JSON.stringify(data, null, 2)}
                </pre>
            </div>
        </form>

    )
}
