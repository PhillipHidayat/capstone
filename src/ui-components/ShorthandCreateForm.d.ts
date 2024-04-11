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
export declare type ShorthandCreateFormInputValues = {
    User?: string;
    key?: string;
    value?: string;
};
export declare type ShorthandCreateFormValidationValues = {
    User?: ValidationFunction<string>;
    key?: ValidationFunction<string>;
    value?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ShorthandCreateFormOverridesProps = {
    ShorthandCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    User?: PrimitiveOverrideProps<TextFieldProps>;
    key?: PrimitiveOverrideProps<TextFieldProps>;
    value?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ShorthandCreateFormProps = React.PropsWithChildren<{
    overrides?: ShorthandCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ShorthandCreateFormInputValues) => ShorthandCreateFormInputValues;
    onSuccess?: (fields: ShorthandCreateFormInputValues) => void;
    onError?: (fields: ShorthandCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ShorthandCreateFormInputValues) => ShorthandCreateFormInputValues;
    onValidate?: ShorthandCreateFormValidationValues;
} & React.CSSProperties>;
export default function ShorthandCreateForm(props: ShorthandCreateFormProps): React.ReactElement;
