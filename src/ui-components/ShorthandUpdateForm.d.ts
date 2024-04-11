/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Shorthand } from "../models";
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
export declare type ShorthandUpdateFormInputValues = {
    User?: string;
    key?: string;
    value?: string;
};
export declare type ShorthandUpdateFormValidationValues = {
    User?: ValidationFunction<string>;
    key?: ValidationFunction<string>;
    value?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ShorthandUpdateFormOverridesProps = {
    ShorthandUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    User?: PrimitiveOverrideProps<TextFieldProps>;
    key?: PrimitiveOverrideProps<TextFieldProps>;
    value?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ShorthandUpdateFormProps = React.PropsWithChildren<{
    overrides?: ShorthandUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    shorthand?: Shorthand;
    onSubmit?: (fields: ShorthandUpdateFormInputValues) => ShorthandUpdateFormInputValues;
    onSuccess?: (fields: ShorthandUpdateFormInputValues) => void;
    onError?: (fields: ShorthandUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ShorthandUpdateFormInputValues) => ShorthandUpdateFormInputValues;
    onValidate?: ShorthandUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ShorthandUpdateForm(props: ShorthandUpdateFormProps): React.ReactElement;
