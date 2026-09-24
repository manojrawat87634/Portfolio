import React, { useContext, ComponentType, Dispatch, SetStateAction } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { FaSpinner } from "react-icons/fa";
import Select, { MultiValue, SingleValue } from "react-select";
import { IconType } from "react-icons";
import "react-toastify/dist/ReactToastify.css";
import generateInitialValues from "../generateInputValues";
import generateValidationSchema from "../generateValidationSchema";

// 1. Interfaces for Field Options & Configurations
export interface SelectOption {
    value: string | number;
    label: string;
}

export interface FormField {
    name: string;
    type?: "text" | "password" | "email" | "number" | "select" | "date" | "time" | string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    isMulti?: boolean;
    options?: (SelectOption | string | number)[];
    icon?: IconType;
    onChange?: (value: any, setFieldValue: (field: string, value: any) => void) => void;
    onFieldChange?: (selected: any) => void;
}

export interface ErrorMessages {
    submitFailed?: string;
    [key: string]: string | undefined;
}

export interface ExtraContentProps {
    setIsItemOpen?: Dispatch<SetStateAction<boolean>> | ((open: boolean) => void);
}

// 2. Component Props Interface
export interface DynamicFormProps {
    fields: FormField[];
    heading?: string;
    buttonTitle: string;
    postUrl?: string;
    setIsItemOpen?: Dispatch<SetStateAction<boolean>> | ((open: boolean) => void);
    theme?: "light" | "dark" | string;
    logo?: string;
    handleSubmit?: (
        values: Record<string, any>,
        formikHelpers: FormikHelpers<Record<string, any>>
    ) => Promise<void> | void;
    showToast?: boolean;
    getData?: (res?: any) => Promise<void> | void;
    errorMessages?: ErrorMessages;
    ExtraContent?: ComponentType<ExtraContentProps> | null;
    gradientColors?: string | null;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
    fields,
    heading,
    buttonTitle,
    postUrl = "",
    setIsItemOpen,
    theme = "light",
    logo,
    handleSubmit,
    showToast = false,
    getData = async () => { },
    errorMessages = {},
    ExtraContent,
    gradientColors = null,
}) => {
    const initialValues = generateInitialValues(fields);
    const validationSchema = generateValidationSchema(fields);
    const isDark = theme === "dark";

    return (
        <div className="w-full rounded-2xl border border-gray-100 bg-white shadow-xl">
            <div className="px-4 py-8 sm:px-6 md:px-7">
                {/* Logo + Heading */}
                <div className="mb-4 text-center">
                    {logo && <img className="mx-auto mb-4 w-40 sm:w-48" src={logo} alt="logo" />}
                    {heading && (
                        <h4 className="text-lg font-semibold tracking-wide text-gray-800 sm:text-xl">
                            {heading}
                        </h4>
                    )}
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (
                        values: Record<string, any>,
                        formikHelpers: FormikHelpers<Record<string, any>>
                    ) => {
                        if (handleSubmit) {
                            await handleSubmit(values, formikHelpers);
                        }
                    }}
                >
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {fields.map(
                                    ({
                                        isMulti,
                                        name,
                                        type,
                                        placeholder,
                                        options = [],
                                        icon: Icon,
                                        onChange,
                                        onFieldChange,
                                        required,
                                        label,
                                    }) => {
                                        // Standardize select options
                                        const formattedOptions: SelectOption[] = options.map((opt) =>
                                            typeof opt === "object" && opt !== null && "value" in opt
                                                ? opt
                                                : { value: opt as string | number, label: String(opt) }
                                        );

                                        return (
                                            <div
                                                key={name}
                                                className={`${type === "time" ? "sm:col-span-1" : "sm:col-span-2"}`}
                                            >
                                                {/* Label */}
                                                {label ? (
                                                    <label
                                                        htmlFor={name}
                                                        className="mb-1 block text-sm font-semibold text-gray-700"
                                                    >
                                                        {label}
                                                    </label>
                                                ) : null}

                                                <div className="relative">
                                                    {type === "select" ? (
                                                        <Select<SelectOption, boolean>
                                                            name={name}
                                                            isMulti={!!isMulti}
                                                            options={formattedOptions}
                                                            className="react-select-container text-gray-900"
                                                            classNamePrefix="react-select"
                                                            value={
                                                                isMulti
                                                                    ? formattedOptions.filter((opt) =>
                                                                        (values[name] || []).includes(opt.value)
                                                                    )
                                                                    : formattedOptions.find((opt) => opt.value === values[name]) || null
                                                            }
                                                            onChange={(selected: any) => {
                                                                if (onFieldChange) {
                                                                    onFieldChange(selected);
                                                                }

                                                                if (isMulti) {
                                                                    const multiVal = selected as MultiValue<SelectOption>;
                                                                    const valuesArray = multiVal
                                                                        ? multiVal.map((opt) => opt.value)
                                                                        : [];

                                                                    setFieldValue(name, valuesArray);
                                                                    if (onChange) onChange(valuesArray, setFieldValue);
                                                                } else {
                                                                    const singleVal = selected as SingleValue<SelectOption>;
                                                                    const value = singleVal ? singleVal.value : "";

                                                                    setFieldValue(name, value);
                                                                    if (onChange) onChange(value, setFieldValue);
                                                                }
                                                            }}
                                                            placeholder={placeholder || `Select ${label || ""}`}
                                                            styles={{
                                                                control: (base, state) => ({
                                                                    ...base,
                                                                    minHeight: "44px",
                                                                    borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                                                                    boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
                                                                }),
                                                                singleValue: (base) => ({
                                                                    ...base,
                                                                    color: "#111827",
                                                                }),
                                                                input: (base) => ({
                                                                    ...base,
                                                                    color: "#111827",
                                                                }),
                                                            }}
                                                        />
                                                    ) : (
                                                        <>
                                                            <Field
                                                                type={type || "text"}
                                                                id={name}
                                                                name={name}
                                                                value={values[name] ?? ""}
                                                                required={required}
                                                                placeholder={placeholder}
                                                                className={`peer w-full rounded-lg border border-gray-300 bg-white text-gray-900 ${Icon ? "pl-11" : "pl-3"
                                                                    } pr-3 py-2.5 text-sm font-medium placeholder:text-gray-400 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                            />

                                                            {Icon && (
                                                                <Icon
                                                                    size={20}
                                                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-blue-500"
                                                                />
                                                            )}
                                                        </>
                                                    )}
                                                </div>

                                                <ErrorMessage
                                                    name={name}
                                                    component="div"
                                                    className="mt-1 text-sm text-red-500"
                                                />
                                            </div>
                                        );
                                    }
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="mt-6 text-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 font-semibold uppercase tracking-wide text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-xl ${isSubmitting
                                        ? "cursor-not-allowed opacity-70"
                                        : "active:scale-[0.98] hover:shadow-lg"
                                        }`}
                                    style={{
                                        background: gradientColors ? gradientColors : undefined,
                                    }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FaSpinner size={20} className="animate-spin" />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        buttonTitle
                                    )}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>

                {ExtraContent && (
                    <div className="p-1 pt-4">
                        <ExtraContent setIsItemOpen={setIsItemOpen} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DynamicForm;