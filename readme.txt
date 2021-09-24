How to Run Program: 
 
- Have all the files in the same directory (should be done already, just making sure)
- Start backend server by calling node server.js in the terminal 
- In chrome (or any web-browser except internet explorer), open test.html
- The game should be fully operating at this point

** IMPORTANT NOTE: 

- I occasionally run into an error where the Ready to Play button does not enable. This is because the request to server.js is pending.

        If this happens. keep reloading the page until it works.
        In my experience, it is dependent on how strong my internet connection is.
        If I have slow internet, it takes much longer to load then it normally would.
        Other times, it just fails due to unknown network error. 

- If this issue persists and server.js never resolves its promise, please contact me directly at gabriel.h.cohen@vanderbilt.edu

Reflection: 

I am recently trained in core web development (by Udemy lol),so this project gave me a good chance to test my node, DOM and Bootstrap skills. 
I found creating server.js the easiest part of this project, but the hardest part for me was making a static, fully automated Javascript program to operate as the UI. 
So, I learned so much about the DOM and you can see that gameplay.js is mostly concerned with manipulating the DOM for the game to function 
and for Bootstrap styles to be applied to each element. 
After completing this program, I discovered that this program could have been much much simpler by simply making two seperate HTML files, one for the
instructions and one for the gameplay, but oh well. I worked pretty hard on this so I hope you enjoy it for what it is!
