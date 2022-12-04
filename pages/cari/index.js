import {
  Container,
  Box,
  Text,
  Grid,
  Stepper,
  Button,
  Group,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import React, { useEffect, useState } from "react";
import AuthNavbar from "../components/auth/AuthNavbar";
import CarCard from "../components/parts/CarCard";
import dayjs from "dayjs";

const Cari = () => {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [car, setCar] = useState(undefined);
  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const form = useForm({
    initialValues: {
      nama: "",
      mobilId: car,
      email: "",
      identificationNumber: "",
      gender: "",
      phone: "",
      catatan: "",
    },
    validate: (values) => {
      if (active === 1) {
        return {
          nama: values.name === undefined ? "Nama Harus Diisi" : "",
          email: (values) =>
            values.email === /^\S+@\S+$/.test(values.email)
              ? null
              : "Invalid email",
        };
      }

      return {};
    },
  });

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

  const handleSelectCar = (id) => {
    setCar(id);
  };

  return (
    <div>
      <AuthNavbar />

      <Box style={{ backgroundColor: "#F7F9FB" }} p="md">
        <Container p="md">
          {!lokasi || !startDate || !endDate ? (
            <p>loading...</p>
          ) : (
            <>
              <Stepper active={active} onStepClick={setActive} breakpoint="sm">
                <Stepper.Step
                  label="Langkah 1"
                  description="Pilih Mobil"
                  allowStepSelect={active > 0}
                >
                  <Text fz="lg" fw="bold" mt={16}>
                    Pilih mobil buat di {lokasi}
                  </Text>
                  <Text fz="md">
                    {dayjs(startDate).format("dddd, D MMMM YYYY")} -{" "}
                    {dayjs(endDate).format("dddd, D MMMM YYYY")}
                  </Text>
                  <Text>Mobil {car}</Text>
                  <Grid mt={16}>
                    {data.map((item) => (
                      <Grid.Col xs={12} sm={6} lg={4} key={item.id}>
                        <CarCard
                          handleSelectCar={handleSelectCar}
                          id={item.id}
                        />
                      </Grid.Col>
                    ))}
                  </Grid>
                </Stepper.Step>
                <Stepper.Step
                  label="Langkah Kedua"
                  description="Isi Data Diri"
                  allowStepSelect={active > 1}
                >
                  <Text fz="lg" fw={600} mt={16}>
                    Isi Data Diri Anda
                  </Text>
                  <Grid mt={16}>
                    <Grid.Col xs={12} sm={3}>
                      <CarCard selected={true} />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={9}>
                      <Text fz="xl" fw={600} mb={16}>
                        Data Diri Anda
                      </Text>
                      <form onSubmit={(values) => console.log(values)}>
                        <TextInput
                          withAsterisk
                          label="Nama Lengkap"
                          placeholder="Isi Nama Lengkap Anda"
                          {...form.getInputProps("nama")}
                        />
                        <TextInput
                          withAsterisk
                          label="Email"
                          placeholder="Masukkan Alamat Email Anda"
                          {...form.getInputProps("email")}
                        />
                        {/* <TextInput
                          withAsterisk
                          label="Nomor Handphone"
                          placeholder="Masukkan Nomor Handphone Anda"
                          {...form.getInputProps("phone")}
                        />
                        <TextInput
                          withAsterisk
                          label="No. Identitas (KTP)"
                          placeholder="Masukkan Nomor KTP Anda"
                          {...form.getInputProps("identificationNumber")}
                        />
                        <TextInput
                          withAsterisk
                          label="Jenis Kelamin"
                          placeholder="Jenis Kelamin Anda"
                          {...form.getInputProps("gender")}
                        />
                        <TextInput
                          label="Catatan"
                          placeholder="Catatan"
                          {...form.getInputProps("catatan")}
                        /> */}
                      </form>
                    </Grid.Col>
                  </Grid>
                </Stepper.Step>
                <Stepper.Step
                  label="Final step"
                  description="Get full access"
                  allowStepSelect={active > 2}
                >
                  Step 3 content: Get full access
                </Stepper.Step>
                <Stepper.Completed>
                  Completed, click back button to get to previous step
                </Stepper.Completed>
              </Stepper>

              <Group position="center" mt="xl">
                <Button variant="default" onClick={prevStep}>
                  Back
                </Button>
                {active}
                {active === 1 ? (
                  <Button disabled={car === null} onClick={nextStep}>
                    Next step
                  </Button>
                ) : (
                  <Button disabled={car == null} onClick={nextStep}>
                    Next step
                  </Button>
                )}
              </Group>
            </>
          )}
        </Container>
      </Box>
    </div>
  );
};

export default Cari;
