import { Container, Grid, Paper, Text, Box, Tabs } from "@mantine/core";
import React from "react";

import Layout from "../components/auth/Layout";
// import Footer from "./components/Footer";

export default function dashboard() {
  return <div>Transaksi</div>;
}

dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
