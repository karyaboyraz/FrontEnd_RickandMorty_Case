import React, { Component } from "react";
import { Label, Input, Button } from "reactstrap";
import Axios from "axios";
import { Link } from "react-router-dom";

var status = [
  { label: "Any", value: "" },
  { label: "Alive", value: "Alive" },
  { label: "Dead", value: "Dead" },
  { label: "Unknown", value: "Unknown" },
];
var gender = [
  { label: "Any", value: "" },
  { label: "Female", value: "Female" },
  { label: "Male", value: "Male" },
  { label: "Genderless", value: "Genderless" },
  { label: "Unknown", value: "Unknown" },
];
export default class CharacterListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      character: [],
    };
  }

  componentDidMount() {
    Axios.get("https://rickandmortyapi.com/api/character").then((result) =>
      this.setState({
        character: result.data.results,
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
        character: result.data.results,
        info: result.data.info,
      })
    );
  }

  search = () => {
    var sName = document.getElementById("searchName").value;
    var sType = document.getElementById("searchType").value;
    var sGender = document.getElementById("searchGender").value;
    var sStatus = document.getElementById("searchStatus").value;
    var sSpecies = document.getElementById("searchSpecies").value;
    var apicharacter = `https://rickandmortyapi.com/api/character/?name=${sName}&type=${sType}&species=${sSpecies}&status=${sStatus}&gender=${sGender}`;
    Axios.get(apicharacter).then((result) =>
      this.setState({
        character: result.data.results,
        info: result.data.info,
      })
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3 mt-3">
            <Label for="searchName">Name</Label>
            <Input id="searchName" placeholder="Morty" type="text" />
          </div>
          <div className="col-md-3 mt-3">
            <Label for="searchType">Species</Label>
            <Input id="searchType" placeholder="Human" type="text" />
          </div>
          <div className="col-md-3 mt-3">
            <Label for="searchSpecies">Dimension</Label>
            <Input id="searchSpecies" placeholder="E.g" type="text" />
          </div>
          <div className="col-md-3 row m-0 p-0">
            <div className="col-sm-6 mt-3">
              <Label for="searchStatus">Status</Label>
              <Input id="searchStatus" name="select" type="select">
                {status.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </Input>
            </div>
            <div className="col-sm-6 mt-3">
              <Label for="searchGender">Gender</Label>
              <Input id="searchGender" name="select" type="select">
                {gender.map((gender) => (
                  <option key={gender.value} value={gender.value}>
                    {gender.label}
                  </option>
                ))}
              </Input>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <Button onClick={() => this.search()}>Search</Button>
          </div>
        </div>
        <div className="row">
          {this.state.character.map((char) => (
            <div key={char.id} className="col-md-6 col-lg-4 col-xl-3 py-3 text-decoration-none">
              <Link to={`/character/${char.id}`}>
                <div className="card position-relative">
                  <span className="position-absolute top-0 m-2 start-0 translate-middle badge text-dark">{char.id}</span>
                  <img src={char.image} alt="character-img" className="w-100 card-img-top p-3 pb-0" />
                  <div className="card-body ">
                    <div className="p-3 border border-1">
                      {char.name.length > 21 ?
                        <div data-bs-toggle="tooltip" data-bs-placement="top" title={char.name} className="text-dark h5">{char.name.split(" ")[0].slice(0, 1) + ". " + char.name.split(" ").slice(1).join(" ")}</div>
                        :
                        <div className="text-dark h5">{char.name}</div>
                      }
                      <div>
                        {char.status === "Alive" ? <span className="badge bg-success"> {char.status}</span> : <span className="badge bg-danger"> {char.status}</span>}
                      </div>
                      {char.location.name.length > 30 ?
                        <div data-bs-toggle="tooltip" data-bs-placement="top" title={char.location.name} className="text-dark">{char.location.name.slice(0, 30) + "..."}</div>
                        :
                        <div className="text-dark">{char.location.name}</div>
                      }

                      <ul className="mb-0 list-inline mt-3">
                        <li>
                          <span className="text-dark">Species:</span>
                          <span className="mx-2">{char.species}</span>
                        </li>
                        <li >
                          <span className="text-dark">Gender:</span>
                          <span className="mx-2">{char.gender}</span>
                        </li>
                        <li>
                          <span className="text-dark">Played Episode:</span>
                          <span className="mx-2">{char.episode.length}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
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
