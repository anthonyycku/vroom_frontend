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

  typeSelect = () => {
    let selectBox = document.getElementById("form-select");
    let selectedItem = selectBox.options[selectBox.selectedIndex].value;
    this.setState({
      type: selectedItem
    })
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
    this.props.gotoPage("company", this.state.company_id)
  }


  render() {

    return (
      <div className="container-sm createPage">
        <button className="btn btn-warning" onClick={() => this.props.gotoPage("main")}>Back</button>
        <h3>Create a Car</h3>

        <form onSubmit={this.handleSubmit}>
          {/* Model */}
          <div className="row">
            <div className="col-sm-6">
              <label className="form-label" htmlFor="model">Model</label>
              <input
                required
                className="form-control"
                autoComplete="off"
                type="text"
                maxLength={20}
                placeholder="20 character limit"
                id="model"
                onChange={this.handleChange}
                value={this.state.model} />
              <p style={{ color: "limegreen" }}>{this.state.model.length} / 20 characters</p>
            </div>
          </div>
          <br />
          {/* Price */}
          <div className="row">
            <div className="col-sm-6">
              <label className="form-label" htmlFor="price">Price</label>
              <input
                className="form-control"
                required
                autoComplete="off"
                type="number"
                id="price"
                maxLength={6}
                onChange={this.handleChange}
                value={this.state.price} />
            </div>
          </div>
          <br />
          {/* Rating */}
          <div className="row">
            <div className="col-sm-6">
              <label className="form-label" htmlFor="rating">Rating</label>
              <input
                className="form-control"
                autoComplete="off"
                type="number"
                id="rating"
                min="1"
                max="10"
                onChange={this.handleChange}
                value={this.state.rating} />
            </div>
          </div>
          {(this.state.rating <= 10 && this.state.rating >= 1) ?
            <p style={{ color: "limegreen" }}>Valid Rating!</p>
            :
            <p style={{ color: "red" }}>Rating must be between 1 and 10</p>
          }
          {/* Type */}
          <div className="row">
            <div className="col-sm-6">
              <label className="form-label" htmlFor="type">Type</label>
              <select required id="form-select" className="form-select" onChange={() => this.typeSelect()} name="select">
                <option selected value="">Select type</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Coupe">Coupe</option>
                <option value="Compact">Compact</option>
              </select>
            </div>
          </div>
          <br />
          {/* Image */}
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
          {/* company_id */}
          <div className="row">
            <div className="col-sm-6">
              <label className="form-label" htmlFor="showCompany">Company Brand</label>
              <input
                required
                className="form-control"
                autoComplete="off"
                type="text"
                id="showCompany"
                onChange={this.handleChange}
                value={this.state.showCompany} />
            </div>
          </div>
          <div>
            {this.state.company_id !== 0 ?
              <p style={{ color: "limegreen" }}>Nice! {this.state.showCompany} exists!</p>
              :
              <p style={{ color: "limegreen" }}>Please enter existing company name!</p>
            }
          </div>
          <input
            className="btn btn-success"
            type="submit"
            value="Create Car" />
        </form>
      </div >
    )
  }
}

export default CreateCar;