// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Shorthand, Exam, Diagnoses, Patient } = initSchema(schema);

export {
  Shorthand,
  Exam,
  Diagnoses,
  Patient
};