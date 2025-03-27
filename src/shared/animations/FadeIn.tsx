import { motion } from "framer-motion";

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: fadeInVariants.hidden,
        visible: {
          ...fadeInVariants.visible,
          transition: { ...fadeInVariants.visible.transition, delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
