import React from 'react';
import axios from 'axios';
import Loading from './Loading'
class EditCar extends React.Component {
  state = {
    loaded: false,
    carLoaded: false,
    model: "",
    price: "",
    rating: "",
    type: "",
    image: "",
    company_id: 0,
    showCompany: ""
  }

  componentDidMount() {
    this.getCar(this.props.carID);
    this.getParent(this.props.carCompanyID);
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
        carLoaded: true
      })
    })
  }
  getParent = (id) => {
    if (this.props.carCompanyID !== 0) {
      axios.get("https://vroomies.herokuapp.com/companies/" + id).then(response => {
        this.setState({
          showCompany: response.data.name,
          loaded: true
        })
      })
    } else {
      this.setState({
        loaded: true
      })
    }
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
    const id = event.target.id
    axios.put('https://vroomies.herokuapp.com/cars/' + id, this.state).then((response) => {
    })
    this.props.gotoPage("company", this.state.company_id);
  }

  render() {
    const { model, price, rating, type, image, company_id, showCompany } = this.state

    if (this.state.loaded === false) {
      return <Loading />
    } else {
      return (
        <div className="container-sm createPage">
          <button className="btn btn-warning" onClick={() => this.props.gotoPage("company", company_id)}>Back</button>
          <h3>Edit this car</h3>
          <form id={this.props.carID} onSubmit={this.updateCar}>
            {/* MODEL */}
            <div className="row">
              <div className="col-sm-6">
                <label htmlFor="model" className="form-label">Model</label>
                <input
                  required
                  type="text"
                  maxLength={20}
                  placeholder="20 characters limit"
                  id="model"
                  autoComplete="off"
                  className="form-control"
                  onChange={this.handleChange}
                  defaultValue={model}
                />
                <p style={{ color: "limegreen" }}>{this.state.model.length} / 20 Characters</p>
              </div>
            </div>
            <br />
            {/* PRICE */}
            <div className="row">
              <div className="col-sm-6">
                <label className="form-label" htmlFor="price">Price</label>
                <input
                  className="form-control"
                  required
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
                  required
                  autoComplete="off"
                  type="text"
                  maxLength={20}
                  placeholder="20 characters limit"
                  id="type"
                  onChange={this.handleChange}
                  defaultValue={type} />
                <p style={{ color: "limegreen" }}>{this.state.type.length} / 20 Characters</p>
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
                <p style={{ color: "limegreen" }}>Success! {this.state.showCompany} exists!</p>
                :
                <p style={{ color: "limegreen" }}>Please enter existing company name!</p>
              }
            </div>
            <br />
            <input type="submit" value="Edit" className="btn btn-success" />
          </form>
        </div>
      )
    }
  }
}


export default EditCar;