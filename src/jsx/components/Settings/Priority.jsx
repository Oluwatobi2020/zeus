import { useState } from "react";
import PriorityForm from "./PriorityForm";
import ListOfPriorities from "./ListOfPriorities";

function Priority() {
  const [listOfPriority, setListOfPriority] = useState([]);

  return (
    <section>
      <PriorityForm
        listOfPriority={listOfPriority}
        setListOfPriority={setListOfPriority}
      />

      <ListOfPriorities listOfPriority={listOfPriority} />
    </section>
  );
}

export default Priority;
