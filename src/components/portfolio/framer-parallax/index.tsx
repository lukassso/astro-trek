import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import HeaderPortfolio from "../common/header-portfolio";

export default function FramerParallaxComponent() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  return (
    <div className="relative grid h-screen w-full place-items-center overflow-hidden">
      <motion.div
        style={{ y: textY }}
        className="text-dark relative z-10 dark:text-white md:text-9xl"
      >
        <HeaderPortfolio
          title="Framer Parallax"
          description="Homepage teaser with a parallax effect, showcasing dynamic scroll animations."
          chipsList={["React", "Typescript", "Framer Motion", "Tailwind CSS"]}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-0 opacity-50"
        style={{
          backgroundImage: `url(/assets/images/image-full.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: backgroundY,
        }}
      />
      <div
        className="absolute inset-0 z-20 opacity-90"
        style={{
          backgroundImage: `url(/assets/images/image-bottom.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
}
