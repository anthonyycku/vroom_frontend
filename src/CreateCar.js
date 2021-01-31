import React from 'react';
import axios from 'axios';

class CreateCar extends React.Component {

  state = {
    model: '',
    price: 0,
    rating: 0,
    type: '',
    image: '',
    company_id: 0,
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios.post("https://vroomies.herokuapp.com/cars", this.state).then(response => {
      this.setState({
        model: '',
        price: 0,
        rating: 0,
        type: '',
        image: '',
        company_id: 0,
      })
    })

  }

  render() {

    return (
      <div className="createCar">
        <h3>Create a Car</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="model">Model:</label>
          <input
            type="text"
            id="model"
            onChange={this.handleChange}
            value={this.state.model} />
          <br />
          <label htmlFor="price">Price:$</label>
          <input
            type="text"
            id="price"
            onChange={this.handleChange}
            value={this.state.price} />
          <br />
          <label htmlFor="rating">Rating:</label>
          <input
            type="text"
            id="rating"
            onChange={this.handleChange}
            value={this.state.rating} />
          <br />
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            onChange={this.handleChange}
            value={this.state.type} />
          <br />
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="type"
            onChange={this.handleChange}
            value={this.state.image} />
          <br />
          <label htmlFor="company_id">company_id:</label>
          <input
            type="text"
            id="company_id"
            onChange={this.handleChange}
            value={this.state.company_id} />
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