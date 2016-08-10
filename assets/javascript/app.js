var topics_array = [''];


$('#add_topic').on('click', function() {

	var topic_name = $('#topic').val().trim();

	for(var i = 0; i < topics_array.length; i++) {

		if(topics_array[i] == topic_name) {

			return false;

		}

	}

	$('<button>').attr({id: topic_name})
				.addClass('topic btn btn-default')
				.html(topic_name)
				.appendTo('#buttons_display');

	topics_array.push(topic_name);

	return false;

});


$('#buttons_display').on('click', '.topic', function() {

	$('#gifs_display').html('');

	var queryURL = "https://api.giphy.com/v1/gifs/search?q="
					+ $(this).attr('id')
					+ "&api_key=dc6zaTOxFJmzC"
					+ "&limit=10";

	$.ajax({url: queryURL, method: 'GET'})

	.done(function(response) {

		console.log(response);

		for(var i = 0; i < 9; i++) {

			var latest_div = $('<div>').css('display', 'inline')
									.addClass('col-lg-4 col-md-4 col-sm-6 col-xs-12')
									.appendTo('#gifs_display');

			var rating = response.data[i].rating;

			$('<h4>').html('Rating: '+rating)
					.appendTo(latest_div);

			var imageUrl = response.data[i].images.fixed_width.url;

			var new_image = $("<img>").addClass('gif  img-rounded img-responsive');

			var stillUrl = imageUrl.slice(0, imageUrl.length-4) + '_s' + imageUrl.slice(-4);

			new_image.attr({
				src: stillUrl,
				alt: 'topic image',
				'data-state': 'still',
				'data-animate': imageUrl,
				'data-still': stillUrl
				});

			$(latest_div).append(new_image);

		}

	});

	return false;


});


$('#gifs_display').on('click', '.gif', function() {

	var state = $(this).attr('data-state');
	var still = $(this).attr('data-still');
	var animate = $(this).attr('data-animate');

	$(this).attr('src', state === 'still' ? animate : still);
	$(this).attr('data-state', state === 'still' ? 'animate' : 'still');

});
