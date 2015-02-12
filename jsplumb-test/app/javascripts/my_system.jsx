// tutorial10.js
var Node = require('./node');
var MySystem = React.createClass({
  getInitialState: function() { 
    return {
      nodes: [],
      links: []
    }; 
  },

  setupPlumbing: function()   { 
    console.log("Setting up plumbing"); 
    this.plumbing = jsPlumb.getInstance({ Container: $('#container') });
    this.plumbing.importDefaults({
        Connector: [ "Bezier",    { curviness: 150 } ],
        Anchors:   [ "TopCenter", "BottomCenter"     ],
        DragOptions : { cursor: 'pointer', zIndex:2000 },
        DoNotThrowErrors: true
      });
      
    this.plumbing.draggable(jsPlumb.getSelector("#container .elm"), { grid: [20, 20] });
    

    var dynamicAnchors = [ [ 0.2, 0, 0, -1 ],  [ 1, 0.2, 1, 0 ], 
               [ 0.8, 1, 0, 1 ], [ 0, 0.8, -1, 0 ] ];

    this.state.links.map(function(l) {
      var topOrBottom = (l.data.startTerminal == "a") ? "Top" : "Bottom";
      this.plumbing.connect({
        source: this.refs[l.data.startNode].getDOMNode(), 
        target: this.refs[l.data.endNode].getDOMNode(),
        anchor: topOrBottom,
        overlays:[ 
          [ "Arrow", { location: 1.0 }],
          [ "Label", { label:l.data.text, cssClass: "label"} ]
    ],
      });
      // debugger
    }.bind(this));
  },

  loadLocalData: function(callback) {
    $.ajax({
        url: this.props.localUrl,
        dataType: 'json',
        success: function(data) {
          this.migrateData(data);
          this.setupPlumbing();
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
  },

  componentDidMount: function() {
    this.loadLocalData();
  },

  importNodes: function(importNodes) {
    var newNodes = [];
    var node = null;
    for (var key in importNodes) {
      data = importNodes[key]
      newNodes.push({'key': key, 'data':data });
    }
    this.setState({nodes: newNodes});
  },

  importLinks: function(links) {
    var newLinks = [];
    var link = null;
    for (var key in links) {
      data = links[key]
      newLinks.push({'key': key, 'data':data });
    }
    this.setState({links: newLinks});
  },

  migrateData: function(mySystemFormat) {
    var importNodes = mySystemFormat['MySystem.Node'];
    var importLinks = mySystemFormat['MySystem.Link'];
    this.importNodes(importNodes);
    this.importLinks(importLinks);
  },

  render: function() {
    var nodes = this.state.nodes.map(function(node) {
      return (
        <Node key={node.key} data={node.data} ref={node.key}/>
      );
    });
    return (
      <div className="mySystem">
        {nodes}
      </div>
    );
  }
});

jsPlumb = require('javascripts/jsPlumb').jsPlumb
jsPlumb.ready(function(){
  remote_url = "http://mysystem_sc.dev.concord.org/mysystem_designs//7e5c26385bbe26b9643ff84de9005cb6";
  local_url = "my_system_state.json";
  React.render(
    <MySystem localUrl={remote_url} className="my-system"/>,
    document.getElementById('container')

  );
});

module.exports = MySystem;