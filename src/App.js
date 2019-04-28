import React from 'react';
import base from './config/base';
import Story from './Story/Story';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: []
    };
  }

  componentDidMount() {
    base.bindToState('/v0/newstories', {
      state: 'stories',
      context: this
    });
  }

  render() {
    console.log('rerender:', this.state);

    return (
      <div className="App">
        {this.state.stories.slice(0, 20).map(id => (
          <Story key={id} id={id} />
        ))}
      </div>
    );
  }
}

export default App;
