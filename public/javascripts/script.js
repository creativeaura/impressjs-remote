(function($) {
  var enter_button = $('#enter_session'),
    session_id,
    url = '',
    prevBtn = $('#prev_btn'),
    nextBtn = $('#next_btn'),
    socket;

  if (enter_button.length > 0) {
    enter_button.bind('click', function(event) {
      session_id = $('#session_id').val();
      if (session_id !== '') {
        location.href = url + 'session/' +  session_id;
      } else {
        alert('Please enter a valid session id and try again.');
      }
    });
  }

  if (prevBtn.length > 0) {
    socket = io.connect(url);

    prevBtn.bind('click', function(event) {
      socket.emit('command', {command: 'prev', key: presentation_key});
    });

    nextBtn.bind('click', function(event) {
      socket.emit('command', {command: 'next', key: presentation_key });
    });
  }


})(jQuery);

