(async () => {
    const posts = await API.getPosts();
    console.log(posts);
})();

