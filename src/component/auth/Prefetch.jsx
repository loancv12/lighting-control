import React, { useEffect } from "react";
import { useStore } from "react-redux";
import { Outlet } from "react-router-dom";
import { configsApiSlice } from "../../redux/config/configApiSlice";
import { ppfdsApiSlice } from "../../redux/ppfd/ppfdApiSlice";

const Prefetch = () => {
  const store = useStore();
  useEffect(() => {
    store.dispatch(
      configsApiSlice.util.prefetch("getConfig", undefined, {
        force: true,
      })
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectDate = today.toISOString();
    store.dispatch(
      ppfdsApiSlice.util.prefetch("getPpfds", selectDate, {
        force: true,
      })
    );
  }, []);
  return <Outlet />;
};

export default Prefetch;
