import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Welcome = () => {
  const words = [
    {
      text: "Daily",
    },
    {
      text: "Blog",
    },
    {
      text: "Insights!",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <TypewriterEffectSmooth words={words} />
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
        }}
        className="div"
      >
        <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mx-auto">
          Join our community of writers and readers. :)
        </p>
      </motion.div>

        <div className="mt-8 flex items-center justify-center flex-wrap">

        <Link to="/blogs" className="h-16 inline-flex  animate-shimmer items-center justify-center rounded-sm border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-0 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-64 mx-4 my-1">
          Get Started &rarr;
        </Link>
        </div>
    </div>
  );
};
