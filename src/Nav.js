import React from 'react';
import './styles/styles.css'


class Nav extends React.Component {
    render() {
        const { gotoPage } = this.props;
        return (
            <div className="navigation">
                <nav class="navbar navbar-expand-lg fixed-top">
                    <a href='#' className="navbar-brand" onClick={() => gotoPage("main")}><i class="far fa-cars"></i> AutoShow</a>
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="far fa-layer-plus"></i> Create
                                 </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a class="dropdown-item" href="#" onClick={() => gotoPage("createCompany")}>Create Company</a></li>
                                <li><a class="dropdown-item" href="#" onClick={() => gotoPage("createCar")}>Create Car</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>

        )
    }
}

export default Nav;