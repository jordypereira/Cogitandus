(function ($) {
  'use strict';
  const form = $('#workshopForm');
  const message = $('#contact__msg');

  function done_func(response) {
    console.log(response);
    
    if(response) {
      message.fadeIn().removeClass('alert-danger').addClass('alert-success');
      message.text(response);
      form.find('input:not([type="submit"]), textarea').val('');
    } else {
      message.fadeIn().removeClass('alert-success').addClass('alert-danger');
      message.text('Er ging iets mis. Probeer het nogmaals.');
    }
    setTimeout(function () {
        message.fadeOut();
    }, 2000);
  }

  function fail_func(data) {
    console.log(data);
    
    message.fadeIn().removeClass('alert-success').addClass('alert-danger');
    if(data.responseText) {
      message.text(data.responseText);
    } else {
      message.text('Er ging iets mis. Probeer het nogmaals.');
    }
    setTimeout(function () {
        message.fadeOut();
    }, 2000);
  }

  form.submit(function (e) {
    e.preventDefault();
    const form_data = $(this).serialize();
    
    $.ajax({
        type: 'POST',
        dataType: 'text',
        url: form.attr('action'),
        data: form_data
    })
    .done(done_func)
    .fail(fail_func);
});
})(jQuery);