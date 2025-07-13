import React, { useState } from "react";
import "./UserForm.css";

const UserForm = () => {
  const [fields, setFields] = useState([{ name: "", age: "" }]);
  const [errors, setErrors] = useState([]);
  const handleChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };
  const addField = () => {
    setFields([...fields, { name: "", age: "" }]);
  };

  const deleteField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = [];
    fields.forEach((field, index) => {
      const fieldErrors = {};
      if (!field.name.trim()) fieldErrors.name = "Name is required";
      if (!field.age) fieldErrors.age = "Age group is required";
      newErrors[index] = fieldErrors;
    });

    setErrors(newErrors);
    const hasErrors = newErrors.some((err) => Object.keys(err).length > 0);
    if (!hasErrors) {
      console.log("Form submitted:", fields);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div key={index} className="form-row">
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter your name"
                value={field.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
              {errors[index]?.name && (
                <div className="error">{errors[index].name} </div>
              )}
            </div>
            <div className="input-group">
              <select
                value={field.age}
                onChange={(e) => handleChange(index, "age", e.target.value)}
              >
                <option value="">Select Age Group</option>
                <option value="teen">Teenager</option>
                <option value="adult">Adult</option>
                <option value="senior">Senior</option>
              </select>
              {errors[index]?.age && (
                <div className="error">{errors[index].age} </div>
              )}
            </div>

            <button
              type="button"
              className="delete-button"
              onClick={() => deleteField(index)}
            >
              Delete
            </button>
          </div>
        ))}

        <button type="button" onClick={addField} className="add-button">
          Add
        </button>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      <div className="form-output">
        <h3>Form State:</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age Group</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{field.name}</td>
                <td>{field.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserForm;
