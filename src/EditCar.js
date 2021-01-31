import React from 'react';
import axios from 'axios';
class EditCar extends React.Component {
  state = {
    model: "",
    price: "",
    rating: "",
    type: "",
    image: "",
    company_id: 0,
    showCompany: ""
  }

  componentDidMount() {
    setTimeout(() => {
      this.getCar(this.props.carID);
    }, 250)
    setTimeout(() => {
      this.getParent(this.state.company_id);
    }, 400)
  }
  getCar = (id) => {
    axios.get("https://vroomies.herokuapp.com/singleCar/" + id).then(response => {
      let data = response.data
      this.setState({
        model: data.model,
        price: data.price,
        rating: data.rating,
        type: data.type,
        image: data.image,
        company_id: data.company_id,
      })
    })
  }
  getParent = (id) => {
    axios.get("https://vroomies.herokuapp.com/companies/" + id).then(response => {
      this.setState({
        showCompany: response.data.name
      })
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

  updateCar = (event) => {
    event.preventDefault()
    event.target.reset()
    const id = event.target.id
    axios.put('https://vroomies.herokuapp.com/cars/' + id, this.state).then((response) => {
    })
    this.props.gotoPage("company", this.state.company_id);
  }

  render() {
    const { model, price, rating, type, image, company_id, showCompany } = this.state
    return (
      <div className="container-sm createPage">
        <button className="btn btn-warning" onClick={() => this.props.gotoPage("company", this.state.companyID)}>Back</button>
        <h3>Edit this car</h3>
        <form id={this.props.carID} onSubmit={this.updateCar}>
          {/* MODEL */}
          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="model" className="form-label">Model</label>
              <input
                required
                type="text"
                id="model"
                autoComplete="off"
                className="form-control"
                onChange={this.handleChange}
                defaultValue={model}
              />
            </div>
          </div>
          <br />
          {/* PRICE */}
          <div className="row">
            <div className="col-sm-6">
              <label className="form-label" htmlFor="price">Price</label>
              <input
                className="form-control"
                autoComplete="off"
                type="number"
                id="price"
                onChange={this.handleChange}
                defaultValue={price}>
              </input>
            </div>
          </div>
          <br />
          {/* RATING*/}
          <div className="row">
            <div className="col-sm-6">
              <label className="form-label" htmlFor="rating">Rating</label>
              <input
                className="form-control"
                autoComplete="off"
                type="number"
                min="1"
                max="10"
                id="rating"
                onChange={this.handleChange}
                defaultValue={rating} />
            </div>
          </div>
          <br />
          {/* Type */}
          <div className="row">
            <div className="col-sm-6">
              <label className="form-label" htmlFor="type">Type</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                id="type"
                onChange={this.handleChange}
                defaultValue={type} />
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
                defaultValue={image} />
            </div>
          </div>
          <br />
          {/* Company_id*/}
          <div className="row">
            <div className="col-sm-6">
              <label className="form-label" htmlFor="showCompany">Company Brand</label>
              <input
                required
                className="form-control"
                autoComplete="off"
                type="text"
                id="showCompany"
                onKeyUp={this.handleChange}
                defaultValue={showCompany} />
            </div>
          </div>
          {/* PARENT ID ALGORITHM */}
          <div>
            {this.state.company_id !== 0 ?
              <p style={{ color: "limegreen" }}>{this.state.showCompany}'s ID is: {this.state.company_id}</p>
              :
              <p style={{ color: "limegreen" }}>Please enter brand name!</p>
            }
          </div>
          <br />
          <input type="submit" value="Edit" className="btn btn-success" />
        </form>
      </div>
    )
  }
}


export default EditCar;