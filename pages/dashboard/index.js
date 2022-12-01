import { Container, Grid, Paper, Text, Box, Tabs } from "@mantine/core";
import React from "react";

import Layout from "../components/auth/Layout";
// import Footer from "./components/Footer";

export default function dashboard() {
  return (
    <div>
      <Text fz="lg" fw={600}>
        Transaksi
      </Text>
    </div>
  );
}

dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
