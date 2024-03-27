// Hämta och visa poster från API
(async () => {
    const characters = await API.getCharacters();
    characters.forEach(addCharacterToPage);

    const episodes = await API.getEpisodes();
    episodes.forEach(addEpisodeToPage);

    const questions = await API.getQuestions();
    questions.forEach(addQuestionToPage);
})();

// Funktion för att lägga till karaktärer på sidan
const charactersContainer = document.getElementById('characters');

function addCharacterToPage(character) {
    const characterElement = document.createElement('div');
    characterElement.innerHTML = `
        <h3>${character.name.first} ${character.name.middle} ${character.name.last}</h3>
        <p>Age: ${character.age}</p>
        <p>Gender: ${character.gender}</p>
        <p>Species: ${character.species}</p>
        <p>Home Planet: ${character.homePlanet}</p>
        <p>Occupation: ${character.occupation}</p>`;

    charactersContainer.appendChild(characterElement);
}

// Funktion för att lägga till avsnitt på sidan
const episodesContainer = document.getElementById('episodes');

function addEpisodeToPage(episode) {
    const episodeElement = document.createElement('div');
    episodeElement.innerHTML = `
        <h3>${episode.title}</h3>
        <p>Nummer: ${episode.number}</p>
        <p>Författare: ${episode.writers}</p>
        <p>Original sändningsdatum: ${episode.originalAirDate}</p>
        <p>Beskrivning: ${episode.desc}</p>`;

    episodesContainer.appendChild(episodeElement);
}

// Funktion för att lägga till frågor på sidan
const questionsContainer = document.getElementById('questions');

function addQuestionToPage(question) {
    const questionElement = document.createElement('div');
    questionElement.innerHTML = `
        <h3>${question.question}</h3>
        <p>Möjliga svar: ${question.possibleAnswers.join(', ')}</p>
        <p>Korrekt svar: ${question.correctAnswer}</p>`;

    questionsContainer.appendChild(questionElement);
}
