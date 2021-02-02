import React from 'react';
import './styles/styles.css'
import axios from 'axios'
import Nav from './Nav';
import Loading from './Loading'

class Companies extends React.Component {
    state = {
        companies: [],
        loaded: false
    }

    componentDidMount = () => {
        this.getCompanies();
    }
    //GET COMPANIES
    getCompanies = () => {
        axios.get("https://vroomies.herokuapp.com/companies").then(response => {
            this.setState({
                companies: response.data,
                loaded: true
            })
        })
    }
    render() {
        const { gotoPage } = this.props;
        const { companies, loaded } = this.state;

        if (loaded === false) {
            return <Loading />
        } else {
            return (
                <div>
                    <Nav gotoPage={gotoPage} />
                    <div className="container marketing companies">
                        <div className="row">
                            <div className="col-sm-3">
                                <select onChange={this.sort} id="sort" className="form-select">
                                    <optgroup>
                                        <option value={sort}>Sort by:</option>
                                    </optgroup>
                                    <optgroup label="-------------">
                                        <option value="default">Default</option>
                                        <option value="country">Country</option>
                                    </optgroup>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            {companies.map((result) => {
                                return (

                                    <div className="col-lg-4" key={result.id}>
                                        <div className="profile" onClick={() => gotoPage("company", result.id)}>
                                            <img className="profileImage" src={result.image}></img>
                                            <h2 >{result.name}</h2>
                                            <p>{result.country}</p>
                                        </div>
                                    </div>

                                )
                            })}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Companies;