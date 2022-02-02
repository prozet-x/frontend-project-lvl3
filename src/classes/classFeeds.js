// eslint-disable-next-line no-unused-vars
class Feeds {
  constructor() {
    this.urls = [];
    this.names = [];
  }

  addNewFeed(url, name) {
    this.urls.push(url);
    this.names.push(name);
  }
}

export default Feeds;
