import React, { Component } from "react";
import { Table, Button, Label, Input } from "reactstrap";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default class LocationListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      location: [],
    };
  }

  componentDidMount() {
    Axios.get("https://rickandmortyapi.com/api/location").then((result) =>
      this.setState({
        location: result.data.results,
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
        location: result.data.results,
        info: result.data.info,
      })
    );
  }

  search = () => {
    var sName = document.getElementById("searchName").value;
    var sType = document.getElementById("searchType").value;
    var sDimension = document.getElementById("searchDimension").value;
    var apicharacter = `https://rickandmortyapi.com/api/location/?name=${sName}&type=${sType}&dimension=${sDimension}`;
    Axios.get(apicharacter).then((result) =>
      this.setState({
        location: result.data.results,
        info: result.data.info,
      })
    );
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 mt-3">
            <Label for="searchName">Name</Label>
            <Input id="searchName" placeholder="Earth" type="text" />
          </div>
          <div className="col-md-4 mt-3">
            <Label for="searchType">Type</Label>
            <Input id="searchType" placeholder="Microverse" type="text" />
          </div>
          <div className="col-md-4 mt-3">
            <Label for="searchDimension">Dimension</Label>
            <Input id="searchDimension" placeholder="C-137" type="text" />
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
                <th>Type</th>
                <th>Dimension</th>
              </tr>
            </thead>
            <tbody>
              {this.state.location.map((location) => (
                <tr key={location.id}>
                  <th scope="row">{location.id}</th>
                  <td><Link to={`/location/${location.id}`}>{location.name}</Link></td>
                  <td>{location.type}</td>
                  <td>{location.dimension}</td>
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