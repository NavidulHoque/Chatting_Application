/* eslint-disable react/prop-types */

const Form = ({children, onSubmit}) => {
  return (
    <form 
        onSubmit={onSubmit}
        className="flex flex-col gap-y-7 w-full font-interRegular">
      {children}
    </form>
  )
}

export default Form
