import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Buttons from './Buttons'
import TextFields from './TextFields'

const useStyles = makeStyles({
    card: {
      maxWidth: 275,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

export default class Upload extends React.Component {
  
    render() {
      //const { classes } = this.props;
  
      return (
      <Card className={useStyles.card}>
          <CardHeader title="Upload" color="primary"/>
            <CardContent>
                <Typography className={useStyles.title} color="textSecondary" gutterBottom>
                    Please upload your file
                </Typography>
            </CardContent>
            <CardActions>
                <div className="container">
                    <div className="row">
                        <Buttons text="Upload" />
                    </div>
                    <div className="row">
                        <TextFields />
                    </div>
                </div>
            </CardActions>
        </Card>
      );
    }
}
