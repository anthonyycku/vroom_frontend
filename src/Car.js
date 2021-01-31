import React from 'react';

class Car extends React.Component {
    render() {
        const { model,price ,rating,type,company_id } = this.props.car;
        const { gotoPage, children } = this.props;
        return (
            <div>
                <button onClick={() => gotoPage("main")}>Back</button>
                <p>{model}</p>
                <p>{price}.to_i</p>
                <p>{rating}.to_i</p>
                <p>{type}</p>
                <p>{company_id}.to_i</p>
                <button onClick={() => gotoPage("editCar", company_id)}>Customiz This car</button>

                {/* <button onClick={() => gotoPage("createCar")}>Create</button> */}
                
                <div>
                
                    {children.length > 0 ?
                        children.map(entry => {
                            const { childName, childID, childImage } = entry
                            return (
                                <div>
                                    <div onClick={() => gotoPage("car", childID)}>
                                        Model: {childName}
                                    </div>
                                </div>
                            )
                        })
                        :
                        null
                    }
                </div>
            </div>
        )
    }
}

export default Car;