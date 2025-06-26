import { Button } from "react-bootstrap";

function ListOfPriorities({ listOfPriority }) {
  if (listOfPriority.length === 0) return null;
  return (
    <section className="mt-4">
      <h5>List of Priorities</h5>
      {listOfPriority.map(({ id, ticketType, priority }) => (
        <div
          key={id}
          className="d-flex justify-content-between align-items-start border p-3 mb-2 rounded"
          style={{
            width: "90%",
          }}
        >
          <div>
            <h6 className="mb-1">{ticketType}</h6>
            <p
              className={`mb-0 fw-semibold ${
                priority === "HIGH" ? "text-danger" : "text-primary"
              }`}
            >
              {priority}
            </p>
          </div>
          <Button variant="" size="sm">
            ...
          </Button>
        </div>
      ))}
    </section>
  );
}

export default ListOfPriorities;
