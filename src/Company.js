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
                <div className="company">
                    <Nav gotoPage={gotoPage} />
                    <button onClick={() => gotoPage("main")}>Back</button>
                    <p>{name}</p>
                    <p>{country}</p>

                    <button onClick={() => gotoPage("editCompany", id)}>Edit this company</button>

                    {/* <button onClick={() => gotoPage("createCar")}>Create</button> */}

                    <div>

                        {children.length > 0 ?
                            children.map(entry => {
                                const { childName, childID, childImage } = entry
                                return (
                                    <div>
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
                            const { model, price, rating, type, image, company_id } = car
                            return (
                                <div>
                                    <p>Model: {model}</p>
                                    <p>Price: {price}</p>
                                    <p>Rating: {rating}</p>
                                    <p>Type: {type}</p>
                                    <p>_______________________</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default Company;