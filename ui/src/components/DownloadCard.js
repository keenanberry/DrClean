import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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

  const [submitLoadingState, setSubmitLoadingState] = React.useState({
    text: 'Download',
    buttonColor: 'primary'
  })

  function handleDownload(event) {
    event.preventDefault();

    setSubmitLoadingState({
      text: 'Downloading...',
      buttonColor: 'default'
    })

    let payloadJson = JSON.stringify(payload);
    let filename = payload.filename
    let filenameText = filename.split('.')
    let newName = `${filenameText[0]}_completed.${filenameText[1]}`

    //let url = 'http://localhost:5000/api/download';
    let baseUrl = process.env.NODE_ENV === 'LOCAL' ? 'http://localhost:5000' : process.env.API_URI;
    let url = `${baseUrl}/api/download`;
    
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
        setSubmitLoadingState({
          text: 'Download',
          buttonColor: 'primary'
        })
        a.remove();
      })
      .catch((error) => {
        setSubmitLoadingState({
          text: 'Error!',
          buttonColor: 'secondary'
        })
        alert('Oops! Something went wrong.')
        console.error(error);
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
          <Button variant="contained" color={submitLoadingState.buttonColor} fullWidth={true} className={classes.button} onClick={handleDownload}>
            {submitLoadingState.text}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}