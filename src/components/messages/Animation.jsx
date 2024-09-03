import { motion } from "framer-motion"

const Animation = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3">

          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[40px] text-blue-600 font-semibold"
          >
            Select a Friend
          </motion.h1>

          <motion.div
            animate={{
              scale: [1, 2, 2, 1, 1],
              rotate: [0, 0, 270, 270, 0],
              borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            }}
            className="w-[100px] h-[100px] bg-blue-600"
          >
          </motion.div>

        </div>
  )
}

export default Animation
