import React, { Component } from "react";
import Ticket from "./Ticket.js";
import Modal from "react-bootstrap/Modal";

/*
------------ TO DO ------------
  - Find a solution to the issue where the main screen doesn't update after editing ticket
  - Add new uneditable field for history of ticket (changes to category, type, status, etc)
    - Don't update details unless new information is added
  - Find a better/more efficient way to handle displaying tickets (instead of ternary operator)

------------ DONE ------------
  - Add timestamp to details
  - Fix table columns resizing
  - Use modal for ticket instead of just displaying over site
  - Show previous details in uneditable text box, merge new changes upon submitting
*/

class App extends Component {
  state = {
    showModal: false, // Use to determine when to display modal ticket component
    newTicket: false, // Used to determine whether data needs to be filled
    allTickets: "", // Array of all tickets
    requestedTicket: "" // The last ticket requested to view
  };

  /**
   * Populate state with tickets upon loading.
   */
  componentDidMount = () => {
    this.getAllTickets();
  };

  /**
   * Queries a fetch request for all tickets and updates state list.
   */
  getAllTickets = () => {
    fetch("http://localhost:3001/tickets")
      .then(res => res.json())
      .then(res => this.setState({ allTickets: res }));
  };

  /**
   * Handler for new ticket. Displays ticket with no data filled.
   */
  handleNewTicket = () => {
    this.setState({ showModal: true, newTicket: true });
  };

  /**
   * Handler for opening a ticket. Queries a fetch request for a ticket by ID number.
   */
  handleViewTicket = e => {
    let id = e.target.id;
    fetch("http://localhost:3001/tickets/" + id)
      .then(response => response.json())
      .then(response => this.setState({ requestedTicket: response[0] }));
    this.setState({ showModal: true, newTicket: false }); // Show ticket, fill data
  };

  /**
   * Handler for submit button. Queries a POST request to send form data to Postgres DB
   * to submit a new ticket.
   */
  handleSubmit = e => {
    e.preventDefault();
    // Write timestamp for when ticket was submitted to details
    var d = new Date(),
      dformat =
        [
          ("00" + d.getDate()).slice(-2),
          ("00" + (d.getMonth() + 1)).slice(-2),
          d.getFullYear()
        ].join("/") +
        " at " +
        [
          ("00" + d.getHours()).slice(-2),
          ("00" + d.getMinutes()).slice(-2),
          ("00" + d.getSeconds()).slice(-2)
        ].join(":");
    const detailsWithTimestamp =
      "\r\n__________________________________________\r\n" +
      "Submitted on: " +
      dformat +
      ":\r\n" +
      e.target.ticketNewDetailedInfo.value;
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
        status: e.target.ticketStatus.value,
        type: e.target.ticketType.value,
        priority: e.target.ticketPriority.value,
        category: e.target.ticketCategory.value,
        subcategory: e.target.ticketSubcategory.value,
        details: detailsWithTimestamp
      })
    });
    window.alert("Ticket has been submitted."); // Alert user that ticket submitted
    this.setState({ newTicket: false, showModal: false }); // Hide ticket
    this.getAllTickets(); // Refresh ticket list
  };

  /**
   * Handler for edit button. Queries a PUT request to send form data to Postgres DB
   * to update a ticket.
   */
  handleEdit = e => {
    let id = e.target.id;
    if (window.confirm("Submit changes to ticket #" + id + "?")) {
      // Write timestamp for when changes were made in details.
      var d = new Date(),
        dformat =
          [
            ("00" + d.getDate()).slice(-2),
            ("00" + (d.getMonth() + 1)).slice(-2),
            d.getFullYear()
          ].join("/") +
          " at " +
          [
            ("00" + d.getHours()).slice(-2),
            ("00" + d.getMinutes()).slice(-2),
            ("00" + d.getSeconds()).slice(-2)
          ].join(":");
      const detailsWithTimestamp =
        "\r\n__________________________________________\r\n" +
        "Edited on: " +
        dformat +
        ":\r\n" +
        e.target.ticketNewDetailedInfo.value +
        e.target.ticketDetailedInfo.value;
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
          status: e.target.ticketStatus.value,
          type: e.target.ticketType.value,
          priority: e.target.ticketPriority.value,
          category: e.target.ticketCategory.value,
          subcategory: e.target.ticketSubcategory.value,
          details: detailsWithTimestamp
        })
      }).then(response => response.json());
    }
    this.setState({ newTicket: false, showModal: false }); // Hide ticket
    this.getAllTickets(); // Refresh ticket list
  };

  /**
   * Handler for cancel button. Hides ticket from view after user confirms (function
   * called from Ticket.js after confirmation).
   */
  handleCancel = () => {
    this.setState({ showModal: false, newTicket: false });
  };

  render() {
    let ticketList;
    // If there are tickets...
    if (this.state.allTickets !== "") {
      let tickets = this.state.allTickets;
      // ...map each ticket to a row with properties displayed
      ticketList = tickets.map(ticket => (
        <tr className="border" key={ticket.id}>
          <td>{ticket.id}</td>
          <td>{ticket.summary}</td>
          <td>{ticket.status}</td>
          <td>{ticket.type}</td>
          <td>{ticket.priority}</td>
          <td>{ticket.category}</td>
          <td>{ticket.subcategory}</td>
          {/* View Button */}
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
    // TODO - Find a better way of doing this!!
    let ticket = this.state.showModal ? (
      this.state.newTicket ? (
        // New ticket - don't fill fields
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
            status=""
            type=""
            priority=""
            category="Select category"
            subcategory=""
            details=""
          />
        </div>
      ) : (
        // Edit ticket - fill fields with data
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
            status={this.state.requestedTicket.status}
            type={this.state.requestedTicket.type}
            priority={this.state.requestedTicket.priority}
            category={this.state.requestedTicket.category}
            subcategory={this.state.requestedTicket.subcategory}
            details={this.state.requestedTicket.details}
          />
        </div>
      )
    ) : (
      // Don't show ticket
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
        {/* Main container */}
        <main className="container bg-light pb-2 pt-2">
          <div>
            {/* Refresh and new ticket buttons */}
            <button
              className="btn btn-sm btn-secondary"
              onClick={this.getAllTickets}
            >
              Refresh tickets
            </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={this.handleNewTicket}
            >
              New ticket
            </button>
          </div>
          <hr />
          {/* List view of tickets */}
          <h3>Tickets</h3>
          <div className="container">
            <table
              className="ticketsTable"
              style={{
                width: "100%",
                tableLayout: "fixed",
                textOverflow: "auto"
              }}
            >
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Summary</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th>Priority</th>
                  <th>Category</th>
                  <th>Subcategory</th>
                </tr>
              </tbody>
              <tbody>{ticketList}</tbody>
            </table>
          </div>
          <Modal
            size="lg"
            show={this.state.showModal}
            onHide={this.handleHideModal}
          >
            {ticket}
          </Modal>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
