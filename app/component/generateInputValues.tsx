export interface InputFieldItem {
  name: string;
  value?: any;
  [key: string]: any;
}

const generateInitialValues = (
  inputArr: InputFieldItem[]
): Record<string, any> => {
  const initialValues: Record<string, any> = {};

  inputArr.forEach((element) => {
    // If element.value is undefined, default to empty string or appropriate empty value
    initialValues[element.name] = element.value !== undefined ? element.value : "";
  });

  return initialValues;
};

export default generateInitialValues;