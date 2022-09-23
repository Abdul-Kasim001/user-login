import { Grid } from "@mui/material";
import React, { Suspense } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "./Router";

function DefaultLayout() {
  return (
    <div>
      <Grid>
        <Sidebar />
      </Grid>
      <Grid>
        <div>
          <Suspense>
            <Routes>
              {routes.map((route, idx) => {
                return (
                  route.element && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      element={<route.element />}
                    />
                  )
                );
              })}
              {/* <Route path="/" element={<Navigate to={"/"} replace={true} />} /> */}
            </Routes>
          </Suspense>
        </div>
      </Grid>
    </div>
  );
}

export default DefaultLayout;
