(async () => {
    const posts = await API.getPosts();
    console.log(posts);
})();

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
        const response = await fetch('Länk',{
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

//create episode
document.getElementById('charForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const epiTitle = document.getElementById('epiTitle').value;
    const epiSeason = document.getElementById('epiSeason').value;
    const epiEpisode = document.getElementById('epiEpisode').value;

    const CharPostData = {
        epiTitle,
        epiSeason,
        epiEpisode
    };

    try {
        const response = await fetch('Länk',{
            method: 'POST',
            body: JSON.stringify(CharPostData),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const epiPost = await response.json();
        console.log('post created:', epiPost);
        alert('The post was created, details logged in console.');
    }  catch (error) {
        console.error('Error creating post:', error);
    }
});