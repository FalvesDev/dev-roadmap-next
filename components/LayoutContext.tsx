"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface LayoutCtx {
  leftOpen:    boolean;
  rightOpen:   boolean;
  toggleLeft:  () => void;
  toggleRight: () => void;
}

const Ctx = createContext<LayoutCtx>({
  leftOpen: true, rightOpen: true,
  toggleLeft: () => {}, toggleRight: () => {},
});

/** Writes --lsw / --rsw CSS vars on <html> so fixed elements can use them without JS state */
function syncVars(l: boolean, r: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty("--lsw", l ? "256px" : "0px");
  document.documentElement.style.setProperty("--rsw", r ? "256px" : "0px");
}

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [leftOpen,  setLeft]  = useState(true);
  const [rightOpen, setRight] = useState(true);

  useEffect(() => {
    try {
      const l = localStorage.getItem("layout_left_v1");
      const r = localStorage.getItem("layout_right_v1");
      const lv = l !== null ? l === "1" : true;
      const rv = r !== null ? r === "1" : true;
      if (l !== null) setLeft(lv);
      if (r !== null) setRight(rv);
      syncVars(lv, rv);
    } catch { syncVars(true, true); }
  }, []);

  const toggleLeft = () => setLeft(v => {
    const next = !v;
    try { localStorage.setItem("layout_left_v1", next ? "1" : "0"); } catch {}
    syncVars(next, rightOpen);
    return next;
  });

  const toggleRight = () => setRight(v => {
    const next = !v;
    try { localStorage.setItem("layout_right_v1", next ? "1" : "0"); } catch {}
    syncVars(leftOpen, next);
    return next;
  });

  return (
    <Ctx.Provider value={{ leftOpen, rightOpen, toggleLeft, toggleRight }}>
      {children}
    </Ctx.Provider>
  );
}

export const useLayout = () => useContext(Ctx);
