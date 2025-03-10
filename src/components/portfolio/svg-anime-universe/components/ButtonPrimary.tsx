import { motion } from "framer-motion";
import { type FunctionComponent } from "react";

type ButtonTextProps = {
  color?: string | undefined;
  href: string;
  children: React.ReactNode;
};

const ButtonPrimary: FunctionComponent<ButtonTextProps> = ({ children, href, ...props }) => (
  <a>
    <motion.button
      className={"buttonPrimary buttonAnime"}
      whileHover={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
      whileTap={{
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
      }}
      {...props}
    >
      <span>{children}</span>
    </motion.button>
  </a>
);

export default ButtonPrimary;
