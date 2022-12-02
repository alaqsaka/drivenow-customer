import {
  Box,
  Button,
  createStyles,
  Grid,
  Paper,
  Select,
  Text,
} from "@mantine/core";
import Head from "next/head";
import React from "react";
import AuthNavbar from "../components/auth/AuthNavbar";
import Layout from "../components/auth/Layout";
import bg from "../../public/bg.svg";
import { DatePicker, DateRangePicker } from "@mantine/dates";
import { IconCalendar, IconLocation } from "@tabler/icons";

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan("sm");

  return {
    wrapper: {
      boxSizing: "border-box",
      position: "relative",
      backgroundImage: `url(${bg.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      border: "1px solid transparent",
      padding: theme.spacing.xl,
      flex: "0 0 280px",
      [BREAKPOINT]: {
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
      },
      height: "300px",
      display: "flex",
      alignItems: "center",
    },
    title: {
      color: theme.white,
      fontSize: 40,
      fontWeight: 900,
      lineHeight: 1.1,

      [theme.fn.smallerThan("sm")]: {
        fontSize: 40,
        lineHeight: 1.2,
      },

      [theme.fn.smallerThan("xs")]: {
        fontSize: 28,
        lineHeight: 1.3,
      },
    },
    inputs: {
      position: "absolute",
      margin: "0 auto",
      display: "flex",
      marginTop: "-80px",
      justifyContent: "center",
      alignContent: "center",
      width: "100%",
      zIndex: "1",
    },
  };
});
export default function Sewa() {
  const { classes } = useStyles();
  return (
    <>
      <AuthNavbar />
      <Head>
        <title>DriveNow | Sewa Mobil</title>
      </Head>

      <Box className={classes.wrapper}>
        <Text className={classes.title}>
          Sewa mobil murah dan cepat di DriveNow
        </Text>
      </Box>
      <Box className={classes.inputs} p="md">
        <Paper radius="md" p="md" sx={{ width: "768px" }}>
          Pesan rental mobil cepat dan mudah di sini
          <Grid mt="md">
            <Grid.Col xs={12} md={12} lg={4}>
              <Box>
                <Select
                  label="Lokasi Sewa Mobil"
                  placeholder="Pilih Lokasi Sewa"
                  searchable
                  size="md"
                  nothingFound="Tidak tersedia"
                  data={[
                    "Jakarta",
                    "Bandung",
                    "Bogor",
                    "Surabaya",
                    "Jogjakarta",
                  ]}
                  icon={<IconLocation size={25} />}
                />
              </Box>
            </Grid.Col>
            <Grid.Col xs={12} md={6} lg={5}>
              <DateRangePicker
                placeholder="Tanggal Mulai dan Selesai Sewa"
                label="Pilih Tanggal Mulai dan Selesai Sewa"
                radius="md"
                size="md"
                icon={<IconCalendar size={25} />}
              />
            </Grid.Col>
            <Grid.Col
              xs={12}
              md={6}
              lg={3}
              display="flex"
              style={{ alignItems: "end" }}
            >
              <Box>
                <Button radius="md" size="md" fullWidth>
                  Lihat Pilihan Mobil
                </Button>
              </Box>
            </Grid.Col>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}
