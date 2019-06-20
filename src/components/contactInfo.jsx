import React from "react";

const ContactInfo = () => {
  return (
    <form>
      <div className="form-row align-items-center mt-3">
        <div className="form-group col mr-3">
          <label htmlFor="contactName">Name</label>
          <input
            type="name"
            className="form-control"
            id="contactName"
            placeholder="First Last"
            required
          />
        </div>
        <div className="form-group col ml-3 mr-3">
          <label htmlFor="contactEmail">Email</label>
          <input
            type="email"
            className="form-control"
            id="contactEmail"
            placeholder="someone@site.com"
            required
          />
        </div>
        <div className="form-group col ml-3 mr-3">
          <label htmlFor="contactPhone">Phone number</label>
          <input
            type="tel"
            className="form-control"
            id="contactPhone"
            placeholder="123-456-7880"
          />
        </div>
        <div className="form-group col ml-5">
          <label htmlFor="extension">Extension</label>
          <input
            type="text"
            className="form-control"
            id="extension"
            placeholder="1234"
          />
        </div>
      </div>
      <div className="form-row mb-5" />
    </form>
  );
};

export default ContactInfo;
