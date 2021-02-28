$(() => {
   
    // Variables

    let database = firebase.database();
    let songs = database.ref('songs');

    // Create - DOM submit event

    $('form').on('submit', (event) => {
        event.preventDefault();
        
        let song = {
            title: $('#song').val(),
            artist: $('#artist').val(),
        };

        $('#song').val('')
        $('#artist').val('')
        $('#year').val('')
        songs.push(song);
    });

    // Read - Firebase event

    songs.on('value', (response) => {
        let songs = response.val();
        let numberOfSongs = response.numChildren()

        $('#playlist').html('');

        $.each(songs, (index, song) => {
            $('#playlist').append(`
                <li class="list-group-item">
                    ${song.title} by ${song.artist}
                    <i class="fa fa-trash pull-right delete" data-index="${index}"></i>
                </li>
            `);
        });
    });

    // Delete - DOM click event
    
    $('#playlist').on('click', '.delete', (event) => {
        let index = $(event.target).data('index');
        console.log(`Deleting ${index}`)
        database.ref(`songs/${index}`).remove(); // This is a firebase function
    });

});

