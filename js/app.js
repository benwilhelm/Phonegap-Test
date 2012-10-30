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
        document.getElementById('test_me').addEventListener('click', this.test_code, true);
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

    },
    scan: function() {

        try {
            window.plugins.barcodeScanner.scan(function(args) {

                /*
                if (args.format == "QR_CODE") {
                    window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
                }
                */

                app.print_code(args.text,args.format,true) ;
        });
        } catch (ex) {
            $('#status').append(ex.message + '<br>');
            $("#status").append("Sample Code:<br>") ;
            app.print_code("9876543","EAN_8") ;
        }
    },
    print_code: function(txt,tp,clr) {
      if (clr) {
        $('#status').html('') ;
      }

      var bcType = tp.toLowerCase() ;
      bcType = bcType.replace('_','') ;
      $bc = $('#bc') ;
      $bc.barcode(txt,bcType,{barWidth:2,barHeight:100}) ;
      var w = $bc.width() ;
      //$bc.css('width',w) ;
    },
    test_code: function() {
      app.print_code("9876543","EAN_8") ;
    },
    quit: function() {
      navigator.app.exitApp() ;
    }

};