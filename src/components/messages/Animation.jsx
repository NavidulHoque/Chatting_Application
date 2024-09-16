import { motion } from "framer-motion"

const Animation = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 w-[65%]">

          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[70px] text-blue-600 font-semibold"
          >
            Select a Friend
          </motion.h1>

          <motion.div
            animate={{
              scale: [1, 2, 2, 1, 1],
              rotate: [0, 0, 270, 270, 0],
              borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 1
            }}
            className="w-[150px] h-[150px] bg-blue-600"
          >
          </motion.div>

        </div>
  )
}

export default Animation
