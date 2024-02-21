import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";





type EagerDiagnoses = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Diagnoses, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Exam: string;
  readonly Location: string;
  readonly Diagnoses: string;
  readonly Notes?: string | null;
  readonly Normal: boolean;
  readonly Rating?: number | null;
  readonly LocationDetails?: string | null;
  readonly patientID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDiagnoses = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Diagnoses, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Exam: string;
  readonly Location: string;
  readonly Diagnoses: string;
  readonly Notes?: string | null;
  readonly Normal: boolean;
  readonly Rating?: number | null;
  readonly LocationDetails?: string | null;
  readonly patientID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Diagnoses = LazyLoading extends LazyLoadingDisabled ? EagerDiagnoses : LazyDiagnoses

export declare const Diagnoses: (new (init: ModelInit<Diagnoses>) => Diagnoses) & {
  copyOf(source: Diagnoses, mutator: (draft: MutableModel<Diagnoses>) => MutableModel<Diagnoses> | void): Diagnoses;
}

type EagerPatient = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Patient, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly First_Name: string;
  readonly Last_Name: string;
  readonly Date_Of_Birth: string;
  readonly Sex: string;
  readonly Address: string;
  readonly Phone: string;
  readonly Email: string;
  readonly Provider: string;
  readonly Diagnoses?: (Diagnoses | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPatient = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Patient, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly First_Name: string;
  readonly Last_Name: string;
  readonly Date_Of_Birth: string;
  readonly Sex: string;
  readonly Address: string;
  readonly Phone: string;
  readonly Email: string;
  readonly Provider: string;
  readonly Diagnoses: AsyncCollection<Diagnoses>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Patient = LazyLoading extends LazyLoadingDisabled ? EagerPatient : LazyPatient

export declare const Patient: (new (init: ModelInit<Patient>) => Patient) & {
  copyOf(source: Patient, mutator: (draft: MutableModel<Patient>) => MutableModel<Patient> | void): Patient;
}