$(function(){

function appendUser(user){
  let html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user.name }</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
              </div>`
  $("#user-search-result").append(html);
}

function appendErrMsgToHTML(msg){
  let html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ msg }</p>
              </div>`
  $("#user-search-result").append(html);
}

function appendUserToGroup(userId, userName){
  let html =`<div class='chat-group-user'>
                <input name='group[user_ids][]' type='hidden' value=${ userId }>
                <p class='chat-group-user__name'>${ userName }</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
            </div>`
  $(".js-add-user").append(html);
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
      if(users.length !==0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  });

$("#user-search-result").on('click', ".user-search-add", function(){
  $(this).parent().remove();
  let userId = $(this).data("user-id");
  let userName = $(this).data("user-name");
  appendUserToGroup(userId, userName);
});
});
