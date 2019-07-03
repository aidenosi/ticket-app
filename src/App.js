import React, { Component } from "react";
import Ticket from "./Ticket.js";

class App extends Component {
  state = {
    showTicket: false
  };

  handleNewTicket = () => {
    console.log("inside handleNewTicket");
    this.setState({ showTicket: !this.state.showticket });
  };

  handleSubmit = e => {
    console.log(e);
    e.preventDefault();
    console.log(
      e.target.contactName.value,
      ",",
      e.target.contactEmail.value,
      ",",
      e.target.contactPhone.value,
      ",",
      e.target.contactExtension.value,
      ",",
      e.target.ticketSummary.value,
      ",",
      e.target.ticketType.value,
      ",",
      e.target.ticketPriority.value,
      ",",
      e.target.ticketCategory.value,
      ",",
      e.target.ticketSubcategory.value,
      ",",
      e.target.ticketDetailedInfo.value
    );
  };

  handleCancel = e => {
    console.log("in handlecancel");
    this.setState({ showTicket: !this.state.showTicket });
  };

  render() {
    let ticket = this.state.showTicket ? (
      <Ticket
        onSubmit={this.handleSubmit}
        onCancel={this.handleCancel}
        style={{ zIndex: 100 }}
      />
    ) : (
      <div>
        <h3>Create new ticket</h3>
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={this.handleNewTicket}
        >
          New ticket
        </button>
      </div>
    );
    return (
      <React.Fragment>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
          integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
          crossOrigin="anonymous"
        />
        {ticket}
      </React.Fragment>
    );
  }
}

export default App;
