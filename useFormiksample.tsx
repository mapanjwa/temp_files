import React from 'react';
import { Formik, Form, useField } from 'formik';

// Validation configuration object
const validationConfig = {
  fieldName1: (value: string) => (value.length < 5 ? 'Field value must be at least 5 characters' : ''),
  fieldName2: (value: string) => {
    // Add validation logic for fieldName2
    return '';
  },
  // Add validation functions for other fields
};

const ChildComponent1 = () => {
  const fieldNames = Object.keys(validationConfig);

  const [field, meta, helpers] = useField(fieldNames);
  const [touched, setTouched] = React.useState(false);

  const handleChange = (name: string, value: string) => {
    const customError = validateField(name, value);

    helpers.setValue(name, value);
    helpers.setError(name, customError);
  };

  const handleBlur = (name: string) => {
    setTouched(true);

    const customError = validateField(name, field.value[name]);

    helpers.setError(name, customError);
  };

  const validateField = (name: string, value: string) => {
    // Use the corresponding validation function from the configuration
    const validationFunction = validationConfig[name];
    return validationFunction ? validationFunction(value) : '';
  };

  const handleSubmit = (values: any) => {
    // Your onSubmit logic
    console.log('Form submitted with values:', values);
    // Call any other necessary functions or APIs

    // Note: If you are using Formik's onSubmit prop directly, it will be called automatically.
  };

  return (
    <Formik initialValues={Object.fromEntries(fieldNames.map((name) => [name, '']))} onSubmit={handleSubmit}>
      <Form>
        {fieldNames.map((name) => (
          <div key={name}>
            <label htmlFor={name}>{name}</label>
            <input
              {...field[name]}
              type="text"
              id={name}
              onChange={(e) => handleChange(name, e.target.value)}
              onBlur={() => handleBlur(name)}
            />
            {touched && meta.error && <div>{meta.error[name]}</div>}
          </div>
        ))}

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
