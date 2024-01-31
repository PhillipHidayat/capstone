/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Patient } from "../models";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PatientUpdateFormInputValues = {
    First_Name?: string;
    Last_Name?: string;
    Age?: number;
    Date_Of_Birth?: string;
    Sex?: string;
    Address?: string;
    Phone?: string;
    Email?: string;
    Provider?: string;
};
export declare type PatientUpdateFormValidationValues = {
    First_Name?: ValidationFunction<string>;
    Last_Name?: ValidationFunction<string>;
    Age?: ValidationFunction<number>;
    Date_Of_Birth?: ValidationFunction<string>;
    Sex?: ValidationFunction<string>;
    Address?: ValidationFunction<string>;
    Phone?: ValidationFunction<string>;
    Email?: ValidationFunction<string>;
    Provider?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PatientUpdateFormOverridesProps = {
    PatientUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    First_Name?: PrimitiveOverrideProps<TextFieldProps>;
    Last_Name?: PrimitiveOverrideProps<TextFieldProps>;
    Age?: PrimitiveOverrideProps<TextFieldProps>;
    Date_Of_Birth?: PrimitiveOverrideProps<TextFieldProps>;
    Sex?: PrimitiveOverrideProps<TextFieldProps>;
    Address?: PrimitiveOverrideProps<TextFieldProps>;
    Phone?: PrimitiveOverrideProps<TextFieldProps>;
    Email?: PrimitiveOverrideProps<TextFieldProps>;
    Provider?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PatientUpdateFormProps = React.PropsWithChildren<{
    overrides?: PatientUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    patient?: Patient;
    onSubmit?: (fields: PatientUpdateFormInputValues) => PatientUpdateFormInputValues;
    onSuccess?: (fields: PatientUpdateFormInputValues) => void;
    onError?: (fields: PatientUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PatientUpdateFormInputValues) => PatientUpdateFormInputValues;
    onValidate?: PatientUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PatientUpdateForm(props: PatientUpdateFormProps): React.ReactElement;
