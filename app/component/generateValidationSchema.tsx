import * as Yup from "yup";

export interface ValidationField {
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
  minLength?: number;
  min?: number | string | Date;
  maxLength?: number;
  label?: string;
  placeholder?: string;
  isMulti?: boolean;
  value?: any;
  [key: string]: any;
}

const generateValidationSchema = (
  inputFields: ValidationField[]
): Yup.ObjectSchema<Yup.AnyObject> => {
  const schema: Record<string, Yup.AnySchema> = {};

  inputFields.forEach(
    ({
      name,
      type,
      error,
      required,
      minLength,
      min,
      maxLength,
      label,
      placeholder,
      isMulti,
    }) => {
      let validator: Yup.AnySchema;

      // 1. Basic Type Validation Setup
      if (type === "checkbox") {
        validator = Yup.boolean().oneOf([true], `You must be ${label || name}`);
      } else if (type === "time") {
        validator = Yup.string();
      } else if (type === "email") {
        validator = Yup.string().email("Invalid email");
      } else if (type === "url") {
        validator = Yup.string().url("Please enter a valid URL");
      } else if (type === "number") {
        let numValidator = Yup.number();
        if (minLength && maxLength) {
          numValidator = numValidator.test("len", "Invalid Number", (val) =>
            val !== undefined && val !== null
              ? val.toString().length >= minLength &&
                val.toString().length <= maxLength
              : false
          );
        }
        validator = numValidator;
      } else if (type === "date") {
        let dateValidator = Yup.date();
        if (min !== undefined && min !== null) {
          const minDate = new Date(min);
          minDate.setHours(0, 0, 0, 0);

          dateValidator = dateValidator.min(
            minDate,
            error ? error : "Date must be today or future"
          );
        }
        validator = dateValidator;
      } else {
        validator = Yup.string();
      }

      // 2. Custom Named Fields & Configurations
      if (isMulti) {
        let arrayValidator = Yup.array().of(Yup.string());

        if (required) {
          arrayValidator = arrayValidator.min(
            1,
            `Select at least one ${label || name}`
          );
        }
        validator = arrayValidator;
      }

      if (name === "confirmPassword") {
        validator = Yup.string()
          .oneOf([Yup.ref("password"), ], "Passwords must match")
          .required(`${placeholder || "Confirm Password"} is required`);
      }

      if (name === "end_time") {
        validator = Yup.string()
          .required("End Time is required")
          .test(
            "is-after-start",
            "End Time must be greater than Start Time",
            function (value) {
              const { start_time } = this.parent;

              if (!start_time || !value) return true;

              return value > start_time;
            }
          );
      }

      // 3. Apply Required Validation
      if (required && name !== "confirmPassword" && name !== "end_time") {
        validator = (validator as any).required("This field is required");
      }

      schema[name] = validator;
    }
  );

  return Yup.object().shape(schema);
};

export default generateValidationSchema;