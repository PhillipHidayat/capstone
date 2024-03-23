// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Exam, Diagnoses, Patient } = initSchema(schema);

export {
  Exam,
  Diagnoses,
  Patient
};