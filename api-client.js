const BASE_URL = 'https://jsonplaceholder.typicode.com/';

const API_URLS = {
    users: `${BASE_URL}users`,
    posts: `${BASE_URL}posts`
};

async function getJson(url, start, end){
    const response = await fetch(url);

    if(!response.ok){
        throw new Error (`Could not get ${url}. \nStatus: ${response.status}`);
    }
    const items = await response.json();
    return items.slice(start, end);

}


   
///API 

const API = {
    async getPosts(start = 0, end = 10){
        return await getJson(API_URLS.posts, start, end);
    },
    async getUsers(start = 0, end = 3){
        return await getJson(API_URLS.users, start, end);
    },

}






