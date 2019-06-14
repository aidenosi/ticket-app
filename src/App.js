import React, { Component } from "react";
import ContactInfo from "./components/contactInfo";
//import TicketInfo from "./components/ticketInfo";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
          integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
          crossorigin="anonymous"
        />
      </head>
      <main className="container">
        <ContactInfo />
      </main>
    </React.Fragment>
  );
}

export default App;
