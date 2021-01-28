import React from 'react';

class Companies extends React.Component {

    render() {
        const { companies, gotoPage } = this.props;
        return (
            <div>
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