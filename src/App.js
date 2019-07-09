import React, { Component } from "react";
import Ticket from "./Ticket.js";

class App extends Component {
  state = {
    showTicket: false,
    newTicket: false,
    allTickets: "",
    requestedTicket: ""
  };

  /**
   * Populate state with tickets upon loading.
   */
  componentDidMount = () => {
    this.getAllTickets();
  };

  /**
   * Fetch request for all tickets (to populate main menu).
   */
  getAllTickets = () => {
    fetch("http://localhost:3001/tickets")
      .then(res => res.json())
      .then(res => this.setState({ allTickets: res }));
  };

  /**
   * Handler for new ticket.
   */
  handleNewTicket = () => {
    this.setState({ showTicket: true, newTicket: true });
  };

  /**
   * Handler for opening a ticket.
   */
  handleViewTicket = e => {
    let id = e.target.id;
    fetch("http://localhost:3001/tickets/" + id)
      .then(response => response.json())
      .then(response => this.setState({ requestedTicket: response[0] }));
    this.setState({ showTicket: true, newTicket: false });
  };

  /**
   * Handler for submit button.
   */
  handleSubmit = e => {
    e.preventDefault();
    // Fetch request to post form data to databse.
    fetch("http://localhost:3001/tickets", {
      method: "post",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: e.target.contactName.value,
        email: e.target.contactEmail.value,
        phone: e.target.contactPhone.value,
        extension: e.target.contactExtension.value,
        summary: e.target.ticketSummary.value,
        type: e.target.ticketType.value,
        priority: e.target.ticketPriority.value,
        category: e.target.ticketCategory.value,
        subcategory: e.target.ticketSubcategory.value,
        details: e.target.ticketDetailedInfo.value
      })
    });
    window.alert("Ticket has been submitted.");
    this.setState({ showTicket: false, newTicket: false });
    this.getAllTickets();
  };

  handleEdit = e => {
    let id = e.target.id;
    if (window.confirm("Submit changes to ticket #" + id + "?")) {
      fetch("http://localhost:3001/tickets/" + id, {
        method: "put",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: e.target.contactName.value,
          email: e.target.contactEmail.value,
          phone: e.target.contactPhone.value,
          extension: e.target.contactExtension.value,
          summary: e.target.ticketSummary.value,
          type: e.target.ticketType.value,
          priority: e.target.ticketPriority.value,
          category: e.target.ticketCategory.value,
          subcategory: e.target.ticketSubcategory.value,
          details: e.target.ticketDetailedInfo.value
        })
      }).then(response => response.json());
    }
    this.setState({ showTicket: false, newTicket: false });
    this.getAllTickets();
  };

  /**
   * Hanlder for cancel button.
   */
  handleCancel = () => {
    this.setState({ showTicket: false, newTicket: false });
  };

  render() {
    // TODO - Find a better way of doing this!!
    let ticketList;
    // If there are tickets...
    if (this.state.allTickets !== "") {
      let tickets = this.state.allTickets;
      // ...map each ticket to a row with properties displayed
      ticketList = tickets.map(ticket => (
        <tr className="border" key={ticket.id}>
          <td>{ticket.id}</td>
          <td>{ticket.summary}</td>
          <td>{ticket.type}</td>
          <td>{ticket.priority}</td>
          <td>{ticket.category}</td>
          <td>{ticket.subcategory}</td>
          <td style={{ textAlign: "right" }}>
            <button
              className="btn btn-sm btn-primary"
              onClick={this.handleViewTicket}
              id={ticket.id}
            >
              View
            </button>
          </td>
        </tr>
      ));
    }
    let ticket = this.state.showTicket ? (
      this.state.newTicket ? (
        //New ticket
        <div id="_ticket">
          <Ticket
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
            id=""
            name=""
            email=""
            phone=""
            extension=""
            summary=""
            type=""
            priority=""
            category="Select category"
            subcategory=""
            details=""
          />
        </div>
      ) : (
        //Edit ticket
        <div id="_ticket">
          <Ticket
            key={this.state.requestedTicket.id}
            onSubmit={this.handleEdit}
            onCancel={this.handleCancel}
            id={this.state.requestedTicket.id}
            name={this.state.requestedTicket.name}
            email={this.state.requestedTicket.email}
            phone={this.state.requestedTicket.phone}
            extension={this.state.requestedTicket.extension}
            summary={this.state.requestedTicket.summary}
            type={this.state.requestedTicket.type}
            priority={this.state.requestedTicket.priority}
            category={this.state.requestedTicket.category}
            subcategory={this.state.requestedTicket.subcategory}
            details={this.state.requestedTicket.details}
          />
        </div>
      )
    ) : (
      ""
    );
    //this.getAllTickets();
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
              className="btn btn-sm btn-secondary"
              onClick={this.getAllTickets}
            >
              Refresh tickets
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={this.handleNewTicket}
            >
              New ticket
            </button>
          </div>
          <hr />
          <h3>Tickets</h3>
          <div className="container">
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Summary</th>
                  <th>Type</th>
                  <th>Priority</th>
                  <th>Category</th>
                  <th>Subcategory</th>
                </tr>
              </tbody>
              <tbody>{ticketList}</tbody>
            </table>
          </div>
          <div className="container">{ticket}</div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
