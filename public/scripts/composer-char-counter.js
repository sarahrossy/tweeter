$(document).ready(function () {

$('#tweet-text').on("input", function(){
  // console.log(this.value); // this is the DOM element
  const $tweetText = $(this);
  const form = $tweetText.closest('form');
  const counter = form.find('.counter');
  const tweet = $tweetText.val().length;
  const charCounter = (140 - tweet);
  //innerHTML = granted edit access!
  counter.html(charCounter);
  
  if (charCounter < 0) {
    counter.addClass('redText');
  } else {
    counter.removeClass('redText');
  }
})

});