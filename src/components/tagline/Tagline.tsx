import tagline from "@/config/content/tagline";
import "@/app/globals.css";

type Props = {};

function Tagline({}: Props) {
  return <div className="text-center text-3xl font-medium">{tagline}</div>;
}

export default Tagline;
