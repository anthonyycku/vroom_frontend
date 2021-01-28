import React from 'react';

class Companies extends React.Component {

    render() {
        const { companies } = this.props;
        return (
            <div>
                {companies.map((result) => {
                    return (
                        <div>
                            <h1>{result.name}</h1>
                            <h2>{result.founded}</h2>
                        </div>
                    )
                })
                }
            </div>
        )
    }
}

export default Companies;