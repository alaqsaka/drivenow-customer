import { Button, Group } from "@mantine/core";
import Hero from "./components/Hero";
import { FeaturesAsymmetrical } from "./components/LandingPage/Features";
import Cars from "./components/parts/Cars";

export default function IndexPage() {
  return (
    <>
      <Hero />
      <FeaturesAsymmetrical />
      <Cars />
    </>
  );
}
