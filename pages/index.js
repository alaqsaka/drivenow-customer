import Head from "next/head";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import FeaturesAsymmetrical from "./components/LandingPage/Features";
import Navbar from "./components/Navbar";
import Cars from "./components/parts/Cars";
import ContactUs from "./components/parts/ContactUs";

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>DriveNow | Sewa mobil murah dan cepat</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Hero />
      <FeaturesAsymmetrical />
      <Cars />
      <ContactUs />
    </>
  );
}

IndexPage.getLayout = function getLayout(page) {
  return (
    <>
      <Navbar />
      {page}
      <Footer />
    </>
  );
};
