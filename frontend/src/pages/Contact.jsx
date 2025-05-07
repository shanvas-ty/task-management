import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail, MdPhoneIphone, MdLocationOn } from "react-icons/md";

const Contact = () => {
  return (
    <div className="container my-5">
      <h1 className="text-primary mb-4">Contact Us</h1>
      <p className="lead mb-5">
        Get in touch with us for any inquiries or support.
      </p>

      <div className="card shadow p-4 border-0">
        <h4 className="text-success mb-3">Office Address</h4>
        <p className="mb-1">
          <MdLocationOn className="text-danger me-2" />{" "}
          <strong>Task Management Pvt Ltd</strong>
        </p>
        <p className="mb-1">2nd Floor, ACT Chambers</p>
        <p className="mb-1">MKK Nair Rd, Palarivattom</p>
        <p className="mb-1">Ernakulam, Kerala - 682025</p>

        <hr className="my-4" />

        <h4 className="text-success mb-3">Phone Numbers</h4>
        <ul className="list-unstyled">
          <li>
            <BsFillTelephoneFill className="text-info me-2" /> 0484 4850512
          </li>
          <li>
            <MdPhoneIphone className="text-info me-2" /> +91 7034 256 363
          </li>
          <li>
            <MdPhoneIphone className="text-info me-2" /> +91 6238 743 273
          </li>
        </ul>

        <hr className="my-4" />

        <h4 className="text-success mb-3">Email</h4>
        <p>
          <MdEmail className="text-info me-2" />
          <a href="mailto:contact@taskmanagment.com">
            contact@taskmanagment.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
