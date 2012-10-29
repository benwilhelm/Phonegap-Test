var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('scan_me').addEventListener('click', this.scan, false);
        document.getElementById('quit_me').addEventListener('click', this.quit, true);
        document.addEventListener("backbutton", this.quit, true) ;
    },
    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    scan: function() {
        console.log('scanning');
        try {
            window.plugins.barcodeScanner.scan(function(args) {
                console.log("Scanner result: \n" +
                    "text: " + args.text + "\n" +
                    "format: " + args.format + "\n" +
                    "cancelled: " + args.cancelled + "\n");
                /*
                if (args.format == "QR_CODE") {
                    window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
                }
                */
                
                var ret = "Format: " + args.format ;
                ret += "<br>Text: " + args.text ;
                $('#status').html(ret) ;
                console.log(args);
        });
        } catch (ex) {
            $('#status').append(ex.message + '<br>');
        }
    },
    quit: function() {
      console.log('quitting') ;
      navigator.app.exitApp() ;
    }

};