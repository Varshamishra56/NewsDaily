// import React, { Component } from "react";
// import axios from "axios";
// import NewsItem from "./NewsItem";
// import Spinner from "./Spinner";
// import InfiniteScroll from "react-infinite-scroll-component";

// export class News extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       articles: [],
//       loading: false,
//       page: 1,
//       totalResults: 0,
//     };
//     document.title = `${props.category}-NewsMonkey`;
//   }

//   fetchNews = async (page = 1) => {
//     this.setState({ loading: true });

//     try {
//       const category = this.props.category || "general";
//       const query = this.props.searchQuery || "";
//       const url = query
//         ? `https://newsapi.org/v2/everything?q=${query}&apiKey=${apikey}&page=${page}&pageSize=21`
//         : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apikey}&page=${page}&pageSize=21`;

//       const response = await axios.get(url);

//       this.setState((prevState) => ({
//         articles:
//           page === 1
//             ? response.data.articles
//             : prevState.articles.concat(response.data.articles), // Using concat()
//         totalResults: response.data.totalResults,
//         page: page,
//         loading: false,
//       }));
//     } catch (error) {
//       console.error("Error fetching news:", error);
//       this.setState({ loading: false });
//     }
//   };

//   componentDidMount() {
//     this.fetchNews(this.state.page);
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.searchQuery !== this.props.searchQuery) {
//       this.setState({ articles: [], page: 1 }, () => this.fetchNews(1));
//     }
//   }

//   fetchMoreData = () => {
//     if (this.state.articles.length < this.state.totalResults) {
//       this.fetchNews(this.state.page + 1);
//     }
//   };

//   render() {
//     return (
//       <div className="container my-3">
//         <h2 className="text-center" style={{ margin: "40px 0px" }}>
//           NewsMonkey - Your Own News App
//         </h2>
//         <h4>News on {this.props.category}</h4>
//         {this.state.loading && <Spinner />}

//         <InfiniteScroll
//           dataLength={this.state.articles.length}
//           next={this.fetchMoreData}
//           hasMore={this.state.articles.length < this.state.totalResults}
//           loader={<Spinner />}
//         >
//           {!this.state.loading && (
//             <div className="row">
//               {this.state.articles.length > 0 ? (
//                 this.state.articles.map((element) => (
//                   <div className="col-md-4" key={element.url}>
//                     <NewsItem
//                       title={element.title}
//                       description={element.description}
//                       ImageUrl={element.urlToImage}
//                       newsurl={element.url}
//                       author={element.author}
//                       time={element.publishedAt}
//                       source={element.source}
//                     />
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-center">No articles found.</p>
//               )}
//             </div>
//           )}
//         </InfiniteScroll>
//       </div>
//     );
//   }
// }

// export default News;
import React, { Component } from "react";
import axios from "axios";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${props.category} - NewsMonkey`;
  }

  fetchNews = async (page = 1) => {
    this.props.setprogress(30);
    this.setState({ loading: true });

    try {
      const category = this.props.category || "general";
      const query = this.props.searchQuery || "";
      const apikey = this.props.apikey;
      const url = query
        ? `https://newsapi.org/v2/everything?q=${query}&apiKey=${apikey}&page=${page}&pageSize=21`
        : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apikey}&page=${page}&pageSize=21`;

      const response = await axios.get(url);
      this.props.setprogress(70);

      this.setState((prevState) => ({
        articles:
          page === 1
            ? response.data.articles || []
            : prevState.articles.concat(response.data.articles || []),
        totalResults: response.data.totalResults || 0,
        page: page,
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
    this.props.setprogress(100);
  };

  componentDidMount() {
    this.fetchNews(this.state.page);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ articles: [], page: 1 }, () => this.fetchNews(1));
    }
  }

  fetchMoreData = () => {
    if (this.state.articles.length < this.state.totalResults) {
      this.setState(
        (prevState) => ({ page: prevState.page + 1 }),
        () => this.fetchNews(this.state.page)
      );
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h2
          className="text-center"
          style={{ margin: "40px 0px", marginTop: "90px" }}
        >
          NewsMonkey - Your Own News App
        </h2>
        <h4>News on {this.props.category}</h4>

        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="row">
            {this.state.articles.length > 0
              ? this.state.articles.map((element) => (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      ImageUrl={element.urlToImage}
                      newsurl={element.url}
                      author={element.author}
                      time={element.publishedAt}
                      source={element.source}
                    />
                  </div>
                ))
              : !this.state.loading && (
                  <p className="text-center">No articles found.</p>
                )}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
