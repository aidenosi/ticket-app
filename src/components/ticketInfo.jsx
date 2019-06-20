import React, { Component } from "react";

class TicketInfo extends Component {
  state = {
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
    selectedCatagory: "Select catagory"
  };

  handleCatagoryChange = e => {
    console.log(this.state);
    this.setState({ selectedCatagory: e.target.value });
  };

  render() {
    let list;
    if (this.state.selectedCatagory === "Select catagory") {
      list = [{ catagory: "Select catagory", subcatagories: [] }];
    } else {
      list = this.state.catagoriesAndSubcatagories.filter(list => {
        return list.catagory === this.state.selectedCatagory;
      });
    }
    return (
      <form>
        <div className="form-row align-items-center mt-3 mb-5">
          <div className="form-group col-9">
            <label htmlFor="Summary">Summary</label>
            <input type="text" className="form-control" id="Summary" required />
          </div>
        </div>
        <div className="form-row mb-5">
          <div className="form-group col mr-3">
            <label htmlFor="type">Ticket type</label>
            <select
              className="form-control"
              id="type"
              defaultValue="Select type"
              required
            >
              <option style={{ display: "none" }} value="Select type">
                Select type
              </option>
              <option value="Request">Request</option>
              <option value="Incident">Incident</option>
              <option value="Task">Task</option>
            </select>
          </div>
          <div className="form-group col ml-3 mr-3">
            <label htmlFor="priority">Priority</label>
            <select
              className="form-control"
              id="priority"
              defaultValue="Select priority"
              required
            >
              <option style={{ display: "none" }} value="Select priority">
                Select priority
              </option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="form-group col ml-3 mr-3">
            <label htmlFor="category">Category</label>
            <select
              className="form-control"
              id="category"
              value={this.state.selectedCatagory}
              onChange={this.handleCatagoryChange.bind(this)}
              required
            >
              <option style={{ display: "none" }} value="Select category">
                Select category
              </option>
              {this.state.catagoriesAndSubcatagories.map((list, i) => {
                return <option>{list.catagory}</option>;
              })}
            </select>
          </div>
          <div className="form-group col ml-3">
            <label htmlFor="subcategory">Subcategory</label>
            <select
              className="form-control"
              id="subcategory"
              defaultValue="Select subcategory"
              required
            >
              <option style={{ display: "none" }} value="Select subcategory">
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
            <label htmlFor="Detailed">Detailed Info</label>
            <textarea className="form-control" id="Summary" rows="5" />
          </div>
        </div>
        <div className="form-row mb-5">
          <div className="col">
            <button type="button" className="btn btn-primary" id="submit">
              Submit
            </button>
          </div>
          <button type="button" className="btn btn-danger" id="cancel">
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

export default TicketInfo;
