import React, { Component } from "react";
import { Table, Label, Input, Button } from "reactstrap";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default class EpisodeListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      episode: [],
    };
  }

  componentDidMount() {
    Axios.get("https://rickandmortyapi.com/api/episode").then((result) =>
      this.setState({
        episode: result.data.results,
        info: result.data.info,
      })
    );
  }

  pagination = (e) => {
    var next = this.state.info.next;
    var prev = this.state.info.prev;
    var api;
    e === "next" ? (api = next) : (api = prev);
    Axios.get(api).then((result) =>
      this.setState({
        episode: result.data.results,
        info: result.data.info,
      })
    );
  }

  search = () => {
    var sName = document.getElementById("searchName").value
    var sEpisode = document.getElementById("searchEpisode").value
    var apicharacter = `https://rickandmortyapi.com/api/episode/?name=${sName}&episode=${sEpisode}`
    Axios.get(apicharacter).then((result) =>
      this.setState({
        episode: result.data.results,
        info: result.data.info,
      })
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-3">
            <Label for="searchName">Name</Label>
            <Input id="searchName" placeholder="Pilot" type="text" />
          </div>
          <div className="col-md-6 mt-3">
            <Label for="searchEpisode">Episode</Label>
            <Input id="searchEpisode" placeholder="S01" type="text" />
          </div>
          <div className="d-flex justify-content-end mt-3">
            <Button onClick={() => this.search()}>Search</Button>
          </div>
        </div>
        <div className="row w-100">
          <Table dark hover responsive striped>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Air Date</th>
                <th>Episode</th>
              </tr>
            </thead>
            <tbody>
              {this.state.episode.map((episode) => (
                <tr key={episode.id}>
                  <th scope="row">{episode.id}</th>
                  <td><Link to={`/episode/${episode.id}`}>{episode.name}</Link></td>
                  <td>{episode.air_date}</td>
                  <td>{episode.episode}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <nav className="col-12 justify-content-center d-flex mt-5">
            <ul className="pagination">
              <li className="page-item">
                <button className="page-link cursor" onClick={() => this.pagination("prev")}>Previous</button>
              </li>
              <li className="page-item">
                <button className="page-link cursor" onClick={() => this.pagination("next")}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

