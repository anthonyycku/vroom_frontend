import React from 'react';
import axios from 'axios';
import Loading from './Loading';

class EditCompany extends React.Component {

  state = {
    loaded: false,
    companyLoaded: false,
    name: "",
    description: "",
    country: "",
    image: "",
    parent_id: 0,
    showParent: ""
  }

  componentDidMount() {
    this.getCompany();
    this.getParent();
  }
  //GET SPECIFIC COMPANY
  getCompany = () => {
    axios.get("https://vroomies.herokuapp.com/companies/" + this.props.companyID).then(response => {
      let data = response.data;
      if (data.description === null) {
        data.description = "";
      }
      this.setState({
        name: data.name,
        description: data.description,
        country: data.country,
        image: data.image,
        parent_id: data.parent_id,
        companyLoaded: true
      })
    })
  }
  getParent = () => {
    if (this.props.companyParentID !== 0) {
      axios.get("https://vroomies.herokuapp.com/companies/" + this.props.companyParentID).then(response => {
        this.setState({
          showParent: response.data.name,
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

  updateCompany = (event) => {
    event.preventDefault()
    axios.put('https://vroomies.herokuapp.com/companies/' + this.props.companyID, this.state).then((response) => {
    })
    this.props.gotoPage("company", this.props.companyID);
  }




  render() {
    const { name, description, country, image, parent_id, showParent } = this.state

    if (this.state.loaded === false) {
      return <Loading />
    } else {
      return (
        <div className="container-sm createPage">
          <button className="btn btn-warning" onClick={() => this.props.gotoPage("company", this.props.companyID)}>Back</button>
          <h3>Edit this company</h3>
          <form id="createForm" onSubmit={this.updateCompany}>
            {/* Name */}
            <div className="row">
              <div className="col-sm-6">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  required
                  maxLength={20}
                  placeholder="MAX/20 characters"
                  id="name"
                  autoComplete="off"
                  className="form-control"
                  onChange={this.handleChange}
                  defaultValue={name}
                />
                <p style={{ color: "limegreen" }}>{this.state.name.length} / 20 characters</p>
              </div>
            </div>
            <br />
            {/* Description */}
            <div className="row">
              <div className="col-sm-10">
                <label className="form-label" htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  required
                  autoComplete="off"
                  type="text"
                  maxLength={400}
                  placeholder="MAX/400 characters"
                  id="description"
                  onChange={this.handleChange}
                  defaultValue={description}>
                </textarea>
                <p style={{ color: "limegreen" }}>{this.state.description.length} / 400 characters</p>
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
            {/* Country */}
            <div className="row">
              <div className="col-sm-6">
                <label className="form-label" htmlFor="country">Original country</label>
                <input
                  className="form-control"
                  required
                  autoComplete="off"
                  type="text"
                  maxLength={10}
                  id="country"
                  onChange={this.handleChange}
                  defaultValue={country} />
              </div>
            </div>
            <br />
            {/* Parent_ID */}
            <div className="row">
              <div className="col-sm-6">
                <label className="form-label" htmlFor="showParent">Parent Company</label>
                <input
                  className="form-control"
                  autoComplete="off"
                  type="text"
                  id="showParent"
                  onKeyUp={this.handleChange}
                  defaultValue={showParent} />
              </div>
            </div>
            {/* PARENT ID ALGORITHM */}
            <div>
              {this.state.parent_id !== 0 ?
                <p style={{ color: "limegreen" }}>Nice! {this.state.showParent} exists!</p>
                :
                <p style={{ color: "limegreen" }}>Leave empty if no parent company</p>
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
export default EditCompany;