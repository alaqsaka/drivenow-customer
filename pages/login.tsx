import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import Head from "next/head";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1485321586038-4cc99992a06f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
    backgroundPosition: "",
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: "100vh",
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function Login() {
  const { classes } = useStyles();
  return (
    <>
      <Head>
        <title>DriveNow | Masuk</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title
            order={2}
            className={classes.title}
            align="center"
            mt="md"
            mb={50}
          >
            Selamat datang di DriveNow
          </Title>

          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
          />
          <NextLink href={`/dashboard`} style={{ textDecoration: "none" }}>
            <Button fullWidth mt="xl" size="md">
              Masuk
            </Button>
          </NextLink>

          <Text align="center" mt="md">
            Belum punya akun?{" "}
            <Anchor<"a"> href="/signup" weight={700}>
              Daftar
            </Anchor>
          </Text>
        </Paper>
      </div>
    </>
  );
}
