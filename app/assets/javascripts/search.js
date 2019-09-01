$(function(){

function appendUser(user){
  let html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user.name }</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
              </div>`
  $("#user-search-result").append(html)
}

  $("#user-search-field").on("keyup",function(){
    let input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { search: input },
      dataType: 'json'
    })
    .done(function(users){
      $("#user-search-result").empty();
      if(users.lenght !==0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
    })
  });
});