import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, ImageUrl, newsurl, author, time, source } =
      this.props;
    return (
      <div>
        <div className="card">
          <img
            src={ImageUrl || "/assets/NewsImage.png"}
            onError={(e) => (e.target.src = "/assets/NewsImage.png")}
            className="card-img-top"
            alt="News Thumbnail"
          />

          <div className="card-body">
            <h5 className="card-title">{title ? title : "Untitled"}</h5>
            <p className="card-text">
              {description ? description : "No description available"}
            </p>
            <p className="card-text">
              <small className="text-body-secondary">
                Last updated by {author} on {new Date(time).toGMTString()}
              </small>
            </p>
            <span
              className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
              style={{ left: "88%" }}
            >
              {source?.name ? source.name : "Unknown Source"}
            </span>

            <a
              href={newsurl}
              target="_blank"
              className="btn btn-dark"
              rel="noreferrer"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
