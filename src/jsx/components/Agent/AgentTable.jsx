import React from "react";
import { Table } from "react-bootstrap";

const tableHeaders = [
  { key: "agentName", label: "Agent Name" },
  { key: "email", label: "Email Address" },
  { key: "totalTickets", label: "No of tickets" },
  { key: "resolvedTickets", label: "Tickets Resolved" },
  { key: "action", label: "Action" },
];

const agentData = [
  {
    agentName: "Alice Johnson",
    email: "alice.johnson@example.com",
    totalTickets: 120,
    resolvedTickets: 95,
    action: "...",
  },
  {
    agentName: "Bob Smith",
    email: "bob.smith@example.com",
    totalTickets: 87,
    resolvedTickets: 80,
    action: "...",
  },
  {
    agentName: "Cynthia Lee",
    email: "cynthia.lee@example.com",
    totalTickets: 102,
    resolvedTickets: 102,
    action: "...",
  },
  {
    agentName: "David Kim",
    email: "david.kim@example.com",
    totalTickets: 64,
    resolvedTickets: 45,
    action: "...",
  },
  {
    agentName: "Emma Williams",
    email: "emma.williams@example.com",
    totalTickets: 73,
    resolvedTickets: 69,
    action: "...",
  },
];

function AgentTable() {
  return (
    <>
      <Table striped bordered>
        <thead>
          <tr role="row">
            {tableHeaders.map((header) => (
              <th key={header.key} className="sorting">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {agentData.map((agent, index) => (
            <tr key={index}>
              <td>{agent.agentName}</td>
              <td>{agent.email}</td>
              <td>{agent.totalTickets}</td>
              <td>{agent.resolvedTickets}</td>
              <td>
                <button className="btn">{agent.action}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                <div className="dataTables_info">
                  Showing {activePag.current * sort + 1} to{" "}
                  {data.length > (activePag.current + 1) * sort
                    ? (activePag.current + 1) * sort
                    : data.length}{" "}
                  of {data.length} entries
                </div>
                </div>
                </div>
                </div> */}
    </>
  );
}

export default AgentTable;
