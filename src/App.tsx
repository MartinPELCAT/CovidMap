import React, { FunctionComponent, useEffect, useState } from "react";
import { Map } from "./components/Map";
import { Grid, Box, Typography } from "@material-ui/core";
import "./app.css";
import { ResponseSummary, Global, Countries, Country } from "./types/responses";

export const App: FunctionComponent = () => {
  const [countries, setCountries] = useState<Countries | null>(null);
  const [country, setCountry] = useState<Country | null | undefined>(null);
  const [summary, setSummary] = useState<Global | null>(null);

  const handleCountryClick = (id: string) => {
    let ctry = countries?.find((el) => el.CountryCode === id);
    setCountry(ctry);
  };

  useEffect(() => {
    fetch("https://api.covid19api.com/summary")
      .then((data) => data.json())
      .then((response: ResponseSummary) => {
        setSummary(response.Global);
        setCountries(response.Countries);
      });
  }, []);

  return (
    <Box width="100%" height="100vh">
      <Grid container style={{ height: "100vh" }}>
        <Grid item container md={4}>
          <Grid item md={12}>
            <Box bgcolor="orange" width="100%" height="100%">
              <Typography>{summary && JSON.stringify(summary)}</Typography>
            </Box>
          </Grid>
          <Grid item md={12}>
            <Box bgcolor="pink" width="100%" height="100%">
              <Typography>{country && JSON.stringify(country)}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item md={8} style={{ marginTop: "auto", marginBottom: "auto" }}>
          <Map onCountryClick={handleCountryClick} />
        </Grid>
      </Grid>
    </Box>
  );
};
