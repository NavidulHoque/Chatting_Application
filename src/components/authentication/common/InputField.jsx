/* eslint-disable react/prop-types */

const InputField = ({divStyle, textStyle, inputStyle, errorTextStyle, formik, label, type, name }) => {
    return (
        <div className={divStyle}>

            <label htmlFor={name} className={textStyle}>{label}</label>

            <input
                type={type}
                className={inputStyle}
                value={formik.values[name]}
                onChange={formik.handleChange}
                name={name}
                id={name}
            />

            {formik.errors[name] && formik.touched[name] && (
                <p className={errorTextStyle}>{formik.errors[name]}</p>
            )}

        </div>
    )
}

export default InputField
