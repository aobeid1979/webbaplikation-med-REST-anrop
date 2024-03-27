// Hämta och visa poster från API
let characters;
let episodes;
let questions;

(async () => {
	characters = await API.getCharacters();
	characters.forEach(addCharacterToPage);

	episodes = await API.getEpisodes();
	episodes.forEach(addEpisodeToPage);

	questions = await API.getQuestions();
	questions.forEach(addQuestionToPage);
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

// Funktion för att lägga till frågor på sidan
const questionsContainer = document.getElementById("questions");

function addQuestionToPage(question) {
	const questionElement = document.createElement("div");
	questionElement.innerHTML = `
        <div class="question-card" id="${question.id}">
            <h3 class="question-title">${question.question}</h3>
            <p class="question-info">Möjliga svar: <span>${question.possibleAnswers.join(
							", "
						)}</span></p>
            <p class="question-info">Korrekt svar: <span>${question.correctAnswer}</span></p>
        </div>`;

	questionsContainer.appendChild(questionElement);
}


function deleteCharacter(characterId) {
	const character = document.getElementById(characterId);
	character.remove();
}



//create new character
document.getElementById('charForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const charName = document.getElementById('charName').value;
    const charHome = document.getElementById('charHome').value;

    const CharPostData = {
        charName,
        charHome
    };

    try {
        const response = await fetch('https://da-demo.github.io/api/futurama/characters/',{
            method: 'POST',
            body: JSON.stringify(CharPostData),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const charPost = await response.json();
        console.log('post created:', charPost);
        alert('The post was created, details logged in console.');
    }  catch (error) {
        console.error('Error creating post:', error);
    }
});

//create new character
document.getElementById('charForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const charName = document.getElementById('charName').value;
    const charHome = document.getElementById('charHome').value;

    
    const newCharElement = document.createElement("div");
	newCharElement.innerHTML = `
    <div class="character-card">
            <h3 class="character-name">${charName}</h3>
            <p class="character-info">Home Planet: <span>${charHome}</span></p>
            
        </div>`
    document.getElementById("characters").appendChild(newCharElement);
    
});

//create episode
document.getElementById('epiForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const epiTitle = document.getElementById('epiTitle').value;
    const epiSeason = document.getElementById('epiSeason').value;
    const epiEpisode = document.getElementById('epiEpisode').value;

    const newCharElement = document.createElement("div");
	newCharElement.innerHTML = `
    <div class="episode-card">
            <h3 class="episode-title">${epiTitle}</h3>
            <p class="episode-info">Nummer: <span>${epiSeason +" - "+ epiEpisode}</span></p>
            
        </div>`
    document.getElementById("episodes").appendChild(newCharElement);
});
