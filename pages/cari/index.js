import { Container, Box, Text, Grid } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AuthNavbar from "../components/auth/AuthNavbar";
import CarCard from "../components/parts/CarCard";
import dayjs from "dayjs";

const Cari = () => {
  const router = useRouter();
  console.log(router);
  const { lokasi, startDate, endDate } = router.query;
  useEffect(() => {
    // if (!router.isReady)
    if (router.isReady) {
      if (!lokasi || !startDate || !endDate) router.push("/sewa");
    }
  }, []);

  const data = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];

  return (
    <div>
      <AuthNavbar />

      <Box style={{ backgroundColor: "#F7F9FB" }} p="md">
        <Container p="md">
          {!lokasi || !startDate || !endDate ? (
            <p>loading...</p>
          ) : (
            <>
              <Text fz="lg" fw="bold">
                Pilih mobil buat di {lokasi}
              </Text>
              <Text fz="md">
                {dayjs(startDate).format("dddd, D MMMM YYYY")} -{" "}
                {dayjs(endDate).format("dddd, D MMMM YYYY")}
              </Text>

              <Grid mt={16}>
                {data.map((item) => (
                  <Grid.Col xs={12} sm={6} lg={4} key={item.id}>
                    <CarCard />
                  </Grid.Col>
                ))}
              </Grid>
            </>
          )}
        </Container>
      </Box>
    </div>
  );
};

export default Cari;
