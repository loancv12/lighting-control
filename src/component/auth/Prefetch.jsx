import React, { useEffect } from "react";
import { useStore } from "react-redux";
import { Outlet } from "react-router-dom";
import { configsApiSlice } from "../../redux/config/configApiSlice";
import { ppfdsApiSlice } from "../../redux/ppfd/ppfdApiSlice";
import { sub } from "date-fns";
import { dlisApiSlice } from "../../redux/dli/dliApiSlice";
import { getDateNow, getDateNowAnd15Ago } from "../../utils/formatDate";

const Prefetch = () => {
  const store = useStore();
  useEffect(() => {
    store.dispatch(
      configsApiSlice.util.prefetch("getConfig", undefined, {
        force: true,
      })
    );

    //TODO: when logout very quickly, it not return to Login page, but blank screen
    const selectDate = getDateNow();
    const selectDates = getDateNowAnd15Ago();
    store.dispatch(
      ppfdsApiSlice.util.prefetch("getPpfds", selectDate, {
        force: true,
      })
    );
    store.dispatch(
      dlisApiSlice.util.prefetch("getDlis", selectDates, {
        force: true,
      })
    );
  }, []);
  return <Outlet />;
};

export default Prefetch;
