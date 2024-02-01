/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDiagnoses = /* GraphQL */ `
  query GetDiagnoses($id: ID!) {
    getDiagnoses(id: $id) {
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
export const listDiagnoses = /* GraphQL */ `
  query ListDiagnoses(
    $filter: ModelDiagnosesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDiagnoses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const diagnosesByPatientID = /* GraphQL */ `
  query DiagnosesByPatientID(
    $patientID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDiagnosesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    diagnosesByPatientID(
      patientID: $patientID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getPatient = /* GraphQL */ `
  query GetPatient($id: ID!) {
    getPatient(id: $id) {
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
export const listPatients = /* GraphQL */ `
  query ListPatients(
    $filter: ModelPatientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPatients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
