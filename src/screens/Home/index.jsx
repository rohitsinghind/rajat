import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  Container,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Paper,
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";

export default function Home() {
  const [data, setdata] = useState("");
  const [items, setItems] = useState([]);

  const fetchData = async (e) => {
    axios
      .get(
        "https://apiqav3.fleksa.com/v1/api/mf/menu/shop/ffc65c89-2112-4b8a-93dc-f64a8e01dcca"
      )
      .then((res) => {
        setdata(res.data?.data);
        setItems(Object.values(res.data?.data?.menu_sections));
      });
  };

  //   console.log(Object.entries(data?.menu_sections));

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Typography variant="h5" textAlign={"center"}>
          {data?.name}
        </Typography>
        <Box>
          <Grid container spacing={2}>
            {items?.filter((x)=>{if(x?.is_active) return x}).map((e) => {
              return (
                <Grid xs={3} key={e?.id}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      sx={{ height: 140 }}
                      image={e?.image_url}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {e?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {e?.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
