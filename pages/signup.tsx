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
import Footer from "./components/Footer";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";

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
  return (
    <>
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

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Nama Lengkap" placeholder="Nama Lengkap" required />
          <TextInput
            label="Nomor Telepon"
            mt="md"
            placeholder="Nomor Telepon"
            required
          />
          <TextInput
            label="Email"
            mt="md"
            placeholder="you@mantine.dev"
            required
          />

          <TooltipFocus label="Password" placeholder="Your password" />
          <TextInput
            label="Retype Password"
            placeholder="Retype Password"
            mt="md"
            required
          />

          <DatePicker
            mt="md"
            placeholder="Tanggal Lahir"
            label="Tanggal Lahir"
            withAsterisk
          />

          <Button fullWidth mt="xl">
            Daftar
          </Button>
        </Paper>
      </Container>
    </>
  );
}
