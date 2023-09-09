// style
import { Group, FormInputLabel, Input } from './form-input.style';

const FormInput = ({ label, htmlFor, ...inputOptions }) => {
  return (
    <Group>
      <Input {...inputOptions} />
      {label && (
        <FormInputLabel property={inputOptions.value.length} htmlFor={htmlFor}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;

// property={`{shrink:${inputOptions.value.length}}`}