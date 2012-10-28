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
      $('#status').appendLine('click!') ;
    })
  }) ;
  
})(jQuery) ;