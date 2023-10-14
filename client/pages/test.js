import React from "react";
import { motion } from "framer-motion";
import CatLoading from "@/components/cat-loading";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};
const allHelpers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const Test = () => {
  return (
    <>
      <motion.section
        className="helper-list d-flex flex-wrap"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {allHelpers?.map((helper, index) => (
          <motion.div
            key={helper.user_id}
            variants={item}
            style={{ background: "pink", width: "50px", height: "50px" }}
          ></motion.div>
        ))}
      </motion.section>
    </>
  );
};

export default Test;
