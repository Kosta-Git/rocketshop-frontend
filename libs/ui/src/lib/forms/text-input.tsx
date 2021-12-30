interface InputFieldProps {
  name: string;
  type?: string;
  label: string;
  placeholder?: string;

  // Use either formik or manual hooks
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik?: any;
}

export const InputField = (props: InputFieldProps) => {
  const { name, type = "text", label, placeholder, formik } = props;
  return (
    <div>
      <label className="text-sm font-bold text-blue-800 block" htmlFor={name}>
        {label}
        <input
          type={type}
          id={name}
          name={name}
          value={formik.values[name]}
          placeholder={placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full border rounded focus:outline-none ${formik.errors[name] ? "border-red-600" : "border-blue-500"}`}
        />
      </label>
      {formik.errors[name] && (
        <span className="block text-red-600">{formik.errors[name]}</span>
      )}
    </div>
  );
};
