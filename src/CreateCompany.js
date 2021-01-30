import React from 'react';
import axios from 'axios';

class CreateCompany extends React.Component {

  state = {
    name: '',
    description: [],
    country: '',
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
          if (entry.name === this.state.showParent) {
            this.setState({
              parent_id: entry.id
            })
          }
        })
        if (response.data.every(entry => entry.name !== this.state.showParent)) {
          this.setState({
            parent_id: 0
          })
        }
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios.post("https://vroomies.herokuapp.com/companies", this.state).then(response => {
      this.setState({
        name: '',
        description: [],
        image: '',
        country: '',
        parent_id: 0,
      })
    })
    this.props.gotoPage("main")
  }

  render() {

    return (
      <div className="container-fluid">
        <button className="btn btn-warning" onClick={() => this.props.gotoPage("main")}>Back</button>
        <h3>Create a Company</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={this.handleChange}
            value={this.state.name} />
          <br />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            onChange={this.handleChange}
            value={this.state.description} />
          <br />
          <label htmlFor="image">Image</label>
          <input
            type="text"
            id="image"
            onChange={this.handleChange}
            value={this.state.description} />
          <br />
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            onChange={this.handleChange}
            value={this.state.country} />
          <br />
          <label htmlFor="showParent">Parent Company</label>
          <input
            type="text"
            id="showParent"
            onChange={this.handleChange}
            value={this.state.showParent} />
          <div>
            {this.state.parent_id !== 0 ?
              <p style={{ color: "green" }}>{this.state.showParent}'s ID is: {this.state.parent_id}</p>
              :
              null
            }
          </div>
          <br />
          <input
            type="submit"
            value="Create Company" />
        </form>

      </div>
    )
  }

}

export default CreateCompany;