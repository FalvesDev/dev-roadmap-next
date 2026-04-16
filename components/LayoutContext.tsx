"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface LayoutCtx {
  leftOpen:    boolean;
  rightOpen:   boolean;
  toggleLeft:  () => void;
  toggleRight: () => void;
}

const Ctx = createContext<LayoutCtx>({
  leftOpen: true, rightOpen: false,
  toggleLeft: () => {}, toggleRight: () => {},
});

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [leftOpen,  setLeft]  = useState(true);
  const [rightOpen, setRight] = useState(false);

  useEffect(() => {
    try {
      const l = localStorage.getItem("layout_left_v1");
      const r = localStorage.getItem("layout_right_v1");
      if (l !== null) setLeft(l === "1");
      if (r !== null) setRight(r === "1");
    } catch { /* ignore */ }
  }, []);

  const toggleLeft = () => setLeft(v => {
    try { localStorage.setItem("layout_left_v1",  v ? "0" : "1"); } catch {}
    return !v;
  });
  const toggleRight = () => setRight(v => {
    try { localStorage.setItem("layout_right_v1", v ? "0" : "1"); } catch {}
    return !v;
  });

  return (
    <Ctx.Provider value={{ leftOpen, rightOpen, toggleLeft, toggleRight }}>
      {children}
    </Ctx.Provider>
  );
}

export const useLayout = () => useContext(Ctx);
