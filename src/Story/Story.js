import React from 'react';
import base from '../config/base';
import './Story.scss';

class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story: {}
    };
  }

  componentDidMount() {
    base.fetch(`/v0/item/${this.props.id}`, {
      context: this,
      then(story) {
        this.setState({ story });
      }
    });
  }

  render() {
    const { story } = this.state;

    return (
      <div className="Story">
        {/* <p>{this.props.id}</p> */}
        <h3>{story.title}</h3>
      </div>
    );
  }
}

export default Story;
