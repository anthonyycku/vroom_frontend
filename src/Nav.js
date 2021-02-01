import React from 'react';
import './styles/styles.css'
import logo from'./styles/vroom2.png';


class Nav extends React.Component {
    render() {
        const { gotoPage } = this.props;
        return (
            <div className="navigation">
                <nav class="navbar navbar-expand-lg fixed-top">
                    <div class="container-fluid">
                        <a href="#" onClick={() => gotoPage("main")} className="navbar-brand">
                        <img className="logo" src={logo} /></a>
                        {/* <img href="https://images-na.ssl-images-amazon.com/images/I/613wl%2BM6luL._AC_SX522_.jpg" alt="logo"></img> */}
                        <ul class="navbar-nav">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Create
                                 </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a class="dropdown-item" href="#" onClick={() => gotoPage("createCompany")}>Create Company</a></li>
                                    <li><a class="dropdown-item" href="#" onClick={() => gotoPage("createCar")}>Create Car</a></li>
                                </ul>
                            </li>
                        </ul>

                    </div>
                </nav>
            </div>

        )
    }
}

export default Nav;