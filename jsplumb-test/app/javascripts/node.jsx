var Node = React.createClass({
  style: function() {
    return ({
      top: this.props.data.y,
      left: this.props.data.x
    });
  },
  render: function() {
    var style = {
      top: this.props.data.y,
      left: this.props.data.x
    };
    // TODO: position the element...
    return (
      <div className="elm" style={style}>
        <div className="img-background">
          <img src={this.props.data.image}/>
        </div>
        <div className="node-title">{this.props.data.title}</div>
      </div>
    );
  }
});

module.exports = Node;