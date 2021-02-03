import React from 'react';
import './styles/styles.css'
import axios from 'axios';
import Nav from './Nav'
class Company extends React.Component {
    state = {
        company: {},
        children: [],
        cars: [],
        filter: {
            id: this.props.companyID,
            type: "all"
        },
        modelDefault: true,
        priceDefault: true,
        ratingDefault: true

    }
    sorting = (condition) => {
        if (condition === "modelSort") {

            // If modelDefault is true or false
            this.state.modelDefault ?
                //Ascending
                this.setState({
                    cars: this.state.cars.sort((a, b) => {
                        if (a.model < b.model) return -1;
                    }),
                    modelDefault: !this.state.modelDefault //Make the state opposite of what it currently is, so next time it'll hit the descending function
                })
                :
                //Descending
                this.setState({
                    cars: this.state.cars.sort((a, b) => {
                        if (a.model > b.model) return -1;
                    }),
                    modelDefault: !this.state.modelDefault
                })
        } else if (condition === "priceSort") {

            // If priceDefault is true or false
            this.state.priceDefault ?
                this.setState({
                    cars: this.state.cars.sort((a, b) => a.price - b.price),
                    priceDefault: !this.state.priceDefault
                })
                :
                this.setState({
                    cars: this.state.cars.sort((a, b) => b.price - a.price),
                    priceDefault: !this.state.priceDefault
                })
        } else if (condition === "ratingSort") {

            // If ratingDefault is true or false
            this.state.ratingDefault ?
                this.setState({
                    cars: this.state.cars.sort((a, b) => a.rating - b.rating),
                    ratingDefault: !this.state.ratingDefault
                })
                :
                this.setState({
                    cars: this.state.cars.sort((a, b) => b.rating - a.rating),
                    ratingDefault: !this.state.ratingDefault
                })
        }
    }

    componentDidMount = () => {
        this.getCompany();
        this.getCars(this.state.filter.type);
    }

    //TYPE TOGGLE METHOD
    typeToggle = (event) => {
        let selectBox = document.getElementById("selectType");
        let selectedItem = selectBox.options[selectBox.selectedIndex].value;
        this.setState({
            filter: {
                id: this.state.filter.id,
                type: selectedItem
            }
        })
        setTimeout(() => {
            this.getCars(this.state.filter.type);
        }, 100)
    }

    // GET ALL CARS FOR THIS COMPANY
    getCars = (type) => {
        if (type === "all") {
            axios.get("https://vroomies.herokuapp.com/cars/" + this.props.companyID).then(response => {
                this.setState({
                    cars: response.data,
                })
            })
        } else {
            const { id, type } = this.state.filter;
            axios.get("https://vroomies.herokuapp.com/filter/type/" + id + "/" + type)
                .then(response => {
                    this.setState({
                        cars: response.data
                    })
                })
        }
    }
    //GET SPECIFIC COMPANY
    getCompany = () => {
        axios.get("https://vroomies.herokuapp.com/companies/" + this.props.companyID).then(response => {
            let data = response.data;
            let childrenArray = [];
            let parentObject = {};
            for (let key in data) {
                if (typeof data[key] !== "object") {
                    parentObject[key] = data[key];
                }
            }
            if (data.children) {
                childrenArray = data.children;
            }
            this.setState({
                company: parentObject,
                children: childrenArray
            })
        })
    }

    render() {
        const { name, country, id, image, description } = this.state.company;
        const { gotoPage, companyID } = this.props;
        const { cars, children } = this.state

        return (
            <div className="container-sm companyPage">
                <Nav gotoPage={gotoPage} />
                {/* BUTTONS */}
                <div className="row" style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="col-sm-3">
                        <button className="btn btn-outline-warning" onClick={() => gotoPage("main")}>Back</button>
                    </div>
                    <div className="col-sm-3">
                        <button className="btn myButtonEdit" onClick={() => gotoPage("editCompany", id)}>Edit this company</button>
                    </div>
                </div>
                {/* COMPANY INFO */}
                <div className="row mainLogo">
                    <div className="col-sm-5" style={{ display: "flex", justifyContent: "flex-end" }}>
                        <img src={image}></img>
                    </div>
                    <div className="col-sm-7">
                        <div className="col-sm-10">
                            <p className="companyName">{name}</p>
                        </div>
                        <div className="col-sm-10">
                            <p className="companyCountry">{country}</p>
                        </div>
                        <div className="col-sm-12">
                            <p className="companyDescription">{description}</p>
                        </div>
                    </div>
                </div>
                <hr />
                {/* CHILDREN  */}
                {children.length > 0 ?
                    (
                        <div className="children">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h4>Children Companies</h4>
                                </div>
                            </div>
                            <div className="row">
                                {children.map(entry => {
                                    const { childName, childID, childImage } = entry
                                    return (
                                        <div className="col-sm-3" >
                                            <div className="childProfile" onClick={() => gotoPage("company", childID)}>
                                                <img className="childImage" src={childImage}></img>
                                                {childName}
                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </div>
                    )
                    :
                    <h4 style={{ color: "yellow" }}>This company has no children yet!</h4>
                }
                <hr />
                {/* TABLE OF CARS */}
                <div className="row" style={{ textAlign: "center" }}>
                    <h3 style={{ color: "orange" }}><i class="fas fa-caret-right"></i> Click on the table headings to start sorting! <i class="fas fa-caret-left"></i></h3>
                </div>
                <div className="tableDiv">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th onClick={() => this.sorting("modelSort")} className="theader" scope="col">
                                    Model {this.state.modelDefault ? <i class="fas fa-sort-up"></i> : <i class="fas fa-sort-down"></i>}
                                </th>
                                <th onClick={() => this.sorting("priceSort")} className="theader" scope="col">
                                    Price {this.state.priceDefault ? <i class="fas fa-sort-up"></i> : <i class="fas fa-sort-down"></i>}
                                </th>
                                <th onClick={() => this.sorting("ratingSort")} className="theader" scope="col">
                                    Rating {this.state.ratingDefault ? <i class="fas fa-sort-up"></i> : <i class="fas fa-sort-down"></i>}
                                </th>
                                <th scope="col">
                                    {/* SELECT FORM */}
                                    <select id="selectType" className="form-select" onChange={() => this.typeToggle()}>
                                        <optgroup>
                                            <option value={this.state.filter.type}>Type</option>
                                        </optgroup>
                                        <optgroup label="-------------">
                                            <option value="all">All</option>
                                            <option value="sedan">Sedan</option>
                                            <option value="SUV">SUV</option>
                                            <option value="coupe">Coupe</option>
                                            <option value="Compact">Compact</option>
                                        </optgroup>
                                    </select>
                                    {/* END OF SELECT FORM */}
                                </th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {cars.map(car => {
                                const { id, model, price, rating, type, image, company_id } = car
                                return (
                                    <tr>
                                        <td>
                                            <img src={image} style={{ width: "100px", height: "100px" }} />
                                        </td>
                                        <td>{model}</td>
                                        <td>${price}</td>
                                        <td>{rating}</td>
                                        <td>{type}</td>
                                        <td>
                                            <button id={id} onClick={() => this.props.gotoPage("editCar", id)} className="btn btn-warning">Edit</button>
                                            <button className="btn btn-danger">X</button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>

            </div>

        )
    }
}


export default Company;