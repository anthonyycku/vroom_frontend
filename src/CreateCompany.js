import React from 'react';
import axios from 'axios';
import Main from './Main';
import CharacterCounter from 'react-character-counter';



class CreateCompany extends React.Component {

  state = {
    name: '',
    description: "",
    country: '',
    image: "",
    parent_id: 0,
    showParent: ""
  }



  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,

    })


    if (event.target.id === "showParent") {
      axios.get("https://vroomies.herokuapp.com/companies").then(response => {
        response.data.forEach(entry => {
          if (entry.name.toLowerCase() === this.state.showParent.toLowerCase()) {
            this.setState({
              parent_id: entry.id
            })
          }
        })
        if (response.data.every(entry => entry.name.toLowerCase() !== this.state.showParent.toLowerCase())) {
          this.setState({
            parent_id: 0
          })
        }
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let tempState = { ...this.state };
    delete tempState.showParent;
    axios.post("https://vroomies.herokuapp.com/companies", tempState).then(response => {
      this.setState({
        name: "",
        description: "",
        image: "",
        country: "",
        parent_id: 0,
        showParent: ""
      })
    })
    this.props.gotoPage("main");
  }

  render() {

    return (
      <div className="container-sm createPage">
        <button className="btn btn-warning" onClick={() => this.props.gotoPage("main")}>Back</button>
        <h3>Create a Company</h3>

        <form onSubmit={this.handleSubmit}>
          {/* NAME  */}
          <div className="row">
            <div className="col-sm-6">
              <label className="form-label" htmlFor="name">Company Name</label>
              <input
                required
                className="form-control"
                autoComplete="off"
                type="text"
                maxLength={20}
                placeholder="20 character limit"
                id="name"
                onChange={this.handleChange}
                value={this.state.name} />
              <p style={{ color: "limegreen" }}>{this.state.name.length} / 20 characters</p>
            </div>
          </div>
          <br />
          {/* DESCRIPTION */}
          <div className="row">
            <div className="col-sm-10">
              <label className="form-label" htmlFor="description">Description</label>
              <textarea
                className="form-control"
                required
                autoComplete="off"
                type="text"
                maxLength={400}
                placeholder="400 character limit"
                id="description"
                onChange={this.handleChange}
                value={this.state.description}>
              </textarea>
              <p style={{ color: "limegreen" }}>{this.state.description.length} / 400 characters</p>
            </div>
          </div>
          <br />
          {/* IMAGE */}
          <div className="row">
            <div className="col-sm-6">
              <label className="form-label" htmlFor="image">Image</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                id="image"
                onChange={this.handleChange}
                value={this.state.image} />
            </div>
          </div>
          <br />
          {/* COUNTRY */}
          <div className="row">
            <div className="col-sm-6">
              <label className="form-label" htmlFor="country">Original country</label>

              <input
                className="form-control"
                required
                autoComplete="off"
                type="text"
                maxLength={20}
                placeholder="20 character limit"
                id="country"
                onChange={this.handleChange}
                value={this.state.country} />
              <p style={{ color: "limegreen" }}>{this.state.country.length} / 20 characters</p>
            </div>
          </div>
          <br />
          {/* PARENT_ID */}
          <div className="row">
            <div className="col-sm-6">
              <label className="form-label" htmlFor="showParent">Parent Company</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                id="showParent"
                onChange={this.handleChange}
                value={this.state.showParent} />
            </div>
          </div>
          {/* PARENT ID ALGORITHM */}
          <div>
            {this.state.parent_id !== 0 ?
              <p style={{ color: "limegreen" }}>Success! {this.state.showParent}'s ID is: {this.state.parent_id}</p>
              :
              <p style={{ color: "limegreen" }}>Leave empty if no parent company</p>
            }
          </div>
          <br />
          <input
            className="btn btn-success"
            type="submit"
            value="Create Company" />
        </form>

      </div>
    )
  }

}

export default CreateCompany;