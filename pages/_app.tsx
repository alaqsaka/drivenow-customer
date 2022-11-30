import { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import Layout from "./components/layout";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <Head>
        <title>Page title</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
