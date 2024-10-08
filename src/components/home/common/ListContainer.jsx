/* eslint-disable react/prop-types */

const ListContainer = ({children, shadow}) => { 
    return (
        <div className={`h-[400px] sm:h-[317px] md:h-[430px] xl:h-full p-[20px] ${shadow} overflow-y-auto rounded-lg`}>

            {children}

        </div>
    )
}

export default ListContainer
