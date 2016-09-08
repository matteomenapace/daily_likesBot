# daily_likesBot

An Instagram *growth-hacking* experiment, which will engage users who post media similar to [@daily_monthly](https://www.instagram.com/daily_monthly) through targeted likes.

# Get started

## Stuff you need installed on your computer

This bot is built with [Node.js](https://nodejs.org/) so before you get any further:

1. Go to [nodejs.org](https://nodejs.org/en/download) and download the *installer* for your operating system.
2. Install it..
3. To check if it's installed:  
  * In Terminal / CP, type `node -v` and press the `↲` (Enter) key.
  * If Terminal / CP shows a number, like `v0.10.26` then it means you have version 0.10.26 installed. 

## Stuff you need from Instagram

Imagine the Instagram API is a huge media *library*. Just like you'd need a *library card* to borrow books or DVDs at your local library, in order to *borrow data* from Instagram, you need some sort of identification. Specifically, 2 bits of information:

1. a `client ID`
2. an `access token`

You'll then use your `client ID` and `access token` every time you *call* the Instagram API to get or send data.

### Get your `client ID`

1. Go to [instagram.com/developer/clients/manage](https://www.instagram.com/developer/clients/manage), login and `Register a New Client` 
* In the `Valid redirect URIs` enter `http://localhost:8888`

  `localhost` is a Web server on your own computer (we'll explain how to get one running in a different section of this tutorial)
  
  > The reason you should use `localhost` is for security. In computer networking `localhost` is the web address of the computer you are using. So when Instagram redirects to your `redirect_uri`, all of your sensitive information is passed from Instagram's servers directly to your computer. 
* `Website URL` and `Privacy Policy URL` can be any URL, but you can't leave them blank 
* Make sure to uncheck the `Disable implicit OAuth` box in the `Security` tab.
* Click `Register`
* Copy the `CLIENT ID` here, or at least keep this tab open, you will need the `CLIENT ID` soon.

### Get your `access token`

In 2015 Instagram introduced a more restrictive API which requires `access tokens`. Using the library analogy again, imagine that you can't borrow a book with your library card only, but you need to also enter a password. It's a double security measure.

1. If you haven't yet, start a Web server on your computer using MAMP.
* Paste the following URL into your web browser.
`https://instagram.com/oauth/authorize/?client_id=CLIENT_ID_HERE&redirect_uri=http://localhost:8888&response_type=token&scope=basic+public_content`
 
  Replace `CLIENT_ID_HERE` with your new Instagram client ID, something like `9e73e8622d524ad98db03ea5c745417g`
* Hit enter, and you will connect to Instagram's servers. Instagram will ask you whether you want to grant your client access to your account. 
* Click `Authorize`, then Instagram will redirect your browser to your `localhost`. That page appears broken, but it has a critical bit of data in the URL, which will look similar to this

  `http://localhost:8888/#access_token=3579436711.9e73e52.5019846fa1883bbea22f417db904cf4f`

  Right after `#access_token=` you can grab your access token. Copy the access token here, or at least keep this tab open, you will need it soon.

## OK, got everything installed and Instagram set up

1. **Fork** this repository and *clone* it to your computer.
* Rename `RENAME_ME-config.js`: call it `config.js`.
* Open `config.js` and insert your Instagram `client_id` and `access_token`

  ```js
  module.exports = 
  {
    instagramKeys:
    {
      client_id: '...',
      access_token: '...'
    }
  }
  ```
* Navigate to this folder in Terminal and then run `sudo npm install`.
* Test the bot by running `node index.js`.

<!--

# Pushing your bot to Heroku  

> Heroku (pronounced her-OH-koo) is a cloud application platform. 

This means that instead of running your bot from the Terminal on your computer, you can deploy it to Heroku and it will tweet from there, however many times you want (per hour, day, week..)!

1. Go to [Heroku](https://signup.heroku.com) and sign up for a free account. 
* When asked to specify your primary development language, pick `Node.js`
* Once you're signed up, and download the *Toolbelt*

  ![](https://cdn-images-1.medium.com/max/800/1*0sIWpZeqie3lPkm2gUWZYQ.png)
* Open Terminal (or Command Prompt if you're on Windows), type `heroku` into it and press the `↲` (Enter) key.

  This properly installs Heroku on your computer. You will see a window pop up that looks like this
  
  ![](https://cdn-images-1.medium.com/max/800/1*bVNXZW8boBeyvCHHtgqyZA.png)
  
  Choose `Install`
* Once the installation has finished, type `heroku login` and hit the `↲` (Enter) key.  
* We're going to prep your bot's folder to send to Heroku

  Type `cd`, hit space, then drag the folder from Finder into Terminal (`cd` stands for *change directory*) and press the `↲` (Enter) key.
* Type `heroku create` and hit  `↲` (Enter).  
  
  Here, you're asking Heroku to create a space for Git to deliver your files to.
  
  Terminal should say `Git remote heroku added`.
* <sup>**OPTIONAL**</sup> Let's create a separate branch for your bot on Heroku.   
  
  This will allow you to add your `config.js` file with all your secret Twitter info to a new `heroku` branch, whilst keeping the `master` branch clean and backed-up on GitHub.
  
  `git checkout -b heroku`
  
  Remove `config.js` from `.gitignore`
  
  `git commit -am "Config for Heroku"`
* Now it's time to deploy your bot to Heroku!

  `git push heroku heroku:master`
  
  Terminal should start spitting out a lot of messages, starting from `Counting objects: 57, done.` and finishing with 
  
  ```
  remote: Verifying deploy... done.
  To https://git.heroku.com/YOUR_HEROKU_NAME.git
  * [new branch]      heroku -> master
  ``` 
  
  This means that your bot is deployed. :ok_hand:
* And, for the almost final step, type in `heroku run node index.js` and hit `↲` (Enter).
  
  You're now testing the bot by telling Heroku to run it.   
  If Terminal, after munching your `users` tells you something like `DONE!` followed by a sentence then it means it has tweeted! Go check out your bot's Twitter account and see for yourself.
* Now, the whole thing about Heroku is that you can schedule how often you want it to get your bot to tweet, so you don't have to do it yourself.

  Type in `heroku addons:create scheduler:standard` and hit `↲` (Enter).
  
  If you have not added your card to Heroku, now's the time to do so. In fact, it will prompt you to do so.
  
  Once you've done that, type in `heroku addons:open scheduler` and hit `↲` (Enter). Terminal will open this page
  
  ![](https://cdn-images-1.medium.com/max/800/1*wkh3ViAUyfkXRdrte3t5bQ.png)
  
  Click `Add new job`.
  
  In the filed that starts with `$` type in `node index.js`
  
  The rest is kind of self-explanatory (if you've got so far!).  
  
  Click `Save` and your bot is all set up! :tada:

-->

### License

[![](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/4.0)

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License ](http://creativecommons.org/licenses/by-nc-sa/4.0)
