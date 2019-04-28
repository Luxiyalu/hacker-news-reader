import React from 'react';
import base from '../config/base';
import './Story.scss';

class Story extends React.PureComponent {
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

  timeSince(timestamp) {
    const date = new Date(timestamp * 1000);
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) return interval + ' years ago';
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + ' months ago';
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return interval + ' days ago';
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return interval + ' hours ago';
    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + ' minutes ago';
    return 'just now';
  }

  render() {
    const { story } = this.state;

    // No need to go through render if data is not fetched
    if (!Object.keys(story).length) return null;

    return (
      <div className="Story">
        <a href={story.url}>{story.title}</a>
        <p>
          <span>
            {story.score} {story.score <= 1 ? 'point' : 'points'}
          </span>
          <span> by {story.by} </span>
          <span>{this.timeSince(story.time)}</span>
        </p>
      </div>
    );
  }
}

export default Story;
