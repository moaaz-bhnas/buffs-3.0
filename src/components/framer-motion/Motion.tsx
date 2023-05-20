"use client";

import { motion } from "framer-motion";
import Container from "../container/Container";

type Props = {};

const list = { hidden: { opacity: 0 } };
const item = { hidden: { x: -10, opacity: 0 } };

function Motion({}: Props) {
  return (
    <Container>
      <div className="flex flex-col gap-y-10">
        {/* 
        - motion is a plain HTML or SVG element, supercharged with animation capabilities
        - Animating a motion component is as straightforward as setting values on the animate prop.
        - When these values change, Framer Motion will automatically generate an animation to the latest values.
        */}
        <motion.div
          className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-500"
          animate={{ x: 100 }}
        >
          Basic
        </motion.div>

        {/* 
        - <motion /> extends React's event system with powerful gesture recognisers.
        - It supports hover, tap, pan and drag.
        */}
        <motion.div
          className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-500"
          whileHover={{ scale: 1.2 }}
          whileTap={{ backgroundColor: "lightblue" }}
        >
          Gesture
        </motion.div>

        {/* 
        - Variants can be used to animate entire sub-trees of components with a single animate prop.
        */}
        <motion.ul className="flex gap-2" animate="hidden" variants={list}>
          <motion.li className="h-20 w-20 bg-gray-400" variants={item} />
          <motion.li className="h-20 w-20 bg-gray-400" variants={item} />
          <motion.li className="h-20 w-20 bg-gray-400" variants={item} />
        </motion.ul>

        {/* 
        - Elements can animate as they enter and leave the viewport with the handy whileInView prop.
        */}
        <motion.div
          className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          whileInView
        </motion.div>
      </div>
    </Container>
  );
}

export default Motion;
