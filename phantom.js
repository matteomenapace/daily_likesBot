var page = require('webpage').create()
console.log('PhantomJS started')
// console.log(arguments)

/*page.open('https://www.instagram.com/explore/tags/cloudscape', function(status) 
{
  if (status !== 'success') 
  {
    console.log('Unable to access network')
  } 
  else 
  {
    // get links to recent media
    var links = page.evaluate(getRecentLinks) 
    console.log(links.length + ' links found:')
    console.log(' - ' + links.join('\n - '))
  }
  phantom.exit()
})*/

function getRecentLinks() 
{
  var links = document.querySelectorAll('div._nljxa a')
  return Array.prototype.map.call(links, function(element) 
  {
    return 'https://www.instagram.com' + element.getAttribute('href')
  })
}

page.open('https://www.instagram.com/p/BKGy-wBhxB-', function(status) 
{
  if (status !== 'success') 
  {
    console.log('Unable to access network')
  } 
  else 
  {
    page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js', function() 
    {
      page.evaluate(function() 
      {
        var likeButton = $('a._ebwb5._1tv0k')
        console.log(likeButton.text())
        likeButton.click()
      })
      phantom.exit()
    })
  }
})

// 