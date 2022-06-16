import React, { Component } from "react";
import Axios from "axios";

export default class DetailCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    var htmlLink = window.location.href;
    var id = htmlLink.split("/")[4];
    var page = htmlLink.split("/")[3];
    Axios.get(`https://rickandmortyapi.com/api/${page}/${id}`).then((result) =>
      this.setState({
        data: result.data,
      })
    );

  }

  render() {
    const { id, image, name, dimension, residents, characters, species, episode, type, gender, air_date, status, origin } = this.state.data;
    return (
      <div className="container text-dark bg-light p-5">
        <div className="row d-flex justify-content-between">
          <div className="col-md-6">
            {image === undefined ? null : (<div className="mb-4"><img srcSet={image} alt="character-img" /></div>)}
          </div>
          <div className="col-md-6">
            <div className="h3">{name} </div> {status === undefined ? null : (<div className="badge bg-success">{status}</div>)}
            <hr />
            {id === undefined ? null : (<div><span className="h6">İd</span> : {id}</div>)}
            {dimension === undefined ? null : (<div><span className="h6">Dimension</span> : {dimension}</div>)}
            {residents === undefined ? null : (<div><span className="h6">Residents</span> : {residents.length}</div>)}
            {characters === undefined ? null : (<div><span className="h6">Characters</span> : {characters.length}</div>)}
            {episode !== undefined && window.location.href.split("/")[3] !== "character" ? (<div><span className="h6">Episode</span> : {episode}</div>) : null}
            {type === undefined || type === "" ? (<div><span className="h6">Type</span> : <span>Unknown</span></div>) : (<div><span className="h6">Type</span> : {type}</div>)}
            {species === undefined ? null : (<div><span className="h6">Species</span> : {species}</div>)}
            {origin === undefined ? null : (<div><span className="h6">Origin Location</span> : {origin.name}</div>)}
            {gender === undefined ? null : (<div><span className="h6">Gender</span> : {gender}</div>)}
            {air_date === undefined ? null : (<div><span className="h6">Air Date</span> : {air_date}</div>)}
          </div>
          <hr className="mt-5" />
        </div>
      </div>
    );
  }
}
