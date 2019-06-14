import React from "react";

const TicketInfo = () => {
  return (
    <form>
      <div className="form-row align-items-center">
        <div className="form-group col-12">
          <label htmlFor="Summary">Summary</label>
          <input type="text" className="form-control" id="Summary" required />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col mr-5">
          <label htmlFor="type">Ticket type</label>
          <select className="form-control" id="type" required>
            <option style={{ display: "none" }} disabled selected value>
              Select type
            </option>
            <option value="request">Request</option>
            <option value="incident">incident</option>
            <option value="task">Task</option>
          </select>
        </div>
        <div className="form-group col mr-5">
          <label htmlFor="priority">Priority</label>
          <select className="form-control" id="priority" required>
            <option style={{ display: "none" }} disabled selected value>
              Select priority
            </option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="form-group col ml-5">
          <label htmlFor="category">Category</label>
          <select className="form-control" id="category" required>
            <option style={{ display: "none" }} disabled selected value>
              Select category
            </option>
            <option value="software">Software</option>
            <option value="hardware">Hardware</option>
          </select>
        </div>
        <div className="form-group col ml-5">
          <label htmlFor="subcategory">Subcategory</label>
          <select className="form-control" id="category" required>
            <option style={{ display: "none" }} disabled selected value>
              Select subcategory
            </option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default TicketInfo;
