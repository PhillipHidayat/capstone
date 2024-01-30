/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type PatientCreateFormInputValues = {
    First_Name?: string;
    Last_Name?: string;
    Age?: number;
    untitledfield?: string;
    Date_Of_Birth?: string;
    Sex?: string;
    Address?: string;
    Phone?: string;
    Email?: string;
    Provider?: string;
};
export declare type PatientCreateFormValidationValues = {
    First_Name?: ValidationFunction<string>;
    Last_Name?: ValidationFunction<string>;
    Age?: ValidationFunction<number>;
    untitledfield?: ValidationFunction<string>;
    Date_Of_Birth?: ValidationFunction<string>;
    Sex?: ValidationFunction<string>;
    Address?: ValidationFunction<string>;
    Phone?: ValidationFunction<string>;
    Email?: ValidationFunction<string>;
    Provider?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PatientCreateFormOverridesProps = {
    PatientCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    First_Name?: PrimitiveOverrideProps<TextFieldProps>;
    Last_Name?: PrimitiveOverrideProps<TextFieldProps>;
    Age?: PrimitiveOverrideProps<TextFieldProps>;
    untitledfield?: PrimitiveOverrideProps<TextFieldProps>;
    Date_Of_Birth?: PrimitiveOverrideProps<TextFieldProps>;
    Sex?: PrimitiveOverrideProps<TextFieldProps>;
    Address?: PrimitiveOverrideProps<TextFieldProps>;
    Phone?: PrimitiveOverrideProps<TextFieldProps>;
    Email?: PrimitiveOverrideProps<TextFieldProps>;
    Provider?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PatientCreateFormProps = React.PropsWithChildren<{
    overrides?: PatientCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PatientCreateFormInputValues) => PatientCreateFormInputValues;
    onSuccess?: (fields: PatientCreateFormInputValues) => void;
    onError?: (fields: PatientCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PatientCreateFormInputValues) => PatientCreateFormInputValues;
    onValidate?: PatientCreateFormValidationValues;
} & React.CSSProperties>;
export default function PatientCreateForm(props: PatientCreateFormProps): React.ReactElement;
