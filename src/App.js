import React, { Component } from "react";
import Ticket from "./Ticket.js";
import Modal from "react-bootstrap/Modal";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";

/*
------------ TO DO ------------
  - Implement proper server validation and errors
  - Fix 'JSON.parse: unexpected character' error when submitting changes

------------ DONE ------------
  + Add timestamp to details
  + Fix table columns resizing
  + Use modal for ticket instead of just displaying over site
  + Show previous details in uneditable text box, merge new changes upon submitting
  + Fix issue where tickets don't show new details after Submitting then re-opening (have to re-open, cancel, then open again)
  + Find a solution to the issue where the main screen doesn't update after editing ticket 
    + Fixed by giving user prompt which allows React time to update state
  + Ticket now actually checks to see if changes have been made (ie new value is different than value passed in)
  + Add new uneditable field for history of ticket (changes to category, type, status, etc)
    + Don't update details unless new information is added
  + Sort table view
    + Refactored code to use react-bootstrap-table-next instead of default react table
  + Fix sort carets not showing
    + Enabled bootstrap4 on BootstrapTable
  + Implement search function 
    + Can currently search by ID, contact details, summary, category, and subcategory.
  + Search all columns
  + Adjust all column search to ignore timestamps - put details and history to new table
*/

class App extends Component {
  state = {
    DB_URL: "https://ticket-backend-api.herokuapp.com/",
    showModal: false, // Use to determine when to display modal ticket component
    newTicket: false, // Used to determine whether data needs to be filled
    allTickets: "", // Array of all tickets
    requestedTicket: "" // The last ticket requested to view
  };

  /**
   * Populate state with tickets and set document title upon loading.
   */
  componentDidMount = () => {
    this.getAllTickets();
    document.title = "PickIt";
  };

  /**
   * Function to check HTTP status codes of responses.
   */
  checkStatus = (response, msg) => {
    if (response.ok) {
      return response;
    } else {
      let err = new Error(msg);
      window.alert(err);
      throw err;
    }
  };

