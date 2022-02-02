// eslint-disable-next-line no-unused-vars
class News {
  constructor() {
    this.news = [];
    this.maxId = 0;
  }

  addOneNews(channelId, url, name) {
    this.news.push({
      id: this.maxId,
      channelId,
      url,
      name,
    });
    this.maxId += 1;
  }
}

export default News;
