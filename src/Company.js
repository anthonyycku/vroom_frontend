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
                <div className="row" style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="col-sm-3">
                        <button className="btn btn-outline-warning" onClick={() => gotoPage("main")}>Back</button>
                    </div>
                    <div className="col-sm-3">
                        <button className="btn myButtonEdit" onClick={() => gotoPage("editCompany", id)}>Edit this company</button>
                    </div>
                </div>

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

                <div>

                    {cars.map(car => {
                        const { model, price, rating, type, image, company_id } = car
                        return (
                            <div className="carsInfo">
                                <p>Model: {model}</p>
                                <p>Price: {price}</p>
                                <p>Rating: {rating}</p>
                                <p>Type: {type}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

        )
    }
}


export default Company;