import React from 'react';
import './styles/styles.css'
import axios from 'axios';
import Nav from './Nav'
import car from './Car'
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
        }, 250)
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
            <div className="ContainerCompany">
                <Nav gotoPage={gotoPage} />
                <button className="myButton" onClick={() => gotoPage("main")}>Back</button>
                <button className="btn btn-warning" onClick={() => gotoPage("editCompany", companyID)}>Edit Company</button>

                <img className="companyImage" src={image}></img>
                <p className="companyName">{name}</p>
                <p className="companyCountry">{country}</p>
                <p className="companyDescription">{description} description </p>

                <button className="myButton" onClick={() => gotoPage("editCompany", id)}>Edit this company</button>


                <button onClick={() => gotoPage("editCompany", id)}>Edit this company</button>


                <div>

                    {children.length > 0 ?
                        children.map(entry => {
                            const { childName, childID, childImage } = entry
                            return (
                                <div key={childID}>
                                    <div onClick={() => gotoPage("company", childID)}>
                                        Name: {childName}
                                    </div>
                                </div>
                            )
                        })
                        :
                        null
                    }

                    {cars.map(car => {
                        const { id, model, price, rating, type, image, company_id } = car
                        return (
                            <div key={id}>


                                <p>Model: {model}</p>
                                <p>Price: {price}</p>
                                <p>Rating: {rating}</p>
                                <p>Type: {type}</p>
                                <p>_______________________</p>
                                {/* <img className="childImage" src={childImage}></img>{} */}

                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}


export default Company;