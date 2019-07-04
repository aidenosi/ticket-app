import React, { Component } from "react";
import Ticket from "./Ticket.js";

class App extends Component {
  state = {
    showTicket: false
  };

  handleNewTicket = () => {
    this.setState({ showTicket: true });
  };

  handleSubmit = e => {
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
    window.alert("Ticket has been submitted.");
    this.setState({ showTicket: false });
  };

  handleCancel = e => {
    this.setState({ showTicket: false });
  };

  render() {
    let ticket = this.state.showTicket ? (
      <div id="_ticket">
        <Ticket onSubmit={this.handleSubmit} onCancel={this.handleCancel} />
      </div>
    ) : (
      ""
    );
    return (
      <React.Fragment>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
          integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="./App.css" />
        <main className="container bg-light pb-2 pt-2">
          <div>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={this.handleNewTicket}
            >
              New ticket
            </button>
          </div>
          <div className="container">{ticket}</div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
