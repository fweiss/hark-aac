= hark aac

you can hear me now

this app uses vocabularies based on actual data

i've added a cognitive categorization

the count of each word use is made, click the counter button to see

currently written in simple html dom, using only the underscore library

the TTS should work on chrome browser

== cordoba integration
It is packaged with bower to be integrated with cordoba. Follow the example of the index.html which
load the assets and then dynamically load the DOM via XHR.

== vocabulary based on

"Vocabulary-Use Patterns in Preschool Children: Effects of Context and Time Sampling"
Cristine A Marvin, David R Beukelmann, Denise Bilyeu
Augmentative and Alternative Communication, Volume 10, December 1994

Minspeak and Unity, John Halloran
www.prentrom.com
www.minspeak.com

== developer notes
The index.html file is both a local dev resource and example for cordova integration.

The index.html file should be loaded via a web server or a browser that doesn't block
file-based XHR requests.

If you're using IntelliJ, right click index.html and choose open with browser.

You can open index.html form the file system with Safari, which allows file-based XHR
requests.
