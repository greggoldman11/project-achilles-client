import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
    <Nav.Link href="#new-post">Create a New Post</Nav.Link>
    <Nav.Link href="#resources">See all Posts</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#/">Home</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="dark" variant="dark" expand="md">
    <Navbar.Brand href="#">
      <img
        src="https://lh3.googleusercontent.com/dBOw84gNgFn1whGKxIbH1T0Tf_6FO9QDHP0CutU1250vk_JpTtVbd1lvRlSoyK2oMS2f-O_kSISIaj_TRU0JrCnRG-g8fuXeFqMUtpkVj2eloceRens6G2tKbX_nbfmvPZ9AqSq0=s250-p-k"
        width="50"
        height="50"
        className="d-inline-block align-top"
        alt="logo"
      />
    </Navbar.Brand>
    <Navbar.Brand href="#">
    Project Achilles
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
