// tutorial10.js
var LibraryCard = require('./library_card');
var LibraryList = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  loadLocalData: function() {
    $.ajax({
        url: this.props.localUrl,
        dataType: 'json',
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
  },

  loadGoogleSheet: function() {
    var sheetUrl = "https://docs.google.com/spreadsheets/d/1HH1tsLKopqA0l4U0EiOHTo50rpnm9BrSbqKn8bTbqh0/pubhtml?gid=532028845&single=true";
    Tabletop.init({ 
      key: sheetUrl,
      callback: function(data, tabletop){this.setState({data:data});}.bind(this) ,
      simpleSheet: true 
    });    
  },

  componentDidMount: function() {
    this.loadLocalData();
    this.loadGoogleSheet();
    this.interval = setInterval(this.loadGoogleSheet,5000);
  },

  componentWillunmount: function() {
    clearInterval(this.interval);
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
  <LibraryList localUrl="libraries.json"/>,
  document.getElementById('library')
);

module.exports = LibraryList;