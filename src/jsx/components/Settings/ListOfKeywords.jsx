import { Table } from "react-bootstrap";

import { BsPencilSquare, BsTrash } from "react-icons/bs";

const tableHeaders = [
  { key: "ticketTypes", label: "Tickets Type", style: { width: "35%" } },
  { key: "keywords", label: "Keyword(s)", style: { width: "35%" } },
  { key: "edit", label: "Edit" },
  { key: "delete", label: "Delete" },
];

function ListOfKeywords({ data, setData, setValues }) {
  if (data.length === 0) return null;

  return (
    <section className="mt-4">
      <h5>List of Keywords</h5>
      <Table
        bordered
        style={{
          width: "90%",
        }}
      >
        <thead>
          <tr role="row">
            {tableHeaders.map((header) => (
              <th
                key={header.key}
                className="sorting"
                style={header.style || {}}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((info) => (
            <tr key={info.id}>
              <td>{info.ticketType}</td>
              <td>{info.keywords}</td>
              <td>
                <button
                  className="btn"
                  onClick={() =>
                    setValues({
                      ticketType: info.ticketType,
                      keywords: info.keywords,
                      id: info.id,
                    })
                  }
                >
                  <BsPencilSquare />
                </button>
              </td>
              <td>
                <button
                  className="btn"
                  onClick={() =>
                    setData((prev) =>
                      prev.filter((prevData) => prevData.id !== info.id)
                    )
                  }
                >
                  <BsTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
}

export default ListOfKeywords;
