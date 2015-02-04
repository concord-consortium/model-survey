var LibraryCard = React.createClass({
  render: function() {
    var stars = [];
    var starCount = this.props.data.stars || 0;
    var class_name = "no-star"
    for (var i=1; i <= 5; i++) {
      if (i <= starCount) {
        class_name = "star"
      }
      stars.push(<span className={class_name}> ★ </span>);
      class_name = "no-star";
    }

    return (
      <div className="library-card">
        <div className="link">
          <a href={this.props.data.link} target="_blank">
            <div className="name">{this.props.data.name }</div>
            <div className="license">({this.props.data.license})</div>
          </a>
        </div>
        <div className="stars">
          {stars}
        </div>
        <div className="screenshot">
          <a href={this.props.data.link} target="_blank">
            <img src={this.props.data.screenshot}/> 
          </a>
        </div>
        <div className="comment">{this.props.data.comment}</div>
      </div>
    );
  }
});

module.exports = LibraryCard;