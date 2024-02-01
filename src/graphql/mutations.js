/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDiagnoses = /* GraphQL */ `
  mutation CreateDiagnoses(
    $input: CreateDiagnosesInput!
    $condition: ModelDiagnosesConditionInput
  ) {
    createDiagnoses(input: $input, condition: $condition) {
      id
      Exam
      Name
      Description
      Notes
      Normal
      Rating
      patientID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateDiagnoses = /* GraphQL */ `
  mutation UpdateDiagnoses(
    $input: UpdateDiagnosesInput!
    $condition: ModelDiagnosesConditionInput
  ) {
    updateDiagnoses(input: $input, condition: $condition) {
      id
      Exam
      Name
      Description
      Notes
      Normal
      Rating
      patientID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteDiagnoses = /* GraphQL */ `
  mutation DeleteDiagnoses(
    $input: DeleteDiagnosesInput!
    $condition: ModelDiagnosesConditionInput
  ) {
    deleteDiagnoses(input: $input, condition: $condition) {
      id
      Exam
      Name
      Description
      Notes
      Normal
      Rating
      patientID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPatient = /* GraphQL */ `
  mutation CreatePatient(
    $input: CreatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    createPatient(input: $input, condition: $condition) {
      id
      First_Name
      Last_Name
      Age
      untitledfield
      Date_Of_Birth
      Sex
      Address
      Phone
      Email
      Provider
      Diagnoses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePatient = /* GraphQL */ `
  mutation UpdatePatient(
    $input: UpdatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    updatePatient(input: $input, condition: $condition) {
      id
      First_Name
      Last_Name
      Age
      untitledfield
      Date_Of_Birth
      Sex
      Address
      Phone
      Email
      Provider
      Diagnoses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePatient = /* GraphQL */ `
  mutation DeletePatient(
    $input: DeletePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    deletePatient(input: $input, condition: $condition) {
      id
      First_Name
      Last_Name
      Age
      untitledfield
      Date_Of_Birth
      Sex
      Address
      Phone
      Email
      Provider
      Diagnoses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
