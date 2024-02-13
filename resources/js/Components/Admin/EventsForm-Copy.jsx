import React, { useRef } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import '../../../css/main.scss'



const EventsFormCopy = () => {

    const [formState, setFormState] = useState({
        name: '',
        type: '',
        startDate: '',
        endDate: '',
        music: [],
        places: [],
        artists: [],
        tickets: '',
        description: '',
        age: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddMusic = () => {
        const { music } = formState;
        const musicGenre = formState.musicInput;

        if (musicGenre) {
            setFormState((prevState) => ({
                ...prevState,
                music: [...music, musicGenre],
                musicInput: '',
            }));
        }
    };


    const handleAddArtist = () => {
        const { artists } = formState;
        const artistName = formState.artistsInput;

        if (artistName) {
            setFormState((prevState) => ({
                ...prevState,
                artists: [...artists, artistName],
                artistsInput: '',
            }));
        }
    };

    const handleAddPlace = () => {
        const { places } = formState;
        const placeName = formState.placesInput;

        if (placeName) {
            age: '',
                setFormState((prevState) => ({
                    ...prevState,
                    places: [...places, placeName],
                    placesInput: '',
                }));
        }
    };




    const ref = useRef(null);

    const handleSubmit = (e) => {
        toast.success('Wydarzenie dodane');
        e.preventDefault();
        console.log(formState);
    };


    const removeFromArray = (array, index) => {
        if (array == "music") {
            const { music } = formState;
            const musicToRemove = music[index];
            const newMusic = music.filter((music) => music !== musicToRemove);
            setFormState((prevState) => ({
                ...prevState,
                music: newMusic,
            }));
        } else if (array == "artist") {
            const { artists } = formState;
            const artistToRemove = artists[index];
            const newArtists = artists.filter((artists) => artists !== artistToRemove);
            setFormState((prevState) => ({
                ...prevState,
                artists: newArtists,
            }));
        } else if (array == "place") {
            const { places } = formState;
            const placeToRemove = places[index];
            const newPlaces = places.filter((places) => places !== placeToRemove);
            setFormState((prevState) => ({
                ...prevState,
                places: newPlaces,
            }));
        }


    }


    const removeMusic = (index) => {
        const { music } = formState;
        const musicToRemove = music[index];
        const newMusic = music.filter((music) => music !== musicToRemove);
        setFormState((prevState) => ({
            ...prevState,
            music: newMusic,
        }));

    };





    return (
        <>
            <div className='wrapper section'>
                <h1>Dodaj wydarzenie</h1>
                <form onSubmit={handleSubmit} className='form'>
                    <div className='line'>

                        <input
                            type="text"
                            name="name"
                            placeholder="Nazwa wydarzenia"
                            onChange={handleInputChange}
                            style={{
                                width: "100%"
                            }}
                        />
                    </div>
                    {/* <input
            type="text"
            name="type"
            placeholder="Typ wydarzenia"
            onChange={handleInputChange}
          /> */}
                    <div className='line'>
                        <select name="age" onChange={handleInputChange} value={formState.age}>
                            <option value="">Wybierz wiek</option>
                            <option value="21">21</option>
                            <option value="18">18</option>
                            <option value="16">16</option>
                        </select>
                        <select name="type" onChange={handleInputChange} value={formState.type}>
                            <option value="">Wybierz typ</option>
                            <option value="Impreza">Impreza</option>
                            <option value="Festiwal">Festiwal</option>
                            <option value="Inne">Inne</option>
                        </select>
                        <input
                            type="datetime-local"
                            name="startDate"
                            placeholder="Data rozpoczęcia"
                            onChange={handleInputChange}
                        />
                        <input
                            type="datetime-local"
                            name="endDate"
                            placeholder="Data zakończenia"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='line'>
                        <input
                            type="text"
                            name="musicInput"
                            placeholder="Typy muzyki"
                            value={formState.musicInput || ''}
                            onChange={handleInputChange}
                        />
                        <button type="button" onClick={handleAddMusic}>
                            Dodaj gatunek muzyczny
                        </button>

                    </div>
                    <ul className='types'>
                        {formState.music.map((genre, index) => (
                            <li onClick={() => removeFromArray("music", index)} style={{ cursor: "Pointer" }} key={index}>{genre}</li>
                        ))}
                    </ul>
                    <div className='line'>
                        <input
                            type="text"
                            name="placesInput"
                            placeholder="Miejsce wydarzenia"
                            value={formState.placesInput || ''}
                            onChange={handleInputChange}
                        />
                        <button type="button" onClick={handleAddPlace}>
                            Dodaj miejsce wydarzenia
                        </button>
                    </div>
                    <ul className='types'>
                        {formState.places.map((place, index) => (
                            <li onClick={() => removeFromArray("place", index)}  style={{ cursor: "Pointer" }} key={index}>{place}</li>
                        ))}
                    </ul>
                    <div className='line'>
                        <input
                            type="text"
                            name="artistsInput"
                            placeholder="Artyści"
                            onChange={handleInputChange}
                        />
                        <button type="button" onClick={handleAddArtist}>
                            Dodaj artystę
                        </button>
                    </div>
                    <ul className='types'>
                        {formState.artists.map((artist, index) => (
                            <li onClick={() => removeFromArray("artist", index)}  style={{ cursor: "Pointer" }} key={index}>{artist}</li>
                        ))}
                    </ul>
                    <div className='line'>

                        <input
                            type="text"
                            name="tickets"
                            placeholder="Bilety"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='line'>
            <textarea
                name="description"
                placeholder="Opis"
                onChange={handleInputChange}
            />
                    </div>
                    <button type="submit">Dodaj wydarzenie</button>
                </form>
            </div>
        </>
    )
}

export default EventsFormCopy
