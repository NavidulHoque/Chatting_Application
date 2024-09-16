/* eslint-disable react/prop-types */

const SingleUserContainer = ({ children, extraStyle, onClick }) => {
    return (
        <div
            className={`flex min-[1770px]:flex-row flex-col min-[1770px]:justify-between justify-center items-center gap-x-1 gap-y-3 ${extraStyle}`}
            onClick={onClick}
        >
            {children}

        </div>
    )
}

export default SingleUserContainer
