var config = require('./config'),
    _ = require('underscore'),
    InstagramAPI = require('instagram-api'),
    instagram = new InstagramAPI(config.instagramKeys.access_token)

// TODO need some form of check for rate limits    

function getSelf()
{
  instagram.userSelf().then(function(result) 
  {
    console.log(result.data) // user info 
    logRemainingRequests(result)
  }, 
  function(err)
  {
    console.log(err) 
  })
}

function getOurLastPosts(howMany, callback)
{
  instagram.userSelfMedia({count:howMany}).then(function(result) 
  {
    // console.log(result.data)
    logRemainingRequests(result)
    var posts = result.data
    callback(null, posts)
  }, 
  function(err)
  {
    console.error(err)
    callback(err) 
  })
}

function getComments(mediaID)
{
  instagram.mediaComments(mediaID).then(function(result) 
  {
    logRemainingRequests(result)
    console.log(result.data) 
  }, 
  function(err)
  {
    console.log(err) 
  })
}

function logRemainingRequests(result)
{
  console.log('Remaining API requests: ' + result.remaining + '/' + result.limit)
}

function extractHashtags(posts)
{
  console.log('Extracting hashtags for ' + posts.length + ' posts')
  var hashtags = []
  // extract all the hashtags from each post
  posts.forEach(function(post)
  {
    // console.log('\t ' + post.caption.text)
    if (post.tags) 
    {
      // console.log('\t ' + post.tags.length + ' hashtags')
      post.tags.forEach(function(tag)
      {
        // console.log('\t\t ' + tag)
        hashtags.push(tag)
      })
    } 
  })
  hashtags = _(hashtags).unique() // remove duplicates
  return hashtags.sort() // sort alphabetically
}

function getRecentlyTaggedPosts(tag, callback)
{
  instagram.getMediasByTag(tag).then(function(result) 
  {
    // console.log(result.data)
    logRemainingRequests(result)
    var posts = result.data
    callback(null, posts)
  }, 
  function(err)
  {
    console.error(err)
    callback(err) 
  })
}

/*getOurLastPosts(3, function(err, posts)
{
  if (!err)
  {
    var hashtags = extractHashtags(posts)
    console.log(hashtags)

    hashtags.forEach(function(hashtag)
    {
      getRecentlyTaggedPosts(hashtag, function(err, posts)
      {
        if (!err)
        {
          console.log('Returned ' + posts.length + ' posts for #' + hashtag)
          posts.forEach(function(post)
          {
            console.log(post.link + ' ' + post.user.username + ' ♥' + post.likes.count + ' 💬' + post.comments.count )

            if (!post.user_has_liked && post.user.username !== 'daily_monthly')
            {
              console.log('We have not liked this post')
            }

            // user_has_liked
            // user
          })
        }
      })
    })
  }  
})*/

// mediaID example: 1331338200027067242_3579436711
// shortcode example: BKG17noB9Db

// var shortcode = 'BKG17noB9Db' // not my picture
var shortcode = 'BJ53QoIhXNq' // one of my pictures
instagram.mediaByShortcode(shortcode).then(function(result) 
{
  console.log(result.data)
  logRemainingRequests(result)
}, 
function(err)
{
  console.log(err) 
})

/*instagram.postMediaLike(mediaID).then(function(result) 
{
  console.log(result.data) // user info 
  logRemainingRequests(result)
}, 
function(err)
{
  console.log(err) 
})*/

