'use client';
import "@/styles/globals.css";
import type { AppProps } from "next/app";


import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

// Global components
import Navbar from "@/components/general/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CacheProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </CacheProvider>
    </ChakraProvider>
  );
}