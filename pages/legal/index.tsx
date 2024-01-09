import { useEffect } from "react";

export async function getStaticProps() {
  return {
    props: {},
  };
}
const LegalIndex = () => {
  useEffect(() => {
    window.location.href = "/";
  }, []);
};

export default LegalIndex;
