import { motion } from "framer-motion";

const SecurityCircles = () => {
  const dots = new Array(35).fill(0);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-3 h-3 bg-red-800 rounded-full opacity-50"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 50 - 25, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

export default SecurityCircles;
