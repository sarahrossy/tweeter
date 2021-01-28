/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

//// Hard-coded tweets:
// const tweets = [{
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@SirIsaac"
//     },
//   "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//   "created_at": 1461116232227
// },
// {
//   "user": {
//     "name": "Simba",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@RoarinLion93"
//     },
//   "content": {
//       "text": "Hakuna Matata"
//     },
//   "created_at": 1461116232227
// }];

// functions in here need to be in order of use
$(document).ready(function () {
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $('.tweet-container').prepend(createTweetElement(tweet));
      $('#tweets').text(tweet.content.text);
    }
  }

  const loadTweets = function(){
    $.ajax({
      method: 'GET',
        url: '/tweets',
        dataType: 'json'
      }).then(function (result) { 
        $('.tweet-container').empty();
        renderTweets(result);
      })
    };
  
   const createTweetElement = function(tweetObject) {
     const tweet = tweetObject.content.text;
     const handle = tweetObject.user.handle;
     const avatar = tweetObject.user.avatars;
     const name = tweetObject.user.name;
     const tweetElement = `
     <article class="tweet-article">
       <header class="header">
         <div class="username user-profile">
           <img src="${avatar}" alt="${name}" height="60">${name}</div>
           <div class="handle">${handle}</div>
       </header>
         <div id="tweets"></div>
       <footer class="footer">
         <div class="date">10 days ago</div>
         <div class="icons">
         <div><img src="/images/flag2.png" alt="Flag" height="15"></div>
         <div><img src="/images/retweet.png" alt="Retweet" height="12"></div>
         <div><img src="/images/heart.png" alt="Heart" height="15"></div>
         </div>
       </footer>
     </article>
  `
   return tweetElement;
   };
   
   $('#new-tweet-form').on('submit', function(event) {
    event.preventDefault();

    const serializedData = $(this).serialize();
    const lengthCheck = $('#tweet-text').val().length;

    if (lengthCheck > 140) {
      $('#errors').css({display: 'block'}).find('.error-too-long').css({display: 'block'})
    } else if (lengthCheck === 0) {
      $('#errors').css({display: 'block'}).find('.error-empty-msg').css({display: 'block'})
    } else {
     $.ajax({ 
      url: '/tweets',
      method: 'POST',
      data: serializedData
     
   }).then($('#tweet-text').val(""))
   .then(loadTweets())
   .then($('output.counter').text(140))
   .fail(() => console.log("Error!"));
  }
  });
    
    loadTweets();

 });