import AgentHeading from "./AgentHeading";
import AgentTable from "./AgentTable";

function Agent() {
  return (
    <main className=" px-5" style={{ marginTop: "50px" }}>
      <AgentHeading />
      <AgentTable />
    </main>
  );
}

export default Agent;
