import React, { Component } from "react";
import "./App.css";

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactName: this.props.name,
      contactEmail: this.props.email,
      contactPhone: this.props.phone,
      contactExtension: this.props.extension,
      ticketSummary: this.props.summary,
      ticketType: this.props.type,
      ticketPriority: this.props.priority,
      ticketCategory: "Select category",
      ticketSubcategory: this.props.subcategory,
      ticketDetailedInfo: this.props.details,
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
      formEmpty: true,
      ID: ""
    };
  }

  componentDidMount = () => {
    console.log(this.state.contactEmail);
  };

  handlecategoryChange = e => {
    this.setState({ ticketCategory: e.target.value });
  };

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      formEmpty: false
    });
  };

  handleCancel = () => {
    if (this.state.formEmpty) {
      this.props.onCancel();
    } else {
      if (window.confirm("Do you wish to discard changes?"))
        this.props.onCancel();
    }
  };

  render() {
    let list;
    if (this.state.ticketCategory === "Select category") {
      list = [{ category: "Select category", subcategories: [] }];
    } else {
      list = this.state.categoriesAndSubcategories.filter(list => {
        return list.category === this.props.ticketCategory;
      });
    }
    return (
      <React.Fragment>
        <main className="container bg-light pb-2 pt-2">
          <h3 className="mt-3">Contact Information</h3>
          <form onSubmit={this.props.onSubmit} onCancel={this.handleCancel}>
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
                  onChange={this.handlecategoryChange.bind(this)}
                  required
                >
                  <option style={{ display: "none" }} value="">
                    Select category
                  </option>
                  {this.state.categoriesAndSubcategories.map((list, i) => {
                    return <option key={i}>{list.category}</option>;
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
                  {list[0].subcategories.map((subcategory, i) => {
                    return <option key={i}>{subcategory}</option>;
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
