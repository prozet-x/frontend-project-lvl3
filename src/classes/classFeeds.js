// eslint-disable-next-line no-unused-vars
class Feeds {
  constructor() {
    this.feeds = [];
    this.maxId = 0;
  }

  addNewFeed(url, name) {
    this.feeds.push({
      id: this.maxId,
      url,
      name,
    });
    this.maxId += 1;
  }

  getAllFeedsURLs = () => this.feeds.map((elem) => elem.url);
}

export default Feeds;