  /**
   * Queries a fetch request for all tickets and updates state list.
   */
  getAllTickets = () => {
    fetch(this.state.DB_URL + "tickets")
      .then(response => this.checkStatus(response, "Could not load tickets."))
      .then(response => response.json())
      .then(response => this.setState({ allTickets: response }));
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
  handleViewTicket = id => {
    fetch(this.state.DB_URL + "tickets/" + id)
      .then(response => this.checkStatus(response, "Invalid ticket ID."))
      .then(response => response.json())
      .then(response =>
        this.setState({
          requestedTicket: response[0],
          showModal: true,
          newTicket: false
        })
      );
  };

  /**
   * Handler for submit button. Queries a POST request to send form data to Postgres DB
   * to submit a new ticket.
   */
  handleSubmit = e => {
    e.preventDefault();
    // If user confirms submission
    if (window.confirm("Submit ticket?")) {
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
      const timestamp =
        "\r\n__________________________________________\r\n" +
        "Submitted on: " +
        dformat +
        ":\r\n";
      fetch(this.state.DB_URL + "tickets", {
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
          details: e.target.ticketNewDetailedInfo.value,
          timestamp: timestamp,
          history: ""
        })
      });
      window.alert("Ticket has been submitted."); // Alert user that ticket submitted
      this.setState({ newTicket: false, showModal: false }, this.getAllTickets); // Hide ticket
    }
  };

  /**
   * Handler for edit button. Queries a PUT request to send form data to Postgres DB
   * to update a ticket.
   */
  handleEdit = e => {
    let id = e.target.id;
    // If user confirms submission
    if (window.confirm("Submit changes to ticket #" + id + "?")) {
      e.preventDefault();
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
      const timestamp =
        "\r\n__________________________________________\r\n" +
        "Edited on: " +
        dformat +
        ":\r\n";

      var changes = dformat + ":\r\n"; // Timestamp for changes
      // Inner function to add line for any changes made
      function changedValue(field, oldValue, newValue) {
        return field === "Details"
          ? "Ticket details updated.\r\n"
          : '"' +
              field +
              '" changed from "' +
              oldValue +
              '" to "' +
              newValue +
              '"\r\n';
      }
      // This series of if statements detect if changes have been made, and if so, calls inner function to write these changes
      if (e.target.contactName.value !== this.state.requestedTicket.name) {
        changes += changedValue(
          "Name",
          this.state.requestedTicket.name,
          e.target.contactName.value
        );
      }
      if (e.target.contactEmail.value !== this.state.requestedTicket.email) {
        changes += changedValue(
          "Email",
          this.state.requestedTicket.email,
          e.target.contactEmail.value
        );
      }
      if (e.target.contactPhone.value !== this.state.requestedTicket.phone) {
        if (
          e.target.contactPhone.value === "" &&
          this.state.requestedTicket.phone !== null
        ) {
          changes += changedValue(
            "Phone",
            this.state.requestedTicket.phone,
            e.target.contactPhone.value
          );
        }
      }
      if (
        e.target.contactExtension.value !== this.state.requestedTicket.extension
      ) {
        if (
          e.target.contactExtension.value === "" &&
          this.state.requestedTicket.extension !== null
        ) {
          changes += changedValue(
            "Extension",
            this.state.requestedTicket.extension,
            e.target.contactExtension.value
          );
        }
      }
      if (e.target.ticketSummary.value !== this.state.requestedTicket.summary) {
        changes += changedValue(
          "Summary",
          this.state.requestedTicket.summary,
          e.target.ticketSummary.value
        );
      }
      if (e.target.ticketStatus.value !== this.state.requestedTicket.status) {
        changes += changedValue(
          "Status",
          this.state.requestedTicket.status,
          e.target.ticketStatus.value
        );
      }
      if (e.target.ticketType.value !== this.state.requestedTicket.type) {
        changes += changedValue(
          "Type",
          this.state.requestedTicket.type,
          e.target.ticketType.value
        );
      }
      if (
        e.target.ticketPriority.value !== this.state.requestedTicket.priority
      ) {
        changes += changedValue(
          "Priority",
          this.state.requestedTicket.priority,
          e.target.ticketPriority.value
        );
      }
      if (
        e.target.ticketCategory.value !== this.state.requestedTicket.category
      ) {
        changes += changedValue(
          "Category",
          this.state.requestedTicket.category,
          e.target.ticketCategory.value
        );
      }
      if (
        e.target.ticketSubcategory.value !==
        this.state.requestedTicket.subcategory
      ) {
        changes += changedValue(
          "Subcategory",
          this.state.requestedTicket.subcategory,
          e.target.ticketSubcategory.value
        );
      }
      // Always write that details have been updated (since they must be updated to edit a ticket).
      changes += changedValue(
        "Details",
        this.state.requestedTicket.details,
        e.target.ticketDetailedInfo.value
      );

      // Only write previous history if it is not null
      changes +=
        this.state.requestedTicket.history === null
          ? ""
          : "\r\n" + this.state.requestedTicket.history;
      fetch(this.state.DB_URL + "tickets/" + id, {
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
          details: e.target.ticketNewDetailedInfo.value,
          timestamp: timestamp,
          history: changes
        })
      }).then(response => response.json());
      window.alert("Changes have been submitted."); // Alert user that changes submitted
      this.setState(
        {
          newTicket: false,
          showModal: false,
          requestedTicket: ""
        },
        this.getAllTickets
      );
      // If user presses cancel, do nothing
    } else {
      e.preventDefault();
    }
  };

  /**
   * Handler for cancel button. Hides ticket from view after user confirms (function
   * called from Ticket.js after confirmation).
   */
  handleCancel = () => {
    this.setState({ showModal: false, newTicket: false, requestedTicket: "" });
  };

  /**
   * Handler for search function.
   */
  handleSearchTickets = e => {
    e.preventDefault();
    // Extract search column and term from form
    const searchColumn = e.target.searchColumn.value.toLowerCase();
    const searchTerm = e.target.searchTerm.value.toLowerCase();
    // Switch case to determine which fetch to use
    switch (searchColumn) {
      case "all":
        fetch(this.state.DB_URL + "search/" + searchTerm)
          .then(response => response.json())
          .then(response => {
            if (response.rows !== undefined || response === []) {
              this.setState({ allTickets: response });
            } else {
              window.alert("No tickets found with search critera.");
              this.getAllTickets();
            }
          });
        break;
      case "id":
        this.handleViewTicket(searchTerm);
        break;
      case "contact info":
        fetch(this.state.DB_URL + "search/contact/" + searchTerm)
          .then(response => response.json())
          .then(response => {
            if (response.rows !== undefined || response === []) {
              this.setState({ allTickets: response });
            } else {
              window.alert("No tickets found with search critera.");
              this.getAllTickets();
            }
          });
        break;
      default:
        fetch(this.state.DB_URL + "search/" + searchColumn + "/" + searchTerm)
          .then(response => response.json())
          .then(response => {
            if (response.rows !== undefined || response === []) {
              this.setState({ allTickets: response });
            } else {
              window.alert("No tickets found with search critera.");
              this.getAllTickets();
            }
          });
        break;
    }
  };

  render() {
    var ticketsArray = [];
    if (this.state.allTickets !== "") {
      let tickets = this.state.allTickets;
      tickets.forEach(function(ticket) {
        ticketsArray.push({
          id: ticket.id,
          summary: ticket.summary,
          status: ticket.status,
          type: ticket.type,
          priority: ticket.priority,
          category: ticket.category,
          subcategory: ticket.subcategory
        });
      });
    }

    const columns = [
      {
        dataField: "id",
        text: "ID",
        sort: true
      },
      {
        dataField: "summary",
        text: "Summary",
        sort: true
      },
      {
        dataField: "status",
        text: "Status",
        sort: true
      },
      {
        dataField: "type",
        text: "Type",
        sort: true
      },
      {
        dataField: "priority",
        text: "Priority",
        sort: true
      },
      {
        dataField: "category",
        text: "Category"
      },
      {
        dataField: "subcategory",
        text: "Subcategory"
      }
    ];

    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        this.handleViewTicket(row.id);
      },
      onMouseEnter: (e, row, rowIndex) => {
        e.currentTarget.style.cursor = "pointer";
      }
    };

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
            history=""
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
            phone={
              this.state.requestedTicket.phone === null
                ? ""
                : this.state.requestedTicket.phone
            }
            extension={
              this.state.requestedTicket.extension === null
                ? ""
                : this.state.requestedTicket.extension
            }
            summary={this.state.requestedTicket.summary}
            status={this.state.requestedTicket.status}
            type={this.state.requestedTicket.type}
            priority={this.state.requestedTicket.priority}
            category={this.state.requestedTicket.category}
            subcategory={this.state.requestedTicket.subcategory}
            details={this.state.requestedTicket.details}
            history={
              this.state.requestedTicket.history === null
                ? ""
                : this.state.requestedTicket.history
            }
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
          <div className="form-row">
            {/* Refresh and new ticket buttons */}
            <div className="form-group col">
              <button
                className="btn btn-secondary"
                onClick={this.getAllTickets}
              >
                Refresh tickets
              </button>
              <button
                className="btn btn-primary"
                onClick={this.handleNewTicket}
              >
                New ticket
              </button>
            </div>
            <div className="form-group col">
              <form
                onSubmit={this.handleSearchTickets}
                style={{ float: "right" }}
              >
                <div className="form-row">
                  <div className="form-group col">
                    <select
                      className="form-control"
                      name="searchColumn"
                      defaultValue="All"
                    >
                      <option value="All">All</option>
                      <option value="ID">ID</option>
                      <option value="Contact Info">Contact Info</option>
                      <option value="Summary">Summary</option>
                      <option value="Details">Details</option>
                    </select>
                  </div>
                  <div className="form-group col">
                    <input
                      type="text"
                      className="form-control"
                      name="searchTerm"
                    />
                  </div>
                  <div className="form-group col">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      id="submitSearch"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <hr />
          {/* List view of tickets */}
          <h3>Tickets</h3>
          <div className="container">
            <BootstrapTable
              classes="ticketsTable"
              bootstrap4={true}
              keyField="id"
              data={ticketsArray}
              columns={columns}
              rowEvents={rowEvents}
              bordered={false}
              hover
            />
          </div>
          <Modal size="lg" show={this.state.showModal} onHide={null}>
            {ticket}
          </Modal>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
