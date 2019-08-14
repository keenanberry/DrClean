import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: "800px",
    //textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 20,
    margin: 100,
    outlineColor: theme.palette.primary.main,
  },
  head: {
    color: theme.palette.primary.main,
  },
  button: {
    margin: theme.spacing('1'),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function UploadCard() {
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
          <Typography gutterBttom variant="h5" component="h2" className={classes.head}><strong>Download</strong></Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Success! Your file has been written. 
          </Typography>
          <p>filename_QCed.xlsx</p>
          <Button variant="contained" color="primary" fullWidth={true} className={classes.button}>
            <ArrowDownwardIcon className={classes.leftIcon} />
              &nbsp; Download
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}