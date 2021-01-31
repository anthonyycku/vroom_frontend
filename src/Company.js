import React from 'react';
import './styles/styles.css'
import axios from 'axios';
import Nav from './Nav'
class Company extends React.Component {
    state = {
        company: {},
        children: [],
        cars: []
    }
    componentDidMount = () => {
        setTimeout(() => {
            this.getCompany()
            this.getCars();
        }, 500)
    }
    getCars = () => {
        axios.get("https://vroomies.herokuapp.com/cars/" + this.props.companyID).then(response => {
            this.setState({
                cars: response.data
            })
        })
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
                    null
                }
                <hr />
                {/* TABLE OF CARS */}
                <div className="tableDiv">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Model</th>
                                <th scope="col">Price</th>
                                <th scope="col">Rating</th>
                                <th scope="col">Type</th>
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