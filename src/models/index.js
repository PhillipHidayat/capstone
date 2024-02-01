// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Diagnoses, Patient } = initSchema(schema);

export {
  Diagnoses,
  Patient
};