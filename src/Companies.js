import React from 'react';

class Companies extends React.Component {

    render() {
        const { companies, gotoPage } = this.props;

        return (
            <div>
<<<<<<< HEAD
<<<<<<< HEAD
                <button onClick={() => gotoPage("createCompany")}>Create</button>
=======
                <button onClick={() => gotoPage("createCompany")}>Create Company</button>

                <button onClick={() => gotoPage("createCar")}>Create Car</button>
>>>>>>> 24ad433bae0bfcb3fb93f145a8729d0e382f9463
=======

                <button onClick={() => gotoPage("createCompany")}>Create</button>

                <button onClick={() => gotoPage("createCar")}>Create Car</button>

>>>>>>> ba2464ea853f8e50eb7074683f52ffc28660ee95

                {companies.map((result) => {
                    return (
                        <div>
                            <h1 onClick={() => gotoPage("company", result.id)}>{result.name}</h1>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Companies;