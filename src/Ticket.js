import React, { Component } from "react";
import "./App.css";

class Ticket extends Component {
  // Component is fully uncontrolled with key - state is declared by props but is updated separately
  constructor(props) {
    super(props);
    this.state = {
      ID: this.props.id,
      contactName: this.props.name,
      contactEmail: this.props.email,
      contactPhone: this.props.phone,
      contactExtension: this.props.extension,
      ticketSummary: this.props.summary,
      ticketStatus: this.props.status,
      ticketType: this.props.type,
      ticketPriority: this.props.priority,
      ticketCategory: this.props.category,
      ticketSubcategory: this.props.subcategory,
      ticketNewDetailedInfo: "",
      ticketDetailedInfo: this.props.details,
      // Array to hold subcategories based on currently selected category
      categoriesAndSubcategories: [
        {
          category: "Hardware",
          subcategories: ["Laptop", "Desktop", "Peripheral/accessory", "Other"]
        },
        {
          category: "Software",
          subcategories: ["MS Office", "MS Outlook", "Web browser", "Other"]
        },
        { category: "Other", subcategories: ["Other"] }
      ],
      noChangesMade: true // Flag for checking whether changes have been made
    };
  }

  /**
   * Handler for when catagory is changed so that subcategories update accordingly.
   */
  handlecategoryChange = e => {
    this.setState({ ticketCategory: e.target.value });
  };

  /**
   * Handler for when an input is changed so that the change is reflected in the state.
   */
  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      noChangesMade: false
    });
  };

  /**
   * Handler for when cancel button is pressed. Confirms with user that they wish to
   * discard changes if changes have been made.
   */
  handleCancel = () => {
    if (this.state.noChangesMade) {
      this.props.onCancel();
    } else {
      if (window.confirm("Do you wish to discard changes?"))
        this.props.onCancel();
    }
  };

  render() {
    let list; // Used to populate options for subcategory
    let previousInfo = this.state.ticketDetailedInfo !== "";
    const pastDetailedInfo = previousInfo ? (
      <div className="form-row mb-5">
        <div className="form-group col-12">
          <label htmlFor="ticketDetailedInfo">Past Detailed Info</label>
          <textarea
            className="form-control"
            name="ticketDetailedInfo"
            rows="5"
            value={this.state.ticketDetailedInfo}
            disabled
          />
        </div>
      </div>
    ) : null;
    if (
      // If category is default or undefined...
      this.state.ticketCategory === "Select category" ||
      typeof this.state.ticketCategory === "undefined"
    ) {
      // ...list contains no subcategories
      list = [{ category: "Select category", subcategories: [] }];
    } else {
      // Else list will contain the subcategories corresponding to the selected category
      list = this.state.categoriesAndSubcategories.filter(list => {
        return list.category === this.state.ticketCategory;
      });
    }
    return (
      <React.Fragment>
        <main className="container bg-light pb-2 pt-2">
          <h1>
            {/* Display ticket ID number if not new ticket */}
            {this.state.ID === "" ? "New Ticket" : "Ticket #" + this.state.ID}
          </h1>
          <hr />
          <h3 className="mt-3">Contact Information</h3>
          {/* Use cancel handler if no changes have been made - no point in submitting unchanged data */}
          <form
            onSubmit={
              this.state.noChangesMade
                ? this.props.onCancel
                : this.props.onSubmit
            }
            onCancel={this.handleCancel}
            id={this.state.ID}
          >
            <div className="form-row align-items-center mt-3">
              <div className="form-group col mr-1">
                <label htmlFor="contactName">Name *</label>
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
              <div className="form-group col ml-1 mr-1">
                <label htmlFor="contactEmail">Email *</label>
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
              <div className="form-group col ml-1 mr-1">
                <label htmlFor="contactPhone">Phone number</label>
                {/* Check if value is null, set value to empty string, otherwise use state value */}
                <input
                  type="tel"
                  className="form-control"
                  name="contactPhone"
                  placeholder="123-456-7880"
                  value={
                    this.state.contactPhone === null
                      ? ""
                      : this.state.contactPhone
                  }
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group col ml-1">
                <label htmlFor="contactExtension">Extension</label>
                {/* Check if value is null, set value to empty string, otherwise use state value */}
                <input
                  type="text"
                  className="form-control"
                  name="contactExtension"
                  placeholder="1234"
                  value={
                    this.state.contactExtension === null
                      ? ""
                      : this.state.contactExtension
                  }
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="form-row mb-5" />
            <h3>Ticket Information</h3>
            <div className="form-row mt-3 mb-5">
              <div className="form-group col-9">
                <label htmlFor="ticketSummary">Summary *</label>
                <input
                  type="text"
                  className="form-control"
                  name="ticketSummary"
                  value={this.state.ticketSummary}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="form-group col ml-2">
                <label htmlFor="ticketStatus">Status *</label>
                <select
                  className="form-control"
                  name="ticketStatus"
                  value={this.state.ticketStatus}
                  onChange={this.handleInputChange}
                  required
                >
                  <option style={{ display: "none" }} value="">
                    Select status
                  </option>
                  <option value="Open">Open</option>
                  <option value="In progress">In progress</option>
                  <option value="On hold">On hold</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
            <div className="form-row mb-5">
              <div className="form-group col mr-1">
                <label htmlFor="ticketType">Ticket type *</label>
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
              <div className="form-group col ml-1 mr-1">
                <label htmlFor="ticketPriority">Priority *</label>
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
              <div className="form-group col ml-1 mr-1">
                <label htmlFor="ticketCategory">Category *</label>
                <select
                  className="form-control"
                  name="ticketCategory"
                  value={this.state.ticketCategory}
                  onChange={this.handlecategoryChange.bind(this)}
                  required
                >
                  <option style={{ display: "none" }} value="">
                    Select category
                  </option>
                  {/* Map each category to an <option> */}
                  {this.state.categoriesAndSubcategories.map((list, i) => {
                    return <option key={i}>{list.category}</option>;
                  })}
                </select>
              </div>
              <div className="form-group col ml-1">
                <label htmlFor="ticketSubcategory">Subcategory *</label>
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
                  {/* Map each subcategory corresponding to the current category to an <option> */}
                  {list[0].subcategories.map((subcategory, i) => {
                    return <option key={i}>{subcategory}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="form-row mb-5">
              <div className="form-group col-12">
                <label htmlFor="ticketNewDetailedInfo">Detailed Info *</label>
                <textarea
                  className="form-control"
                  name="ticketNewDetailedInfo"
                  rows="5"
                  value={this.state.ticketNewDetailedInfo}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
            </div>
            {pastDetailedInfo}
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
