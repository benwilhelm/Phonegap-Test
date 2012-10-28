(function($){

  $.fn.appendLine = function(msg) {
    return this.each(function(){
      $(this).append(msg + '<br>') ;
    }) ;
  }

  $(document).ready(function(){
    $('#status').appendLine('app ready') ;
    $('#scan_me').click(function(e){
      e.preventDefault() ;

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
          $('#status').html(args.text);
          console.log(args);
        });
      } catch (ex) {
        $('#status').appendLine(ex.message);
      }
    })
  }) ;
  
})(jQuery) ;