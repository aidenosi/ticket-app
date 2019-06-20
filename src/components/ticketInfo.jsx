import React, { Component } from "react";

class TicketInfo extends Component {
  render() {
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
              <option style={{ display: "none" }} disabled value="Select type">
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
              <option
                style={{ display: "none" }}
                disabled
                value="Select priority"
              >
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
              defaultValue="Select category"
              required
            >
              <option
                style={{ display: "none" }}
                disabled
                value="Select category"
              >
                Select category
              </option>
              <option value="Software">Software</option>
              <option value="Hardware">Hardware</option>
              <option value="Other">Other</option>
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
              <option
                style={{ display: "none" }}
                disabled
                value="Select subcategory"
              >
                Select subcategory
              </option>
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
          <button type="button" className="btn btn-danger " id="cancel">
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

export default TicketInfo;
