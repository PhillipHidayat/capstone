import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";





type EagerShorthand = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Shorthand, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly User: string;
  readonly key: string;
  readonly value: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyShorthand = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Shorthand, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly User: string;
  readonly key: string;
  readonly value: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Shorthand = LazyLoading extends LazyLoadingDisabled ? EagerShorthand : LazyShorthand

export declare const Shorthand: (new (init: ModelInit<Shorthand>) => Shorthand) & {
  copyOf(source: Shorthand, mutator: (draft: MutableModel<Shorthand>) => MutableModel<Shorthand> | void): Shorthand;
}

type EagerExam = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Exam, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Date: string;
  readonly patientID: string;
  readonly Diagnoses?: (Diagnoses | null)[] | null;
  readonly IntakeForm: string;
  readonly Summary: string;
  readonly Technician?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyExam = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Exam, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Date: string;
  readonly patientID: string;
  readonly Diagnoses: AsyncCollection<Diagnoses>;
  readonly IntakeForm: string;
  readonly Summary: string;
  readonly Technician?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Exam = LazyLoading extends LazyLoadingDisabled ? EagerExam : LazyExam

export declare const Exam: (new (init: ModelInit<Exam>) => Exam) & {
  copyOf(source: Exam, mutator: (draft: MutableModel<Exam>) => MutableModel<Exam> | void): Exam;
}

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
  readonly Key: number;
  readonly examID: string;
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
  readonly Key: number;
  readonly examID: string;
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
  readonly Exams?: (Exam | null)[] | null;
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
  readonly Exams: AsyncCollection<Exam>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Patient = LazyLoading extends LazyLoadingDisabled ? EagerPatient : LazyPatient

export declare const Patient: (new (init: ModelInit<Patient>) => Patient) & {
  copyOf(source: Patient, mutator: (draft: MutableModel<Patient>) => MutableModel<Patient> | void): Patient;
}