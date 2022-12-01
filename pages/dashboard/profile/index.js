import { Text } from "@mantine/core";
import React from "react";

import Layout from "../../components/auth/Layout";
// import Footer from "./components/Footer";

export default function profile() {
  return (
    <div>
      <Text fz="lg" fw={600}>
        Profile
      </Text>
      {/* <Footer /> */}
    </div>
  );
}

profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
