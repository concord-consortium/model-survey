// tutorial10.js
var LibraryCard = require('./library_card');
var LibraryList = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
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