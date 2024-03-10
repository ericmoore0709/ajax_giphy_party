function createGif(src) {
    const gif = document.createElement('img');
    gif.src = src;
    gif.classList.add('card', 'm-2');
    gif.style.maxWidth = '200px';
    return gif;
}

$('#search_button').click(async (e) => {
    e.preventDefault();

    const apiKey = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym';
    const searchTerm = $('#search_term').val().trim();

    if (!searchTerm) {
        alert('Search Term is required to search.');
        return;
    }

    await axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}`)
        .then(result => {
            const src = result.data.data[0].images.original.url || '';
            if (!src) {
                alert('Gif not found.');
                return;
            }
            const gif = createGif(src);
            $('#gif_bank').append(gif);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            $('#search_term').val('');
        });

});

$('#clear_all').click((e) => {
    if (confirm("Are you sure you want to clear the gif bank?"))
        $('#gif_bank').empty();
});