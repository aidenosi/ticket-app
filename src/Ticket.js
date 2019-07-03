import React, { Component } from "react";
import "./App.css";

class Ticket extends Component {
  state = {
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    contactExtension: "",
    ticketSummary: "",
    ticketType: "",
    ticketPriority: "",
    ticketCategory: "Select catagory",
    ticketSubcategory: "",
    ticketDetailedInfo: "",
    catagoriesAndSubcatagories: [
      {
        catagory: "Hardware",
        subcatagories: ["Laptop", "Desktop", "Peripheral/accessory", "Other"]
      },
      {
        catagory: "Software",
        subcatagories: ["MS Office", "MS Outlook", "Web browser", "Other"]
      },
      { catagory: "Other", subcatagories: ["Other"] }
    ],
    formEmpty: true
  };

  handleCatagoryChange = e => {
    console.log(e.target.name, ":", e.target.value);
    this.setState({ ticketCategory: e.target.value });
  };

  handleInputChange = e => {
    console.log(e.target.name, ":", e.target.value);
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      formEmpty: false
    });
  };

  handleCancel = () => {
    console.log("in handleCancel");
    if (this.state.formEmpty) {
      console.log("inside if");
      this.props.onCancel();
    } else {
      if (window.confirm("Do you wish to discard changes?"))
        this.props.onCancel();
    }
  };

  render() {
    let list;
    if (this.state.ticketCategory === "Select catagory") {
      list = [{ catagory: "Select catagory", subcatagories: [] }];
    } else {
      list = this.state.catagoriesAndSubcatagories.filter(list => {
        return list.catagory === this.state.ticketCategory;
      });
    }
    const { onSubmit, onCancel } = this.props;
    return (
      <React.Fragment>
        <main className="container bg-light pb-2 pt-2">
          <h3 className="mt-3">Contact Information</h3>
          <form onSubmit={onSubmit} onCancel={onCancel}>
            <div className="form-row align-items-center mt-3">
              <div className="form-group col mr-3">
                <label htmlFor="contactName">Name</label>
                <input
                  type="name"
                  className="form-control"
                  name="contactName"
                  placeholder="First Last"
                  value={this.state.contactName}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="form-group col ml-3 mr-3">
                <label htmlFor="contactEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="contactEmail"
                  placeholder="someone@site.com"
                  value={this.state.contactEmail}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="form-group col ml-3 mr-3">
                <label htmlFor="contactPhone">Phone number</label>
                <input
                  type="tel"
                  className="form-control"
                  name="contactPhone"
                  placeholder="123-456-7880"
                  value={this.state.contactPhone}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group col ml-3">
                <label htmlFor="contactExtension">Extension</label>
                <input
                  type="text"
                  className="form-control"
                  name="contactExtension"
                  placeholder="1234"
                  value={this.state.contactExtension}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="form-row mb-5" />
            <h3>Ticket Information</h3>
            <div className="form-row align-items-center mt-3 mb-5">
              <div className="form-group col-9">
                <label htmlFor="ticketSummary">Summary</label>
                <input
                  type="text"
                  className="form-control"
                  name="ticketSummary"
                  value={this.state.ticketSummary}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row mb-5">
              <div className="form-group col mr-3">
                <label htmlFor="ticketType">Ticket type</label>
                <select
                  className="form-control"
                  name="ticketType"
                  value={this.state.ticketType}
                  onChange={this.handleInputChange}
                  required
                >
                  <option style={{ display: "none" }} value="">
                    Select type
                  </option>
                  <option value="Request">Request</option>
                  <option value="Incident">Incident</option>
                  <option value="Task">Task</option>
                </select>
              </div>
              <div className="form-group col ml-3 mr-3">
                <label htmlFor="ticketPriority">Priority</label>
                <select
                  className="form-control"
                  name="ticketPriority"
                  value={this.state.ticketPriority}
                  onChange={this.handleInputChange}
                  required
                >
                  <option style={{ display: "none" }} value="">
                    Select priority
                  </option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="form-group col ml-3 mr-3">
                <label htmlFor="ticketCategory">Category</label>
                <select
                  className="form-control"
                  name="ticketCategory"
                  value={this.state.ticketCategory}
                  onChange={this.handleCatagoryChange.bind(this)}
                  required
                >
                  <option style={{ display: "none" }} value="">
                    Select category
                  </option>
                  {this.state.catagoriesAndSubcatagories.map((list, i) => {
                    return <option>{list.catagory}</option>;
                  })}
                </select>
              </div>
              <div className="form-group col ml-3">
                <label htmlFor="ticketSubcategory">Subcategory</label>
                <select
                  className="form-control"
                  name="ticketSubcategory"
                  value={this.state.ticketSubcategory}
                  onChange={this.handleInputChange}
                  required
                >
                  <option style={{ display: "none" }} value="">
                    Select subcategory
                  </option>
                  {list[0].subcatagories.map((subcatagory, i) => {
                    return <option>{subcatagory}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="form-row mb-5">
              <div className="form-group col-12">
                <label htmlFor="ticketDetailedInfo">Detailed Info</label>
                <textarea
                  className="form-control"
                  name="ticketDetailedInfo"
                  rows="5"
                  value={this.state.ticketDetailedInfo}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="form-row mb-5">
              <div className="col">
                <button type="submit" className="btn btn-primary" id="submit">
                  Submit
                </button>
              </div>
              <button
                type="button"
                className="btn btn-danger"
                id="cancel"
                onClick={this.handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </main>
      </React.Fragment>
    );
  }
}

export default Ticket;
