# tracking.js

Tracking user navigation on site. 

## Setup
- Include the Tracking.js file to your `<head>`.
- Add the code snippet below just before tag </body>
- Change the Url param to send information to your api. 

```javascript
if(currentPage == undefined){var currentPage = null;}
setInterval(function(){
    if (currentPage != window.location.href){
        currentPage = window.location.href;
        Tracking.push(Tracking.readCookie('guid'), "your-url-here");
    }

}, 100);
```

### The parameters sent
- guid
- url accessed 
- universal datetime
