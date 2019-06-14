import React, { Component } from "react";

const ContactInfo = () => {
  return (
    <form>
      <div class="form-row">
        <div class="form-group col-md-4 mr-2">
          <label for="inputEmail4">Name</label>
          <input
            type="name"
            class="form-control"
            id="contactName"
            placeholder="First Last"
          />
        </div>
        <div class="form-group col-md-4 ml-2 mr-2">
          <label for="inputEmail4">Email</label>
          <input
            type="email"
            class="form-control"
            id="contactEmail"
            placeholder="someone@site.com"
          />
        </div>
        <div class="form-group col-md-2 ml-2">
          <label for="inputEmail4">Phone number</label>
          <input
            type="tel"
            class="form-control"
            id="contactPhone"
            placeholder="123-456-7880"
          />
        </div>
      </div>
    </form>
  );
};

export default ContactInfo;
