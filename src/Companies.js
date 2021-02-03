import React from 'react';
import './styles/styles.css'
import axios from 'axios'
import Nav from './Nav';
import Loading from './Loading'

class Companies extends React.Component {
    state = {
        companies: [],
        loaded: false,
        sort: "default"
    }

    componentDidMount = () => {
        this.getCompanies(this.state.sort);
    }
    //GET COMPANIES
    getCompanies = (sort) => {
        switch (sort) {
            case ("default"):
                axios.get("https://vroomies.herokuapp.com/companies").then(response => {
                    this.setState({
                        companies: response.data,
                        loaded: true
                    })
                })
                break;
            case ("countryASC"):

                break;

            case ("countryDESC"):

                break;

            case ("alphabetASC"):

                break;

            case ("alphabetDESC"):

                break;
        }
    }


    // SORTING METHOD
    sort = () => {
        let selectBox = document.getElementById("sort");
        let selectedItem = selectBox.options[selectBox.selectedIndex].value;
        this.setState({
            sort: selectedItem
        })
        setTimeout(() => {
            this.getCompanies(this.state.sort);
        }, 100)
    }

    render() {
        const { gotoPage } = this.props;
        const { companies, loaded, sort } = this.state;

        if (loaded === false) {
            return <Loading />
        } else {
            return (
                <div>
                    <Nav gotoPage={gotoPage} />
                    {/* SORT SELECT BOX */}
                    <div className="container marketing companies">
                        <div className="row">
                            <div className="col-sm-3">
                                <select onChange={this.sort} id="sort" className="form-select">
                                    <optgroup>
                                        <option value={sort}>Sort by:</option>
                                    </optgroup>
                                    <optgroup label="-------------">
                                        <option value="default">Default</option>
                                        <option value="alphabetASC">Alphabetical (Ascending)</option>
                                        <option value="alphabetDESC">Alphabetical (Descending)</option>
                                        <option value="countryASC">Country (Ascending)</option>
                                        <option value="countryDESC">Country (Descending)</option>
                                    </optgroup>
                                </select>
                            </div>
                        </div>
                        {/* RENDER ALL COMPANIES */}
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