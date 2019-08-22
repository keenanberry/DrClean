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
    maxWidth: "400px",
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

export default function DownloadCard( { payload } ) {
  const classes = useStyles();

  const [loadingState, setLoadingState] = React.useState(false);

  function handleDownload(event) {
    setLoadingState(true);

    let payloadJson = JSON.stringify(payload);
    let filename = payload.filename
    let filenameText = filename.split('.')
    let newName = `${filenameText[0]}_completed.${filenameText[1]}`

    console.log(JSON.stringify(payload, false, 2));
    console.log(newName); 

    let url = 'http://localhost:5000/api/download';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: payloadJson
    })
      .then(response => response.blob())
      .then(blob => {
        let bloburl = window.URL.createObjectURL(blob);
        let a = document.createElement('a'); 
        a.href = bloburl;
        a.download = newName;
        document.body.appendChild(a);
        a.click();
        setLoadingState(false);
        a.remove();
      });
  }


  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBttom variant="h5" component="h2" className={classes.head}><strong>Download File</strong></Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Success! The new labels have been added to your original file. Please click download to write and save your file.
          </Typography>
          <Button variant="contained" color="primary" fullWidth={true} className={classes.button} onClick={handleDownload}>
            {loadingState ? <div>Downloading...</div> : <div>Download</div>}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}