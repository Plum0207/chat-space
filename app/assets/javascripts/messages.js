$(function(){
  function buildHTML(message){
    let htmlUpperInfo = `<div class="message" data-message_id="${message.id}">
                          <div class="message__upper-info">
                            <div class="message__upper-info__talker">
                            ${message.user_name}
                            </div>
                            <div class="message__upper-info__date">
                            ${message.created_at}
                            </div>
                          </div>`
    if(message.content && message.image.url) {
      let html = htmlUpperInfo +
                         `<div class="message__lower-info">
                              <p class="message__lower-info__content">
                              ${message.content}
                              </p>
                              <img class="message__lower-info_image" src="${message.image.url}">
                            </div>
                          </div>`
      return html;
    } else if (message.content) {
      let html = htmlUpperInfo +
                         `<div class="message__lower-info">
                              <p class="message__lower-info__content">
                              ${message.content}
                              </p>
                            </div>
                          </div>`
      return html;
    } else if(message.image.url) {
      let html = htmlUpperInfo +
                         `<div class="message__lower-info">
                            <img class="message__lower-info_image" src="${message.image.url}">
                            </div>
                          </div>`
      return html;
    }
  };

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      let html = buildHTML(message);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      $('#message_content').val('');
    })
    .fail(function(){
      alert('エラー');
    })
    .always(function(){
      $('.submit-btn').removeAttr('disabled');
    });
  });

  let reloadMessages = function(){
    let last_message_id = $(".message").last().data("message_id");
    $.ajax({
      type: 'GET',
      url: 'api/messages#index {:format=>"json"}',
      data: { id: last_message_id },
      dataType: 'json',
    })
    .done(funciton(messages){

    })
    .fail(funciton(){

    });
  };
});
