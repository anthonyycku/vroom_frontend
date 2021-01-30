import React from 'react';
import './styles/styles.css'

class Companies extends React.Component {

    render() {
        const { companies, gotoPage } = this.props;

        return (
            <div>


                <button onClick={() => gotoPage("createCompany")}>Create</button>

                <button onClick={() => gotoPage("createCar")}>Create Car</button>
                <div className="container marketing">
                    <div className="row">
                        {companies.map((result) => {
                            return (

                                <div className="col-lg-4" onClick={() => gotoPage("company", result.id)}>
                                    <img className="profileImage" src={result.image}></img>
                                    <h2 >{result.name}</h2>
                                    <p>{result.country}</p>
                                </div>

                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Companies;