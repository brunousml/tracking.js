(function(window){
    'use strict';
    function define_library(){
        var Tracking = {
            /***
             *  This function create cookie node
             *
             *  name: node cookie name
             *  value: Value to set in this name
             *  days: Number of days what you want to live the node value.
             ***/
            createCookie: function (name,value,days) {
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime()+(days*24*60*60*1000));
                    var expires = "; expires="+date.toGMTString();
                }
                else var expires = "";
                document.cookie = name+"="+value+expires+"; path=/";
            },

            /***
             * this function generates the guid
             ***/
            guid: function () {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }

                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            },

            /***
             *  This function read a cookie node
             *
             *  When you want to read a node of cookies. Pass the same name informed in createCookie variable.
             *
             *  name: Name of the node what you want to read
             ***/
            readCookie: function (name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for(var i=0;i < ca.length;i++) {
                    var c = ca[i];
                    while (c.charAt(0)==' ') c = c.substring(1,c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
                }
                return null;
            },

            push:function (id, url) {
                // Data to send
                var data = JSON.stringify({
                    'guid':id,
                    'datetime': new Date().getTime(),
                    'url': document.URL
                })

                // Ajax Call
                var xhttp = new XMLHttpRequest();
                xhttp.open("POST", url, true);
                xhttp.setRequestHeader("Content-Type", "application/json");
                xhttp.send(data);

            }
        };
        return Tracking;
    }

    // Define globally if it doesn't already exist
    if(typeof(Tracking) === 'undefined'){
        // Define the Tracking library globally
        window.Tracking = define_library();

        // If do not exists guid in cookies we create it
        if(Tracking.readCookie('guid') === null){
            Tracking.createCookie('guid', Tracking.guid(), 10);
        }
    }
    else{
        // Warning
        console.log("[WARNING] Tracking already defined.");
    }
})(window);