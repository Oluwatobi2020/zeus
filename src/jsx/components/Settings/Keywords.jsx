import { useState } from "react";
import KeywordsForm from "./KeywordsForm";
import ListOfKeywords from "./ListOfKeywords";

import { useFormik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  ticketType: Yup.string().required("Ticket Type is required"),
  keywords: Yup.string().required("Keyword is required"),
});

const initialValues = { keywords: "", ticketType: "", id: "" };

function Keywords() {
  const [listOfKeywords, setListOfKeywords] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      if (isEdit && editingId !== null) {
        setListOfKeywords((prev) =>
          prev.map((item) =>
            item.id === editingId ? { ...values, id: editingId } : item
          )
        );
      } else {
        setListOfKeywords((prev) => [...prev, { ...values, id: prev.length }]);
      }

      resetForm();
      setIsEdit(false);
      setEditingId(null);

      resetForm();
    },
  });

  return (
    <section>
      <KeywordsForm formik={formik} />
      <ListOfKeywords
        data={listOfKeywords}
        setData={setListOfKeywords}
        setValues={(val) => {
          formik.setValues(val);
          setIsEdit(true);
          setEditingId(val.id);
        }}
      />
    </section>
  );
}

export default Keywords;
