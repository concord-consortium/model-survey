

class Main
  
  constructor: (jsPlumb) ->
      container = $ "#container"
      elm1 = $ "#elm1"
      elm2 = $ "#elm2"
      elm1.draggable()
      elm2.draggable()

      @myPlumming = jsPlumb.getInstance({
        Container: container
      })

      
      @myPlumming.importDefaults({
        Connector: [ "Bezier",    { curviness: 150 } ],
        Anchors:   [ "TopCenter", "BottomCenter"     ],
        DragOptions : { cursor: 'pointer', zIndex:2000 }
      })
      
      @myPlumming.draggable(jsPlumb.getSelector("#container .elm"), { grid: [20, 20] });
      @myPlumming.connect({
        source: elm1, 
        target: elm2
      })
      
    

jsPlumb = require('javascripts/jsPlumb').jsPlumb
jsPlumb.ready () =>
  new Main(jsPlumb)


module.exports = Main
