import React from 'react';
import axios from 'axios';

class CreateCar extends React.Component {

  state = {
    name: '',
    description: [],
    image: '',
    country: '',
    parent_id: 0,
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios.post("/companies", this.state).then(response => {
      this.setState({
        name: '',
        description: [],
        image: '',
        country: '',
        parent_id: 0,
      })
    })

  }

  render() {

    return (
      <div className="createCar">
        <h3>Create a Car</h3>
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
            value={this.state.image} />
          <br />
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            onChange={this.handleChange}
            value={this.state.country} />
          <br />
          <label htmlFor="parent_id">Parent ID</label>
          <input
            type="text"
            id="parent_id"
            onChange={this.handleChange}
            value={this.state.parent_id} />
          <br />
          <input
            type="submit"
            value="Create Car" />
        </form>
      </div>
    )
  }
}

export default CreateCar;