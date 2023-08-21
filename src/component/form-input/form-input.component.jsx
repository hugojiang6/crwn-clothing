import './form-input.style.scss';

const FormInput = ({ label, htmlFor, inputOptions }) => {
  return (
    <div className='group'>
      {/* 要符合css選擇器，把input移至上方 */}
      <input className='form-input' {...inputOptions} />
      {label && (
        <label className={`${inputOptions.value.length ? 'shrink' : ''} form-input-label`} htmlFor={htmlFor}>
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
