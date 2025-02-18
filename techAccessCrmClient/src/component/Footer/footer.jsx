import React from "react";
import "./footer.css"

export function Footer() {
  return (
    <>
    <footer className="py-5" data-bs-theme="dark" id="footerBox">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>We provide quality education and resources to help students succeed in their careers.</p>
          </div>
          <div className="col-md-4">
            <h5>Social Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">Facebook</a></li>
              <li><a href="#" className="text-light">Instagram</a></li>
              <li><a href="#" className="text-light">LinkedIn</a></li>
              <li><a href="#" className="text-light">Twitter</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: info@education.com</p>
            <p>Phone: +123 456 7890</p>
            <p>Address: 123 Education St, Learning City</p>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>&copy; {new Date().getFullYear()} Education Website. All rights reserved.</p>
        </div>
      </div>
    </footer>
  
    </>
  );
}
