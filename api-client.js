const BASE_URL = "https://da-demo.github.io/api/futurama/";

const API_URLS = {
	characters: `${BASE_URL}characters/`,
	episodes: `${BASE_URL}episodes/`,
	questions: `${BASE_URL}questions/`,
};

async function getJson(url) {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Could not get ${url}. \nStatus: ${response.status}`);
	}

	return await response.json();
}

const API = {
	async getCharacters() {
		return await getJson(API_URLS.characters);
	},
	async getCharacterById(id) {
		return await getJson(`${API_URLS.characters}${id}`);
	},
	async getEpisodes() {
		return await getJson(API_URLS.episodes);
	},
	async getQuestionById(id) {
		return await getJson(API_URLS.episodes + id);
	},
	async getQuestions() {
		return await getJson(API_URLS.questions);
	},
	async getEpisodeById(id) {
		return await getJson(API_URLS.episodes + id);
	},
};
