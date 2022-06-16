import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export default class Mainpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
      episode: [],
      character: [],
      bgimgloc: "url('https://i.ytimg.com/vi/cFq_XD6ltB8/maxresdefault.jpg')",
      bgimgchar:
        "url('https://camo.githubusercontent.com/3183122085f4fcef6c3e537e0f6e03d6175913d9e8b0304f93147625f87c0ec3/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a6a353558477958345a47696d64306d6a4765595851512e706e67')",
      bgimgep: "url('https://cdn.mos.cms.futurecdn.net/h4F9sAFM7FCP4pdwFz9ngW.jpg')",
    };
  }

  componentDidMount() {
    Axios.get("https://rickandmortyapi.com/api/episode").then((result) =>
      this.setState({
        episode: result.data.info,
      })
    );
    Axios.get("https://rickandmortyapi.com/api/location").then((result) =>
      this.setState({
        location: result.data.info,
      })
    );
    Axios.get("https://rickandmortyapi.com/api/character").then((result) =>
    this.setState({
      character: result.data.info,
    })
  )}

  render() {
    return (
      <div className="container wrapper">
        <div className="row">
          <div className="col text-center mb-5">
            <h1 className="display-4 mb-3">The Rick and Morty</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
            <Link to={`/location`}>
              <div style={{ backgroundImage: this.state.bgimgloc }} className="card card-has-bg border-danger">
                <div className="card-img-overlay">
                  <div className="card-body text-center">
                    <h3 className="text-light">LOCATİONS</h3>
                  </div>
                  <div className="card-body">
                    <h5 className="text-light">Count: {this.state.location.count}</h5>
                    <h5 className="text-light">Page: {this.state.location.pages}</h5>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
            <Link to={`/character`}>
              <div style={{ backgroundImage: this.state.bgimgchar }} className="card card-has-bg border-danger">
                <div className="card-img-overlay">
                  <div className="card-body text-center">
                    <h3 className="text-light">CHARACTERS</h3>
                  </div>
                  <div className="card-body">
                    <h5 className="text-light">Count: {this.state.character.count}</h5>
                    <h5 className="text-light">Page: {this.state.character.pages}</h5>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
            <Link to={`/episode`}>
              <div style={{ backgroundImage: this.state.bgimgep }} className="card card-has-bg border-danger">
                <div className="card-img-overlay">
                  <div className="card-body text-center">
                    <h3 className="text-light">EPİSODES</h3>
                  </div>
                  <div className="card-body">
                    <h5 className="text-light">Count: {this.state.episode.count}</h5>
                    <h5 className="text-light">Page: {this.state.episode.pages}</h5>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
document.body.style.overflow='auto'
