import {
  Container,
  Box,
  Text,
  Grid,
  Stepper,
  Button,
  Group,
  TextInput,
  Select,
  Card,
  Divider,
  Image,
  FileButton,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import React, { useEffect, useState, useRef } from "react";
import AuthNavbar from "../components/auth/AuthNavbar";
import CarCard from "../components/parts/CarCard";
import dayjs from "dayjs";
import mandiri from "../../public/mandiri.png";
import bca from "../../public/bca.png";
import { GENDER } from "../../enums/enums";

const Cari = () => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [active, setActive] = useState(0);
  const [car, setCar] = useState(undefined);
  const resetRef = useRef(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };
  const nextStep = () =>
    setActive((current) => {
      form.setValues({
        mobilId: car,
      });
      form.setValues({
        proofPayment: file,
      });

      if (form.validate().hasErrors) {
        console.log("Ada error ", form.errors);
        console.log(form.values);
        console.log("Validate", form.validate().errors);
        return current;
      }
      console.log(form);
      return current < 4 ? current + 1 : current;
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
      proofPayment: "",
    },

    validate: (values) => {
      if (active === 1) {
        return {
          nama:
            values.nama.trim().length < 1 ? "Nama tidak boleh kosong" : null,
          email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
          phone:
            values.phone == "" ? "Nomor Handphone Tidak Boleh Kosong" : null,
          identificationNumber:
            values.identificationNumber === ""
              ? "Nomor Identitas Tidak Boleh Kosong"
              : null,
          gender:
            values.gender === "" ? "Jenis Kelamin Tidak Boleh Kosong" : null,
        };
      }

      return {};
    },
  });

  const { lokasi, startDate, endDate } = router.query;
  useEffect(() => {
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
                      <Text fz="xl" fw={600} mb="sm">
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
                          mt="sm"
                          withAsterisk
                          label="Email"
                          placeholder="Masukkan Alamat Email Anda"
                          {...form.getInputProps("email")}
                        />
                        <TextInput
                          mt="sm"
                          withAsterisk
                          label="Nomor Handphone"
                          placeholder="Masukkan Nomor Handphone"
                          {...form.getInputProps("phone")}
                        />
                        <TextInput
                          mt="sm"
                          withAsterisk
                          label="No. Identitas (KTP)"
                          placeholder="Masukkan Nomor KTP Anda"
                          {...form.getInputProps("identificationNumber")}
                        />
                        <Select
                          mt="sm"
                          label="Jenis Kelamin"
                          placeholder="Pilih Jenis Kelamin"
                          data={GENDER}
                          {...form.getInputProps("gender")}
                        />
                      </form>
                    </Grid.Col>
                  </Grid>
                </Stepper.Step>
                <Stepper.Step
                  label="Tahap Ketiga"
                  description="Review Data"
                  allowStepSelect={active > 2}
                >
                  <Text fz="lg" fw={600} mt={16}>
                    Review
                  </Text>
                  <Grid mt={16}>
                    <Grid.Col xs={12} sm={3}>
                      <Text fz="xl" fw={600} mb="sm">
                        Mobil Pilihan Anda
                      </Text>
                      <CarCard selected={true} />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={9}>
                      <Text fz="xl" fw={600} mb="sm">
                        Data Diri Anda
                      </Text>
                      <Card withBorder radius="md">
                        <Grid>
                          <Grid.Col xs={12} sm={3}>
                            <Text fz="sm" fw={400} color="dimmed">
                              Nama Lengkap
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={9}>
                            <Text fz="md" fw={500}>
                              {form.values.nama}
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={3}>
                            <Text fz="sm" fw={400} color="dimmed">
                              Email
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={9}>
                            <Text fz="md" fw={500}>
                              {form.values.email}
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={3}>
                            <Text fz="sm" fw={400} color="dimmed">
                              Nomor Telepon
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={9}>
                            <Text fz="md" fw={500}>
                              {form.values.phone}
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={3}>
                            <Text fz="sm" fw={400} color="dimmed">
                              No. Identitas (KTP)
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={9}>
                            <Text fz="md" fw={500}>
                              {form.values.identificationNumber}
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={3}>
                            <Text fz="sm" fw={400} color="dimmed">
                              Jenis Kelamin
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={9}>
                            <Text fz="md" fw={500}>
                              {form.values == "MALE"
                                ? "Laki-Laki"
                                : "Perempuan"}
                            </Text>
                          </Grid.Col>
                        </Grid>
                      </Card>
                      <Text fz="xl" fw={600} mb="sm" mt="md">
                        Detail Pembayaran
                      </Text>
                      <Card withBorder radius="md" justify="space-between">
                        <Grid>
                          <Grid.Col xs={12} sm={6}>
                            <Text fz="sm" fw={400} color="dimmed">
                              Sewa mobil Tesla Model S per hari
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={6}>
                            <Text fz="md" fw={600} align="end">
                              IDR 150.000,00
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={6}>
                            <Text fz="sm" fw={400} color="dimmed">
                              Mulai dari{" "}
                              <Text fz="sm" fw={600}>
                                {dayjs(startDate).format("dddd, D MMMM YYYY")}
                              </Text>
                              Sampai
                              <Text fz="sm" fw={600}>
                                {dayjs(endDate).format("dddd, D MMMM YYYY")}
                              </Text>
                              Jumlah hari
                              <Text fz="sm" fw={600}>
                                3 HARI
                              </Text>
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={6}>
                            <Text fz="md" fw={600} align="end">
                              3 x IDR 150.000,00
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12}>
                            <Divider my="sm" />
                          </Grid.Col>
                          <Grid.Col xs={12} sm={6}>
                            <Text fz="sm" fw={400} color="dimmed">
                              Sub Total
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={6}>
                            <Text fz="md" fw={600} align="end">
                              IDR 450.000,00
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={6}>
                            <Text fz="sm" fw={400} color="dimmed">
                              Pajak
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={6}>
                            <Text fz="md" fw={600} align="end">
                              IDR 50,000.00
                            </Text>
                          </Grid.Col>

                          <Grid.Col xs={12}>
                            <Divider my="sm" />
                          </Grid.Col>
                          <Grid.Col xs={12} sm={6}>
                            <Text fz="md" fw={600}>
                              Total
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={6}>
                            <Text fz="md" fw={600} align="end">
                              IDR 500.000,00
                            </Text>
                          </Grid.Col>
                        </Grid>
                      </Card>
                    </Grid.Col>
                  </Grid>
                </Stepper.Step>
                <Stepper.Step
                  label="Tahap Keempat"
                  description="Pembayaran"
                  allowStepSelect={active > 3}
                >
                  <Text fz="xl" fw={600} mb="sm" mt="md">
                    Pembayaran
                  </Text>
                  <Grid>
                    <Grid.Col xs={12} sm={6}>
                      <Card withBorder radius="md" justify="space-between">
                        <Grid>
                          <Grid.Col xs={12} sm={6}>
                            <Text fz="sm" fw={400} color="dimmed">
                              Sewa mobil Tesla Model S per hari
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={6}>
                            <Text fz="md" fw={600} align="end">
                              IDR 150.000,00
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={6}>
                            <Text fz="sm" fw={400} color="dimmed">
                              Mulai dari{" "}
                              <Text fz="sm" fw={600}>
                                {dayjs(startDate).format("dddd, D MMMM YYYY")}
                              </Text>
                              Sampai
                              <Text fz="sm" fw={600}>
                                {dayjs(endDate).format("dddd, D MMMM YYYY")}
                              </Text>
                              Jumlah hari
                              <Text fz="sm" fw={600}>
                                3 HARI
                              </Text>
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={6}>
                            <Text fz="md" fw={600} align="end">
                              3 x IDR 150.000,00
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12}>
                            <Divider my="sm" />
                          </Grid.Col>
                          <Grid.Col xs={12} sm={6}>
                            <Text fz="sm" fw={400} color="dimmed">
                              Sub Total
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={6}>
                            <Text fz="md" fw={600} align="end">
                              IDR 450.000,00
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={6}>
                            <Text fz="sm" fw={400} color="dimmed">
                              Pajak
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={6}>
                            <Text fz="md" fw={600} align="end">
                              IDR 50,000.00
                            </Text>
                          </Grid.Col>

                          <Grid.Col xs={12}>
                            <Divider my="sm" />
                          </Grid.Col>
                          <Grid.Col xs={12} sm={6}>
                            <Text fz="md" fw={600}>
                              Total
                            </Text>
                          </Grid.Col>
                          <Grid.Col xs={12} sm={6}>
                            <Text fz="md" fw={600} align="end">
                              IDR 500.000,00
                            </Text>
                          </Grid.Col>
                        </Grid>
                      </Card>
                    </Grid.Col>
                    <Grid.Col xs={12} sm={6}>
                      <Card withBorder radius="md">
                        <Text fz="xl" fw={600} mb="md">
                          Transfer Pembayaran
                        </Text>
                        <Image
                          src={mandiri.src}
                          alt="Bank Mandiri"
                          width={100}
                        />
                        <Text fz="md" fw={400} mt="sm">
                          PT DriveNow (Admin Wibi)
                        </Text>
                        <Text fz="lg" fw={700} mt="sm" mb="md">
                          9213128391212
                        </Text>
                        <Image src={bca.src} alt="Bank BCA" width={100} />
                        <Text fz="md" fw={400} mt="sm">
                          PT DriveNow (Admin Fatur)
                        </Text>
                        <Text fz="lg" fw={700} mt="sm">
                          30212109121
                        </Text>

                        <Text fz="xl" fw={600} mt="md">
                          Upload Bukti Transfer
                        </Text>
                        <Group position="center" mt="sm">
                          <FileButton
                            resetRef={resetRef}
                            onChange={setFile}
                            accept="image/png,image/jpeg"
                          >
                            {(props) => (
                              <Button {...props}>Upload image</Button>
                            )}
                          </FileButton>
                          <Button
                            disabled={!file}
                            color="red"
                            onClick={clearFile}
                          >
                            Reset
                          </Button>
                        </Group>
                        {file && (
                          <Text size="sm" align="center" mt="sm">
                            Picked file: {file.name}
                          </Text>
                        )}
                      </Card>
                    </Grid.Col>
                  </Grid>
                </Stepper.Step>
                <Stepper.Completed>
                  Completed, click back button to get to previous step
                </Stepper.Completed>
              </Stepper>

              <Group position="center" mt="xl">
                <Button variant="default" onClick={prevStep}>
                  Back
                </Button>
                {active === 3 ? (
                  <Button
                    disabled={file === null}
                    type="submit"
                    onClick={nextStep}
                  >
                    Next step
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={car == null}
                    onClick={nextStep}
                  >
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
