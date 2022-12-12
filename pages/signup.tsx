import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import Footer from "./components/Footer";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import Head from "next/head";

function TooltipFocus({ label, placeholder }: any) {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState("");
  const valid = value.trim().length >= 6;

  return (
    <Tooltip
      label={
        valid ? "All good!" : "Password must include at least 6 characters"
      }
      position="bottom-start"
      withArrow
      opened={opened}
      color={valid ? "teal" : undefined}
    >
      <PasswordInput
        label={label}
        required
        placeholder={placeholder}
        onFocus={() => setOpened(true)}
        onBlur={() => setOpened(false)}
        mt="md"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
    </Tooltip>
  );
}

export default function Signup() {
  const form = useForm({
    initialValues: {
      name: "",
      password: "",
      retypePassword: "",
      email: "",
      phone: "",
      dateOfBirth: "",
    },

    validate: (values) => {
      return {
        name:
          values.name.trim().length < 6
            ? "Username must include at least 6 characters"
            : null,
        password:
          values.password.length < 6
            ? "Password must include at least 6 characters"
            : null,
        phone:
          values.phone.length < 6
            ? "Phone number must include at least 6 characters"
            : null,
        email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
      };
    },
  });

  const handleSubmit = (values: any) => {
    console.log(" submitt ", values);
  };

  return (
    <>
      <Head>
        <title>DriveNow | Daftar</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Selamat Datang di <br />
          DriveNow
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Sudah punya akun?{" "}
          <Anchor<"a"> href="/login" size="sm">
            Masuk
          </Anchor>
        </Text>

        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Nama Lengkap"
              placeholder="Nama Lengkap"
              required
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Nomor Telepon"
              mt="md"
              placeholder="Nomor Telepon"
              required
              {...form.getInputProps("phone")}
            />
            <TextInput
              label="Email"
              mt="md"
              placeholder="you@mantine.dev"
              required
              {...form.getInputProps("email")}
            />

            <PasswordInput
              label="Password"
              mt="md"
              placeholder="Your password"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              mt="md"
              label="Retype Password"
              placeholder="Retype password"
              {...form.getInputProps("retypePassword")}
            />

            <DatePicker
              mt="md"
              placeholder="Tanggal Lahir"
              label="Tanggal Lahir"
              withAsterisk
              {...form.getInputProps("dateOfBirth")}
            />
          </Paper>
          <Button type="submit" fullWidth mt="xl">
            Daftar
          </Button>
        </form>
      </Container>
    </>
  );
}
