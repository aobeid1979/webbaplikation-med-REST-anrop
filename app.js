// Hämta och visa poster från API
let characters;
let episodes;

(async () => {
	characters = await API.getCharacters();
	characters.forEach(addCharacterToPage);

	episodes = await API.getEpisodes();
	episodes.forEach(addEpisodeToPage);
})();

// Funktion för att lägga till karaktärer på sidan
const charactersContainer = document.getElementById("characters");

function addCharacterToPage(character) {
	const characterElement = document.createElement("div");
	characterElement.id = character.id;
	characterElement.innerHTML = `
        <div class="character-card"">
            <h3 class="character-name">${character.name.first} ${character.name.middle} ${character.name.last}</h3>
            <p class="character-info">Age: <span>${character.age}</span></p>
            <p class="character-info">Gender: <span>${character.gender}</span></p>
            <p class="character-info">Species: <span>${character.species}</span></p>
            <p class="character-info">Home Planet: <span>${character.homePlanet}</span></p>
            <p class="character-info">Occupation: <span>${character.occupation}</span></p>
        </div>`;

	characterElement.addEventListener("click", function () {
		const result = characters.find((c) => c.id === character.id);

		const modal = document.createElement("div");
		modal.classList.add("modal");

		const modalContent = document.createElement("div");
		modalContent.classList.add("modal-content");

		const image = document.createElement("img");
		image.src = result.images.main;
		modalContent.appendChild(image);

		const details = document.createElement("p");
		details.innerHTML = `
        Name: ${result.name.first} ${result.name.middle} ${result.name.last} <br>
        Age: ${result.age} <br>
        Gender: ${result.gender} <br>
        Species: ${result.species} <br>
        Home Planet: ${result.homePlanet} <br>
        Occupation: ${result.occupation}
    `;
		modalContent.appendChild(details);
		const quotes = document.createElement("p");
		const randomQuotes = result.sayings.sort(() => 0.5 - Math.random()).slice(0, 5);
		quotes.innerHTML = `Quotes: <br> ${randomQuotes.join("<br>")}`;
		modalContent.appendChild(quotes);

		const button = document.createElement("button");
		button.classList.add("delete-button");
		button.innerHTML = "Delete";
		button.addEventListener("click", function () {
			modal.remove();
			deleteCharacter(result.id);
		});
		modalContent.appendChild(button);

		const editForm = document.createElement("form");
		editForm.innerHTML = `
        <label for="editName">Name:</label>
        <input type="text" id="editName" name="editName" value="${result.name.first}">
        <label for="editHome">Home Planet:</label>
        <input type="text" id="editHome" name="editHome" value="${result.homePlanet}">
				`;

		editForm.addEventListener("submit", function (event) {
			modal.remove();
			event.preventDefault();
			UpdateCharacter(result.id);
			console.log("Update");
		});
		modalContent.appendChild(editForm);

		const editButton = document.createElement("button");
		editButton.classList.add("edit-button");
		editButton.innerHTML = "Edit";
		editButton.addEventListener("click", function () {
			UpdateCharacter(result.id);
			modal.remove();
		});
		modalContent.appendChild(editButton);

		modal.appendChild(modalContent);
		document.body.appendChild(modal);
		modal.addEventListener("click", function (event) {
			if (event.target === modal) {
				modal.remove();
			}
		});
	});

	charactersContainer.appendChild(characterElement);
}

// Funktion för att lägga till avsnitt på sidan
const episodesContainer = document.getElementById("episodes");

function addEpisodeToPage(episode) {
	const episodeElement = document.createElement("div");
	episodeElement.innerHTML = `
        <div class="episode-card" id="${episode.id}">
            <h3 class="episode-title">${episode.title}</h3>
            <p class="episode-info">Nummer: <span>${episode.number}</span></p>
            <p class="episode-info">Författare: <span>${episode.writers}</span></p>
            <p class="episode-info">Original sändningsdatum: <span>${episode.originalAirDate}</span></p>
            <p class="episode-info">Beskrivning: <span>${episode.desc}</span></p>
        </div>`;

	episodeElement.addEventListener("click", function () {
		const result = episodes.find((e) => e.id === episode.id);

		const modal = document.createElement("div");
		modal.classList.add("modal");

		const modalContent = document.createElement("div");
		modalContent.classList.add("modal-content");

		const details = document.createElement("div");
		details.classList.add("episode-details");
		details.innerHTML = `
    <h2>${result.title}</h2>
    <p><strong>Number:</strong> ${result.number}</p>
    <p><strong>Writers:</strong> ${result.writers}</p>
    <p><strong>Original Air Date:</strong> ${result.originalAirDate}</p>
    <p><strong>Description:</strong> ${result.desc}</p>
`;
		modalContent.appendChild(details);

		const editForm = document.createElement("form");
		editForm.innerHTML = `
    <label for="editTitle">Title:</label>
    <input type="text" id="editTitle" name="editTitle" value="${episode.title}">
    <label for="editSeason">Nummer:</label>
    <input type="text" id="editSeason" name="editSeason" value="${episode.number}">
    <label for="editEpisodes">Description:</label>
    <input type="text" id="editEpisodes" name="editEpisodes" value="${episode.desc}">
    <input type="submit" value="Update">`;
		editForm.addEventListener("submit", function (event) {
			event.preventDefault();
			UpdateEpisode(episode.id);
		});
		modalContent.appendChild(editForm);

		modal.appendChild(modalContent);

		document.body.appendChild(modal);

		modal.addEventListener("click", function (event) {
			if (event.target === modal) {
				modal.remove();
			}
		});
	});
	episodesContainer.appendChild(episodeElement);
}

