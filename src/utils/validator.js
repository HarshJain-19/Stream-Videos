export const emptyFieldValidations = (obj, fields) => {
  if (!(fields instanceof Array))
    throw new Error("required fields in array format in emptyFieldValidations function");
  fields = Array.from(new Set(fields));
  let emptyFields = [];
  fields.forEach(field => !obj[field]?.trim() && (emptyFields.push(field)));
  return emptyFields;
};

export const makeRequiredError = fields => {
  let strFields = fields.join(", ");
  if (fields.length)
    return (strFields.substring(0, strFields.lastIndexOf(",")) + " and" + strFields.substring(strFields.lastIndexOf(",")+1)) + " are required!";
  return "";
};


