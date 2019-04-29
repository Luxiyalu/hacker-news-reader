class Storage {
  constructor(namespace = 'stories') {
    this.namespace = namespace;

    this.existingStorage = JSON.parse(localStorage.getItem(namespace)) || {
      storyIds: [],
      storyDict: {}
    };
  }

  setLatestStories(storyIds, existingStorage = this.existingStorage) {
    const newStorage = {
      ...existingStorage,
      storyIds: storyIds
    };

    localStorage.setItem(this.namespace, JSON.stringify(newStorage));
    this.existingStorage = newStorage;
  }

  getLatestStories() {
    return this.existingStorage.storyIds;
  }

  setStory(storyId, storyData, existingStorage = this.existingStorage) {
    const { url, title, score, by, time } = storyData;
    const newStorage = {
      ...existingStorage,
      storyDict: {
        ...existingStorage.storyDict,
        [storyId]: { url, title, score, by, time }
      }
    };

    localStorage.setItem(this.namespace, JSON.stringify(newStorage));
    this.existingStorage = newStorage;
  }

  getStoryById(id) {
    return this.existingStorage.storyDict[id];
  }
}

export default new Storage();
