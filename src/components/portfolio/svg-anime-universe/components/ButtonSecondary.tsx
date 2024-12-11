import { motion } from "framer-motion";
import { type FunctionComponent } from "react";

type ButtonTextProps = {
  color?: string | undefined;
  children: React.ReactNode;
};
const ButtonSecondary: FunctionComponent<ButtonTextProps> = ({ children }) => (
  <motion.button
    whileHover={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
    whileTap={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)" }}
    className={"buttonSecondary buttonAnime"}
  >
    <span>{children}</span>
  </motion.button>
);

export default ButtonSecondary;
