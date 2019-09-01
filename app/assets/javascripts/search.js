$(function(){
  $("#user-search-field").on("keyup",function(){
    let input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { search: input },
      dataType: 'json'
    })
  });
});