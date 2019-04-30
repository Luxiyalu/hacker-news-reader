import React from 'react';
import { base, storage, timeSince } from '../../services/';
import './Story.scss';

class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story: {}
    };
  }

  componentDidMount() {
    const { id } = this.props;
    const storedStory = storage.getStoryById(id);

    if (storedStory && Object.keys(storedStory).length) {
      this.setState({ story: storedStory });
    } else {
      base.fetch(`/v0/item/${id}`, {
        context: this,
        then(story) {
          // if fetch result is empty, endpoint has not updated yet. wait 500ms and try again.
          if (story && Object.keys(story).length) {
            this.setState({ story });
            storage.setStory(id, story);
          } else {
            setTimeout(this.componentDidMount.bind(this), 500);
          }
        }
      });
    }
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
          <span>{story.time} </span>
          <span>{timeSince(story.time)}</span>
        </p>
      </div>
    );
  }
}

export default Story;
