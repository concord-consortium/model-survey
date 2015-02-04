// tutorial10.js
var LibraryCard = require('./library_card');
var LibraryList = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    var oldLoadData = function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    };

    var showInfo = function(data,tabletop) {
      this.setState({data:data});
    }.bind(this);

    var loadData = function() {
      var sheetUrl = "https://docs.google.com/spreadsheets/d/1HH1tsLKopqA0l4U0EiOHTo50rpnm9BrSbqKn8bTbqh0/pubhtml?gid=532028845&single=true";
      Tabletop.init({ 
        key: sheetUrl,
        callback: showInfo,
        simpleSheet: true 
      });    
    }.bind(this);
    loadData();
    setInterval(loadData,5000);
  },

  render: function() {
    var libraryNodes = this.state.data.sort(function(a,b) {
      return b.stars - a.stars;
    }).map(function (library) {
      return (
        <LibraryCard data={library}/>
      );
    });
    return (
      <div className="libraryNodes">
        {libraryNodes}
      </div>
    );
  }
});

React.render(
  <LibraryList url="libraries.json"/>,
  document.getElementById('library')
);

module.exports = LibraryList;