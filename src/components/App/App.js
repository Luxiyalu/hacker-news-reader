import React from 'react';
import Story from '../Story/Story';
import { base, storage } from '../../services/';
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
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollHeight - scrollTop - clientHeight < 100) {
      this.setState({ limit: this.state.limit + 20 });
    }
  }

  render() {
    console.log('rerender:', this.state);
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
