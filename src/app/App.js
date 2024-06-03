"use client";
import { ThemeContext } from "./(components)/ThemeProvider";
import { useContext } from "react";

export function App({ children, inter }) {
    const { theme } = useContext(ThemeContext);
    return <body theme={theme} className={inter.className}>{children}</body>;
};