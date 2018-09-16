import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withRoot from '../withRoot';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing.unit * 20,
    },
  });

// type State = {
//   open: boolean;
  
// };
interface State {
  open: boolean;
  synonyms: string;
  inputWord: string;
}

class Index extends React.Component<WithStyles<typeof styles>, State> {
  // state = {
  //   open: false,
  // };

  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      synonyms: '',
      inputWord: ''
    };
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  public handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({inputWord: event.target.value});
  }

  public handleClick = () => {
    if (this.state.inputWord.length > 0) {
      this.upload(this.state.inputWord);
    }
    this.setState({
      open: true,
    });
  };

  public upload(word: string) {
      fetch('http://words.bighugelabs.com/api/2/7d826aeae1f4232309aa1b36361d9a2c/' + word + '/json') 
      .then((response: any) => {
        return response.json();
        
      }).then((results: any) => {
         this.setState({synonyms: results.noun.syn[0]});
      }).catch((error: Error) => {
        this.setState({synonyms: 'Try another word'});
      });
    }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Synonym</DialogTitle>
          <DialogContent>
            <DialogContentText>{this.state.synonyms}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={this.handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Typography variant="display1" gutterBottom>
          Thesaurus
        </Typography>
        <Typography variant="subheading" gutterBottom>
        <Input
          placeholder="Enter word here"
          onChange={this.handleTyping}
        />
        </Typography>
        <Button variant="raised" color="primary" onClick={this.handleClick}>
         Enter
        </Button>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
