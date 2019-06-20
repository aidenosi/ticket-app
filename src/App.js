import React, { Component } from "react";
import ContactInfo from "./components/contactInfo";
import TicketInfo from "./components/ticketInfo";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
          integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
          crossOrigin="anonymous"
        />
      </head>
      <main className="container bg-light pb-2 pt-2">
        <h3 className="mt-3">Contact Information</h3>
        <ContactInfo />
        <h3>Ticket Information</h3>
        <TicketInfo />
      </main>
    </React.Fragment>
  );
}

export default App;
