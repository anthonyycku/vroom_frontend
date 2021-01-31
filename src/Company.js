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

                <button class="myButton" onClick={() => gotoPage("main")}>Back</button>

                <button class="myButtonEdit" onClick={() => gotoPage("editCompany", id)}>Edit this company</button>

            <div className="companyAll">
              <div>
                  <img src={image}className="companyImage"></img>
              </div>
                <div className="companyInfo">
                   <p className="companyName">{name}</p>
                   <p className="companyCountry">{country}</p>
                   <p className="companyDescription">{description}</p>
                </div>
            </div>
            
                    {/* <button onClick={() => gotoPage("createCar")}>Create</button> */}

                    <div>
                        
                        {cars.map(car => {
                            const { model, price, rating, type, image, company_id } = car
                            return (
                                <div className="carsInfo">
                                    <p>Model: {model}</p>
                                    <p>Price: {price}</p>
                                    <p>Rating: {rating}</p>
                                    <p>Type: {type}</p>
                                    {/* <p>image: {image}</p>
                                    <p>company_id: {company_id}</p> */}
                                    <p>-------------------</p>
                                </div>
                            )
                        })}
                    </div>

                    <dev className="companyChild">
                        {children.length > 0 ?
                            children.map(entry => {
                                const { childName, childID, childImage } = entry
                                return (
                                    <div>
                                        <div className="childName" onClick={() => gotoPage("company", childID)}>
                                            {childName}
                                        </div>
                                          <div>
                                            <div childName="CI">
                                              <img className="childImage" src={childImage}></img>{}
                                            </div>
                                          </div>
                                        
                                    </div>
                                )
                            })
                            :
                            null
                        }
                        </dev>

                </div>
            
        )
    }
}


export default Company;