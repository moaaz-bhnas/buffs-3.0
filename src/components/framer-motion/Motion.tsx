"use client";

import { motion } from "framer-motion";

type Props = {};

/**
 * motion is a plain HTML or SVG element, supercharged with animation capabilities
 */

function Motion({}: Props) {
  return <motion.div animate={{ x: 100 }}>Motion</motion.div>;
}

export default Motion;