function deleteCharacter(characterId) {
	const character = document.getElementById(characterId);
	character.remove();
}

//create new character
document.getElementById("charForm").addEventListener("submit", function (event) {
	event.preventDefault();

	const charName = document.getElementById("charName").value;
	const charHome = document.getElementById("charHome").value;
	const id = new Date().getTime();
	const character = {
		id,
		name: { first: charName },
		homePlanet: charHome,
		age: "",
		gender: "",
		species: "",
		occupation: "",
		sayings: [],
	};
	characters.push(character);
	this.reset();

	const newCharElement = document.createElement("div");
	newCharElement.id = id;
	newCharElement.innerHTML = `
    <div class="character-card">
      <h3 class="character-name">${charName}</h3>
      <p class="character-info">Home Planet: <span>${charHome}</span></p>
    </div>`;
	document.getElementById("characters").appendChild(newCharElement);
	newCharElement.addEventListener("click", function () {
		const modal = document.createElement("div");
		modal.classList.add("modal");

		const modalContent = document.createElement("div");
		modalContent.classList.add("modal-content");

		const details = document.createElement("p");
		details.innerHTML = `
        Name: ${charName} <br>
        Home Planet: ${charHome} 
    `;
		modalContent.appendChild(details);

		const button = document.createElement("button");
		button.classList.add("delete-button");
		button.innerHTML = "Delete";
		button.addEventListener("click", function () {
			modal.remove();
			deleteCharacter(id);
		});
		modalContent.appendChild(button);

		const editForm = document.createElement("form");
		editForm.innerHTML = `
        <label for="editName">Name:</label>
        <input type="text" id="editName" name="editName" value="${charName}">
        <label for="editHome">Home Planet:</label>
        <input type="text" id="editHome" name="editHome" value="${charHome}">
				`;

		editForm.addEventListener("submit", function (event) {
			event.preventDefault();
			modal.remove();
			UpdateCharacter(id);
		});
		modalContent.appendChild(editForm);

		const editButton = document.createElement("button");
		editButton.classList.add("edit-button");
		editButton.innerHTML = "Edit";
		editButton.addEventListener("click", function () {
			UpdateCharacter(id);
			modal.remove();
		});
		modalContent.appendChild(editButton);

		modal.appendChild(modalContent);
		document.body.appendChild(modal);
		modal.addEventListener("click", function (event) {
			if (event.target === modal) {
				modal.remove();
			}
		});
	});
});

//create episode
document.getElementById("epiForm").addEventListener("submit", function (event) {
	event.preventDefault();

	const epiTitle = document.getElementById("epiTitle").value;
	const epiSeason = document.getElementById("epiSeason").value;
	const epiEpisode = document.getElementById("epiEpisode").value;
	this.reset();

	const newCharElement = document.createElement("div");
	newCharElement.innerHTML = `
    <div class="episode-card">
      <h3 class="episode-title">${epiTitle}</h3>
      <p class="episode-info">Nummer: <span>${epiSeason + " - " + epiEpisode}</span></p>
    </div>`;
	document.getElementById("episodes").appendChild(newCharElement);
});

//Update the original characters
function UpdateCharacter(characterId) {
	// Find the character object in the characters array
	const character = characters.find((c) => c.id === characterId);
	if (!character) {
		console.error(`No character found with id ${characterId}`);
		return;
	}

	// Update the character object
	const charName = document.getElementById("editName").value;
	const charHome = document.getElementById("editHome").value;
	character.name.first = charName;
	character.homePlanet = charHome;

	// Find the character element in the DOM
	const characterElement = document.getElementById(characterId);
	if (!characterElement) {
		console.error(`No character element found with id ${characterId}`);
		return;
	}

	// Update the character element
	characterElement.innerHTML = `
        <div class="character-card">
            <h3 class="character-name">${charName}</h3>
            <p class="character-info">Age: <span>${character.age}</span></p>
            <p class="character-info">Gender: <span>${character.gender}</span></p>
            <p class="character-info">Species: <span>${character.species}</span></p>
            <p class="character-info">Home Planet: <span>${charHome}</span></p>
            <p class="character-info">Occupation: <span>${character.occupation}</span></p>
        </div>`;
}

function UpdateEpisode(episodeId) {
	// Find the episode element in the DOM
	const episodeElement = document.getElementById(episodeId);
	if (!episodeElement) {
		console.error(`No episode element found with id ${episodeId}`);
		return;
	}

	// Update the episode details
	const episodeTitle = document.getElementById("editTitle").value;
	const episodeNumber = document.getElementById("editSeason").value;
	const episodeDesc = document.getElementById("editEpisodes").value;

	// Update the episode element
	episodeElement.innerHTML = `
        <h2>${episodeTitle}</h2>
        <p><strong>Number:</strong> ${episodeNumber}</p>
        <p><strong>Description:</strong> ${episodeDesc}</p>
    `;
}
