import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
import Copyright from '../components/Copyright'

export default function DefaultLayout(props) {
  return (
    <Container maxWidth="lg" className={props.classes.container}>
      <Grid container spacing={3}>
        {props.children}
      </Grid>
      <Box pt={4}>
        <Copyright />
      </Box>
    </Container>
  )
}