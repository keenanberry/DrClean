import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import UploadForm from './UploadForm'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: "600px",
    justifyContent: 'center',
    alignContent: 'center',
    padding: 20,
    margin: 100,
    borderColor: theme.palette.primary.main,
  },
  head: {
    color: theme.palette.primary.main,
  },
}));

export default function UploadCard({ payload, setHasUploadedFile }) {

  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.head}><strong>Upload File</strong></Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Please upload your file.
          </Typography>
          <UploadForm 
            payload={payload}
            setHasUploadedFile={setHasUploadedFile}
          />
        </CardContent>
      </Card>
    </Grid>
  );
}