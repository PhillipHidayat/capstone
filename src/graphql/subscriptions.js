/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDiagnoses = /* GraphQL */ `
  subscription OnCreateDiagnoses(
    $filter: ModelSubscriptionDiagnosesFilterInput
  ) {
    onCreateDiagnoses(filter: $filter) {
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
export const onUpdateDiagnoses = /* GraphQL */ `
  subscription OnUpdateDiagnoses(
    $filter: ModelSubscriptionDiagnosesFilterInput
  ) {
    onUpdateDiagnoses(filter: $filter) {
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
export const onDeleteDiagnoses = /* GraphQL */ `
  subscription OnDeleteDiagnoses(
    $filter: ModelSubscriptionDiagnosesFilterInput
  ) {
    onDeleteDiagnoses(filter: $filter) {
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
export const onCreatePatient = /* GraphQL */ `
  subscription OnCreatePatient($filter: ModelSubscriptionPatientFilterInput) {
    onCreatePatient(filter: $filter) {
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
export const onUpdatePatient = /* GraphQL */ `
  subscription OnUpdatePatient($filter: ModelSubscriptionPatientFilterInput) {
    onUpdatePatient(filter: $filter) {
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
export const onDeletePatient = /* GraphQL */ `
  subscription OnDeletePatient($filter: ModelSubscriptionPatientFilterInput) {
    onDeletePatient(filter: $filter) {
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
