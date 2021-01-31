import React from 'react';
import './styles/styles.css'
import axios from 'axios';
import Nav from './Nav'
class Company extends React.Component {
    state = {
        cars: [],
        isLoaded: false
    }
    // componentDidUpdate = (prevProps) => {
    //     if (this.props.company !== prevProps.company) {
    //         this.getCars();
    //     }
    // }
    componentDidMount() {
        setTimeout(() => {
            this.getCars();
        }, 500)
    }
    getCars = () => {
        axios.get("https://vroomies.herokuapp.com/cars/" + this.props.company.id).then(response => {
            this.setState({
                cars: response.data,
                isLoaded: true
            })
        })
    }

    render() {
        const { name, country, id, image, description } = this.props.company;
        const { gotoPage, children } = this.props;
        const { cars } = this.state
        if (this.state.isLoaded === true) {
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
        } else {
            return null;
     }
     
    }
}

export default Company;