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
      ticketHistory: this.props.history,
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
      noChangesMade: true, // Flag for checking whether changes have been made
      changedValues: [], // Array to store names of fields whose values have changed
      showHistory: false
    };
  }

  /**
   * Handler for when catagory is changed so that subcategories update accordingly.
   */
  handlecategoryChange = e => {
    this.setState({ ticketCategory: e.target.value });
  };

  /**
   * Handler for when an input is changed. Also checks to see if "changed" values are actually different from the value of the property.
   */
  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    var self = this; // Makeshift binding for inner function
    // Inner function to remove a field from the array of changed values if the value is reverted back to the value of the property
    function removeFromArray(name) {
      self.setState({
        changedValues: self.state.changedValues.filter(field => field !== name)
      });
    }

    // If field's value hasn't been changed yet
    if (!this.state.changedValues.includes(name)) {
      this.setState({
        [name]: value,
        changedValues: [...this.state.changedValues, name]
      });
    } else {
      // Apply value change
      this.setState({ [name]: value });
      // Switch statement to match form field to the right property
      switch (name) {
        case "contactName":
          if (value === this.props.name) {
            removeFromArray(name);
          }
          break;
        case "contactEmail":
          if (value === this.props.email) {
            removeFromArray(name);
          }
          break;
        case "contactPhone":
          if (value === this.props.phone) {
            removeFromArray(name);
          }
          break;
        case "contactExtension":
          if (value === this.props.extension) {
            removeFromArray(name);
          }
          break;
        case "ticketSummary":
          if (value === this.props.summary) {
            removeFromArray(name);
          }
          break;
        case "ticketStatus":
          if (value === this.props.status) {
            removeFromArray(name);
          }
          break;
        case "ticketType":
          if (value === this.props.type) {
            removeFromArray(name);
          }
          break;
        case "ticketPriority":
          if (value === this.props.priority) {
            removeFromArray(name);
          }
          break;
        case "ticketCategory":
          if (value === this.props.category) {
            removeFromArray(name);
          }
          break;
        case "ticketSubcategory":
          if (value === this.props.subcategory) {
            removeFromArray(name);
          }
          break;
        case "ticketNewDetailedInfo":
          if (value === "") {
            removeFromArray(name);
          }
          break;
        default:
          console.error("No field found with name " + name);
          break;
      }
    }
  };

  /**
   * Handler for when cancel button is pressed. Confirms with user that they wish to
   * discard changes if changes have been made.
   */
  handleCancel = () => {
    if (this.state.changedValues.length === 0) {
      this.props.onCancel();
    } else {
      if (window.confirm("Do you wish to discard changes?"))
        this.props.onCancel();
    }
  };

  handleToggleHistory = e => {
    e.preventDefault();
    this.setState({ showHistory: !this.state.showHistory });
  };

  render() {
    let list; // Used to populate options for subcategory
    //Only show previous details if there are any. New tickets will not have the text box.
    const pastDetailsAndShowHistoryButton =
      this.state.ticketDetailedInfo !== "" ? (
        <React.Fragment>
          <div className="form-row mb-1">
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
          <div className="form-row mb-2">
            <div className="form-group col-12">
              <button
                className="btn btn-secondary"
                value={this.state.ticketDetailedInfo}
                onClick={this.handleToggleHistory}
              >
                Toggle ticket history
              </button>
            </div>
          </div>
        </React.Fragment>
      ) : null;
    const ticketHistoryBox = this.state.showHistory ? (
      <div className="form-row mb-1">
        <div className="form-group col-12">
          <textarea
            className="form-control"
            name="ticketHistoryBox"
            rows="5"
            value={this.state.ticketHistory}
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
          <h1 style={{ display: "inline-block" }}>
            {/* Display ticket ID number if not new ticket */}
            {this.state.ID === "" ? "New Ticket" : "Ticket #" + this.state.ID}
          </h1>
          <p style={{ display: "inline", float: "right" }}>
            <button type="button" className="close" onClick={this.handleCancel}>
              &times;
            </button>
          </p>
          <hr />
          <h3 className="mt-3">Contact Information</h3>
          {/* Use cancel handler if no changes have been made - no point in submitting unchanged data */}
          <form
            onSubmit={
              this.state.changedValues.length === 0
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
            {pastDetailsAndShowHistoryButton}
            {ticketHistoryBox}
            <div className="form-row mb-2">
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
