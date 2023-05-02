import { CssBaseline } from '@mui/material';
import { green } from '@mui/material/colors';
import type { AppProps } from 'next/app'
import { Fragment } from 'react'
import '@/styles/globals.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Head from 'next/head'


const theme = createTheme({
  palette: {
    primary: {
      main: green[900],
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (<Fragment>
    <Head>
      <title>WhatToCook</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  </Fragment>)
}

