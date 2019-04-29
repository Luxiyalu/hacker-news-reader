import React from 'react';
import Story from '../Story/Story';
import { base, storage, debounce } from '../../services/';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 20,
      stories: storage.getLatestStories() || []
    };
  }

  componentDidMount() {
    base.bindToState('/v0/newstories', {
      state: 'stories',
      context: this,
      then: () => {
        storage.setLatestStories(this.state.stories);
      }
    });

    window.addEventListener('scroll', debounce(this.handleScroll.bind(this)));
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollHeight - scrollTop - clientHeight < 100) {
      const oldLimit = this.state.limit;
      this.setState({ limit: oldLimit + 20 });
      this.preload(this.state.stories.slice(oldLimit, oldLimit + 30));
    }
  }

  preload(IDs) {
    IDs.forEach(id =>
      base.fetch(`/v0/item/${id}`, {
        context: this,
        then(story) {
          storage.setStory(id, story);
        }
      })
    );
  }

  render() {
    const { stories, limit } = this.state;

    return (
      <div className="hn-app">
        <header />

        <div className="stories-container">
          {stories.slice(0, limit).map(id => (
            <Story key={id} id={id} />
          ))}
        </div>

        <footer />
      </div>
    );
  }
}

export default App;
