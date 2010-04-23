$(document).ready(function() {
  $("a.fancybox").fancybox({
    'titleShow' : false
  });
  $("a[rel=bookgallery]").fancybox({
    'transitionIn'  : 'none',
    'transitionOut' : 'none',
    'titlePosition' : 'over',
    'titleFormat'   : function(title, currentArray, currentIndex, currentOpts) {
      return '<span id="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
    }
  });
  
  $("#gmap").fancybox({
    'width'         : '75%',
    'height'        : '75%',
    'autoScale'     : false,
    'transitionIn'  : 'none',
    'transitionOut' : 'none',
    'type'          : 'iframe'
  });
});
