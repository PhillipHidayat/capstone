/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { createPatient } from "../graphql/mutations";
export default function PatientCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    First_Name: "",
    Last_Name: "",
    Age: "",
    untitledfield: "",
    Date_Of_Birth: "",
    Sex: "",
    Address: "",
    Phone: "",
    Email: "",
    Provider: "",
  };
  const [First_Name, setFirst_Name] = React.useState(initialValues.First_Name);
  const [Last_Name, setLast_Name] = React.useState(initialValues.Last_Name);
  const [Age, setAge] = React.useState(initialValues.Age);
  const [untitledfield, setUntitledfield] = React.useState(
    initialValues.untitledfield
  );
  const [Date_Of_Birth, setDate_Of_Birth] = React.useState(
    initialValues.Date_Of_Birth
  );
  const [Sex, setSex] = React.useState(initialValues.Sex);
  const [Address, setAddress] = React.useState(initialValues.Address);
  const [Phone, setPhone] = React.useState(initialValues.Phone);
  const [Email, setEmail] = React.useState(initialValues.Email);
  const [Provider, setProvider] = React.useState(initialValues.Provider);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setFirst_Name(initialValues.First_Name);
    setLast_Name(initialValues.Last_Name);
    setAge(initialValues.Age);
    setUntitledfield(initialValues.untitledfield);
    setDate_Of_Birth(initialValues.Date_Of_Birth);
    setSex(initialValues.Sex);
    setAddress(initialValues.Address);
    setPhone(initialValues.Phone);
    setEmail(initialValues.Email);
    setProvider(initialValues.Provider);
    setErrors({});
  };
  const validations = {
    First_Name: [],
    Last_Name: [],
    Age: [],
    untitledfield: [],
    Date_Of_Birth: [],
    Sex: [],
    Address: [],
    Phone: [{ type: "Phone" }],
    Email: [{ type: "Email" }],
    Provider: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          First_Name,
          Last_Name,
          Age,
          untitledfield,
          Date_Of_Birth,
          Sex,
          Address,
          Phone,
          Email,
          Provider,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: createPatient.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "PatientCreateForm")}
      {...rest}
    >
      <TextField
        label="First name"
        isRequired={false}
        isReadOnly={false}
        value={First_Name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              First_Name: value,
              Last_Name,
              Age,
              untitledfield,
              Date_Of_Birth,
              Sex,
              Address,
              Phone,
              Email,
              Provider,
            };
            const result = onChange(modelFields);
            value = result?.First_Name ?? value;
          }
          if (errors.First_Name?.hasError) {
            runValidationTasks("First_Name", value);
          }
          setFirst_Name(value);
        }}
        onBlur={() => runValidationTasks("First_Name", First_Name)}
        errorMessage={errors.First_Name?.errorMessage}
        hasError={errors.First_Name?.hasError}
        {...getOverrideProps(overrides, "First_Name")}
      ></TextField>
      <TextField
        label="Last name"
        isRequired={false}
        isReadOnly={false}
        value={Last_Name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              First_Name,
              Last_Name: value,
              Age,
              untitledfield,
              Date_Of_Birth,
              Sex,
              Address,
              Phone,
              Email,
              Provider,
            };
            const result = onChange(modelFields);
            value = result?.Last_Name ?? value;
          }
          if (errors.Last_Name?.hasError) {
            runValidationTasks("Last_Name", value);
          }
          setLast_Name(value);
        }}
        onBlur={() => runValidationTasks("Last_Name", Last_Name)}
        errorMessage={errors.Last_Name?.errorMessage}
        hasError={errors.Last_Name?.hasError}
        {...getOverrideProps(overrides, "Last_Name")}
      ></TextField>
      <TextField
        label="Age"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Age}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              First_Name,
              Last_Name,
              Age: value,
              untitledfield,
              Date_Of_Birth,
              Sex,
              Address,
              Phone,
              Email,
              Provider,
            };
            const result = onChange(modelFields);
            value = result?.Age ?? value;
          }
          if (errors.Age?.hasError) {
            runValidationTasks("Age", value);
          }
          setAge(value);
        }}
        onBlur={() => runValidationTasks("Age", Age)}
        errorMessage={errors.Age?.errorMessage}
        hasError={errors.Age?.hasError}
        {...getOverrideProps(overrides, "Age")}
      ></TextField>
      <TextField
        label="Untitledfield"
        isRequired={false}
        isReadOnly={false}
        value={untitledfield}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              First_Name,
              Last_Name,
              Age,
              untitledfield: value,
              Date_Of_Birth,
              Sex,
              Address,
              Phone,
              Email,
              Provider,
            };
            const result = onChange(modelFields);
            value = result?.untitledfield ?? value;
          }
          if (errors.untitledfield?.hasError) {
            runValidationTasks("untitledfield", value);
          }
          setUntitledfield(value);
        }}
        onBlur={() => runValidationTasks("untitledfield", untitledfield)}
        errorMessage={errors.untitledfield?.errorMessage}
        hasError={errors.untitledfield?.hasError}
        {...getOverrideProps(overrides, "untitledfield")}
      ></TextField>
      <TextField
        label="Date of birth"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={Date_Of_Birth}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              First_Name,
              Last_Name,
              Age,
              untitledfield,
              Date_Of_Birth: value,
              Sex,
              Address,
              Phone,
              Email,
              Provider,
            };
            const result = onChange(modelFields);
            value = result?.Date_Of_Birth ?? value;
          }
          if (errors.Date_Of_Birth?.hasError) {
            runValidationTasks("Date_Of_Birth", value);
          }
          setDate_Of_Birth(value);
        }}
        onBlur={() => runValidationTasks("Date_Of_Birth", Date_Of_Birth)}
        errorMessage={errors.Date_Of_Birth?.errorMessage}
        hasError={errors.Date_Of_Birth?.hasError}
        {...getOverrideProps(overrides, "Date_Of_Birth")}
      ></TextField>
      <TextField
        label="Sex"
        isRequired={false}
        isReadOnly={false}
        value={Sex}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              First_Name,
              Last_Name,
              Age,
              untitledfield,
              Date_Of_Birth,
              Sex: value,
              Address,
              Phone,
              Email,
              Provider,
            };
            const result = onChange(modelFields);
            value = result?.Sex ?? value;
          }
          if (errors.Sex?.hasError) {
            runValidationTasks("Sex", value);
          }
          setSex(value);
        }}
        onBlur={() => runValidationTasks("Sex", Sex)}
        errorMessage={errors.Sex?.errorMessage}
        hasError={errors.Sex?.hasError}
        {...getOverrideProps(overrides, "Sex")}
      ></TextField>
      <TextField
        label="Address"
        isRequired={false}
        isReadOnly={false}
        value={Address}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              First_Name,
              Last_Name,
              Age,
              untitledfield,
              Date_Of_Birth,
              Sex,
              Address: value,
              Phone,
              Email,
              Provider,
            };
            const result = onChange(modelFields);
            value = result?.Address ?? value;
          }
          if (errors.Address?.hasError) {
            runValidationTasks("Address", value);
          }
          setAddress(value);
        }}
        onBlur={() => runValidationTasks("Address", Address)}
        errorMessage={errors.Address?.errorMessage}
        hasError={errors.Address?.hasError}
        {...getOverrideProps(overrides, "Address")}
      ></TextField>
      <TextField
        label="Phone"
        isRequired={false}
        isReadOnly={false}
        type="tel"
        value={Phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              First_Name,
              Last_Name,
              Age,
              untitledfield,
              Date_Of_Birth,
              Sex,
              Address,
              Phone: value,
              Email,
              Provider,
            };
            const result = onChange(modelFields);
            value = result?.Phone ?? value;
          }
          if (errors.Phone?.hasError) {
            runValidationTasks("Phone", value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks("Phone", Phone)}
        errorMessage={errors.Phone?.errorMessage}
        hasError={errors.Phone?.hasError}
        {...getOverrideProps(overrides, "Phone")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={Email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              First_Name,
              Last_Name,
              Age,
              untitledfield,
              Date_Of_Birth,
              Sex,
              Address,
              Phone,
              Email: value,
              Provider,
            };
            const result = onChange(modelFields);
            value = result?.Email ?? value;
          }
          if (errors.Email?.hasError) {
            runValidationTasks("Email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("Email", Email)}
        errorMessage={errors.Email?.errorMessage}
        hasError={errors.Email?.hasError}
        {...getOverrideProps(overrides, "Email")}
      ></TextField>
      <TextField
        label="Provider"
        isRequired={false}
        isReadOnly={false}
        value={Provider}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              First_Name,
              Last_Name,
              Age,
              untitledfield,
              Date_Of_Birth,
              Sex,
              Address,
              Phone,
              Email,
              Provider: value,
            };
            const result = onChange(modelFields);
            value = result?.Provider ?? value;
          }
          if (errors.Provider?.hasError) {
            runValidationTasks("Provider", value);
          }
          setProvider(value);
        }}
        onBlur={() => runValidationTasks("Provider", Provider)}
        errorMessage={errors.Provider?.errorMessage}
        hasError={errors.Provider?.hasError}
        {...getOverrideProps(overrides, "Provider")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
