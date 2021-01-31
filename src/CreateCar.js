import React from 'react';
import axios from 'axios';
// import main from './Main';

class CreateCar extends React.Component {

  state = {
    model: '',
    price: 0,
    rating: 0,
    type: '',
    image: '',
    company_id: 0,
    showCompany: ''
  }


  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    })

    if (event.target.id === "showCompany") {
      axios.get("https://vroomies.herokuapp.com/companies").then(response => {
        response.data.forEach(entry => {
          if (entry.name.toLowerCase() === this.state.showCompany.toLowerCase()) {
            this.setState({
              company_id: entry.id
            })
          }
        })
        if (response.data.every(entry => entry.name.toLowerCase() !== this.state.showCompany.toLowerCase())) {
          this.setState({
            company_id: 0
          })
        }
      })
    }
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
        showCompany: ''
      })
    })
    this.props.gotoPage("main")
  }


  render() {

    return (
      <div className="createCar">
        <h3>Create a Car</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="model">Model</label>
          <input
            type="text"
            id="model"
            onChange={this.handleChange}
            value={this.state.model} />
          <br />
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            onChange={this.handleChange}
            value={this.state.price} />
          <br />
          <label htmlFor="rating">Rating</label>
          <input
            type="text"
            id="rating"
            onChange={this.handleChange}
            value={this.state.rating} />
          <br />
          <label htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            onChange={this.handleChange}
            value={this.state.type} />
          <br />
          <label htmlFor="image">Image</label>
          <input
            type="text"
            id="image"
            onChange={this.handleChange}
            value={this.state.image} />
          <br />
          <label htmlFor="showCompany">Company Brand</label>
          <input
            type="text"
            id="showCompany"
            onChange={this.handleChange}
            value={this.state.showCompany} />
          <br />
          <div>
            {this.state.company_id !== 0 ?
              <p style={{ color: "limegreen" }}>{this.state.showCompany}'s ID is: {this.state.company_id}</p>
              :
              null
            }
          </div>
          <input
            type="submit"
            value="Create Car" />
        </form>
      </div>
    )
  }
}

export default CreateCar;