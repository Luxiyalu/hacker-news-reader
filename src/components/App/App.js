import React from 'react';
import Story from '../Story/Story';
import Header from '../Header/Header';
import { base, storage, debounce } from '../../services/';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 20,
      seenStoriesDict: null,
      stories: storage.getLatestStories() || []
    };
  }

  componentDidMount() {
    base.bindToState('/v0/newstories', {
      state: 'stories',
      context: this,
      then: () => {
        storage.setLatestStories(this.state.stories);
        this.setStoriesAsSeen();
      }
    });

    window.addEventListener('scroll', debounce(this.handleScroll.bind(this)));
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  setStoriesAsSeen(seenStoriesDict = this.state.seenStoriesDict || {}) {
    for (const id of this.state.stories) {
      if (seenStoriesDict[id]) break;
      seenStoriesDict[id] = true;
    }
    this.setState({ seenStoriesDict });
    return seenStoriesDict;
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
    const { stories, limit, seenStoriesDict } = this.state;

    return (
      <div className="hn-app">
        <div className="center">
          <Header />

          <div className="stories-container">
            {stories.slice(0, limit).map((id, i) => (
              <Story
                fresh={seenStoriesDict && !seenStoriesDict[id]}
                key={id}
                id={id}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
