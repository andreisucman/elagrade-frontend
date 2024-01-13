import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LegalIndex = () => {
  useEffect(() => {
    window.location.href = "/";
  }, []);

  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default LegalIndex;
