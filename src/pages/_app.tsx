// scroll bar
import 'simplebar/src/simplebar.css';

import * as React from 'react';
import Head from 'next/head';
import {AppProps} from 'next/app';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import index from '../theme';
import createEmotionCache from '../theme/createEmotionCache';
import {NextPage} from "next";
import {ReactElement, ReactNode} from "react";
import {CollapseDrawerProvider} from '../contexts/CollapseDrawerContext';
import ProgressBar from '../components/ProgressBar';
import NotistackProvider from '../components/NotistackProvider';

const clientSideEmotionCache = createEmotionCache();


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Sistema Tecban</title>
        <meta name="viewport" content="initial-scale=1, width=device-width"/>
      </Head>
      <CollapseDrawerProvider>
        <ThemeProvider theme={index}>
          <NotistackProvider>
            <CssBaseline/>
            <ProgressBar/>
            {getLayout(<Component {...pageProps} />)}
          </NotistackProvider>
        </ThemeProvider>
      </CollapseDrawerProvider>
    </CacheProvider>
  );
}