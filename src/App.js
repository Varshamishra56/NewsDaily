import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: "",
      progress: 0,
    };
  }
  apikey = process.env.REACT_APP_NEWS_API_KEY;

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  setprogress = (progress) => {
    this.setState({ progress: progress }, () => {
      if (progress === 100) {
        setTimeout(() => {
          this.setState({ progress: 0 });
        }, 500);
      }
    });
  };

  render() {
    return (
      <Router>
        <Navbar onSearch={this.handleSearch} />
        <LoadingBar
          color="#f11946"
          progress={this.state.progress}
          height={5}
          onLoaderFinished={() => this.setprogress(0)}
        />
        <Routes>
          {[
            "general",
            "business",
            "entertainment",
            "health",
            "science",
            "sports",
            "technology",
          ].map((category) => (
            <Route
              key={category}
              path={`/${category === "general" ? "" : category}`}
              element={
                <News
                  setprogress={this.setprogress}
                  category={category}
                  searchQuery={this.state.searchQuery}
                  apikey={this.apikey}
                />
              }
            />
          ))}
        </Routes>
      </Router>
    );
  }
}
