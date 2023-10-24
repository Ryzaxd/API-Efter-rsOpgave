// event listener for the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function () {
    lazyLoadCharacters();
});

// lazy load characters because the API is very slow!
function lazyLoadCharacters() {
    const characterIds = [11, 3, 10, 14];
    const outputDiv = document.getElementById("output");

    // Initialize Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Fetch character data and additional info when the character becomes visible
                const characterId = entry.target.dataset.characterId;
                fetchCharacterData(characterId)
                    .then(data => fetchAdditionalInfo(data))
                    .then(data => displaySingleStarWarsData(data, outputDiv));
                // Stop observing the element after it's loaded
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Create a placeholder for each character
    characterIds.forEach(characterId => {
        const placeholder = document.createElement('div');
        placeholder.dataset.characterId = characterId;
        outputDiv.appendChild(placeholder);
        observer.observe(placeholder);
    });
}

// Fetch character data from the Star Wars API
function fetchCharacterData(characterId) {
    const apiUrl = `https://swapi.dev/api/people/${characterId}/`;

    // Fetch character data
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        });
}

// Fetch additional info for a character
function fetchAdditionalInfo(data) {
    // Fetch homeworld, films, species, starships, and vehicles in parallel
    const promises = [
        fetch(data.homeworld).then(response => response.json()),
        Promise.all(data.films.map(film => fetch(film).then(response => response.json()))),
        Promise.all(data.species.map(species => fetch(species).then(response => response.json()))),
        Promise.all(data.starships.map(starship => fetch(starship).then(response => response.json()))),
        Promise.all(data.vehicles.map(vehicle => fetch(vehicle).then(response => response.json())))
    ];

    // Return a promise that resolves when all promises are resolved
    return Promise.all(promises)
        .then(([homeworld, films, species, starships, vehicles]) => {
            return {
                ...data,
                homeworld: homeworld.name,
                films: films.map(film => film.title),
                species: species.map(specie => specie.name),
                starships: starships.map(starship => starship.name),
                vehicles: vehicles.map(vehicle => vehicle.name),
            };
        });
}

// Display a single character and their additional info
function displaySingleStarWarsData(data, outputDiv) {
    // Display character data
    outputDiv.querySelector(`[data-character-id="${data.url.split('/').slice(-2, -1)}"]`).innerHTML = `<div class="character">
        <h2>${data.name}</h2>
        <p>Height: ${data.height} cm</p>
        <p>Mass: ${data.mass} kg</p>
        <p>Birth Year: ${data.birth_year}</p>
        <p>Gender: ${data.gender}</p>
        <p>Eye Color: ${data.eye_color}</p>
        <p>Hair Color: ${data.hair_color}</p>
        <p>Skin Color: ${data.skin_color}</p>
        <p>Homeworld: ${data.homeworld}</p>
        <p>Films: ${data.films.join(', ')}</p>
        <p>Species: ${data.species.join(', ')}</p>
        <p>Starships: ${data.starships.join(', ')}</p>
        <p>Vehicles: ${data.vehicles.join(', ')}</p>                      
    </div>`;
}