/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { Patient } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function PatientUpdateForm(props) {
  const {
    id: idProp,
    patient: patientModelProp,
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
    Date_Of_Birth: "",
    Sex: "",
    Address: "",
    Phone: "",
    Email: "",
    Provider: "",
  };
  const [First_Name, setFirst_Name] = React.useState(initialValues.First_Name);
  const [Last_Name, setLast_Name] = React.useState(initialValues.Last_Name);
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
    const cleanValues = patientRecord
      ? { ...initialValues, ...patientRecord }
      : initialValues;
    setFirst_Name(cleanValues.First_Name);
    setLast_Name(cleanValues.Last_Name);
    setDate_Of_Birth(cleanValues.Date_Of_Birth);
    setSex(cleanValues.Sex);
    setAddress(cleanValues.Address);
    setPhone(cleanValues.Phone);
    setEmail(cleanValues.Email);
    setProvider(cleanValues.Provider);
    setErrors({});
  };
  const [patientRecord, setPatientRecord] = React.useState(patientModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Patient, idProp)
        : patientModelProp;
      setPatientRecord(record);
    };
    queryData();
  }, [idProp, patientModelProp]);
  React.useEffect(resetStateValues, [patientRecord]);
  const validations = {
    First_Name: [{ type: "Required" }],
    Last_Name: [{ type: "Required" }],
    Date_Of_Birth: [{ type: "Required" }],
    Sex: [{ type: "Required" }],
    Address: [{ type: "Required" }],
    Phone: [{ type: "Required" }, { type: "Phone" }],
    Email: [{ type: "Required" }, { type: "Email" }],
    Provider: [{ type: "Required" }],
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
          await DataStore.save(
            Patient.copyOf(patientRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "PatientUpdateForm")}
      {...rest}
    >
      <TextField
        label="First name"
        isRequired={true}
        isReadOnly={false}
        value={First_Name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              First_Name: value,
              Last_Name,
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
        isRequired={true}
        isReadOnly={false}
        value={Last_Name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              First_Name,
              Last_Name: value,
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
        label="Date of birth"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={Date_Of_Birth}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              First_Name,
              Last_Name,
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
        isRequired={true}
        isReadOnly={false}
        value={Sex}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              First_Name,
              Last_Name,
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
        isRequired={true}
        isReadOnly={false}
        value={Address}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              First_Name,
              Last_Name,
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
        isRequired={true}
        isReadOnly={false}
        type="tel"
        value={Phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              First_Name,
              Last_Name,
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
        isRequired={true}
        isReadOnly={false}
        value={Email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              First_Name,
              Last_Name,
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
        isRequired={true}
        isReadOnly={false}
        value={Provider}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              First_Name,
              Last_Name,
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || patientModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || patientModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
