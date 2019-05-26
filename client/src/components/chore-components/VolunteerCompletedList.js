import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { filter, cloneDeep, map } from 'lodash';
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import Typography from '../../pages/modules/components/Typography';
import Card from '@material-ui/core/Card'
import theme from '../../pages/modules/theme';
import { ThemeProvider } from '@material-ui/styles';

const Chore = props => (
    <ThemeProvider theme={theme}>
        <Container component="section">
            <Grid container spacing={4}>    
                <Grid item spacing={8}>
                    <Card >
                        <Grid  container spacing={4} padding={5}>
                            <Grid item xs={12} md={6}>
                                <Hidden smDown>
                                    <img 
                                        src="https://cdn3.eyeem.com/thumb/eaf5a605b848ab17473a73d38687f48d9790e578-1512310445786/w/850"
                                        alt="call to action"   
                                    />
                                </Hidden>
                            </Grid> 
                            <Grid  spacing={4} item xs={12} md={6}>
                                
                                    <Typography padding="theme.spacing(4)" variant="h3" component="h2" gutterBottom>
                                        {props.chore.chore_description}
                                    </Typography>
                                    <Typography variant="h5" component="h3" gutterBottom>
                                        Who Needs Help: {props.chore.chore_responsible}
                                    </Typography>
                                    <Typography variant="h5" gutterBottom>
                                        Chore Address: {props.chore.chore_address[0].formattedAddress}
                                    </Typography>
                                    <Typography variant="h5" gutterBottom>
                                        Phone Number: {props.chore.chore_phone}
                                    </Typography>
                                
                            </Grid>
                                 
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Container>     
    </ThemeProvider>
)

export default class VolunteerCompletedList extends Component {

    constructor(props) {
        super(props);
        this.state = {chores: []};
        this.onAccept = this.onAccept.bind(this);
        this.onCompleted = this.onCompleted.bind(this);
    }

    componentDidMount() {
        axios.get('/chore')
            .then(response => {
                this.setState({chores: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('/chore')
        .then(response => {
            this.setState({chores: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })   
    }

    choreList() {
        return this.state.chores.map(function(currentChore, i) {
            // console.log(currentChore);
            return <Chore chore={currentChore} key={i} />;
        });
    }

    

    completedList() {
        const filteredListCompleted = this.getList(true, true);
        return filteredListCompleted.map(function(currentChore, i) {
            return <Chore chore={currentChore} key={i} />;
        });
    }

    getList (accepted, completed) {
        // console.log(this.state.chores);
        return filter(this.state.chores, currentChore => currentChore.chore_accepted === accepted && currentChore.chore_completed === completed)
    }

    onAccept(newChore) {
        // e.preventDefault()
        newChore.chore_accepted = true;
        let newChores = cloneDeep(this.state.chores);
        newChores = map(newChores, chore => {
            if(chore._id === newChore._id) {
                chore = newChore;
            }
            return chore;
        });
        axios.post('/chore/update/' + newChore._id, newChore)
            .then(res => this.setState({chores: newChores}))
        console.log(`Chore Accepted`);
    }

    onCompleted(newChore) {
        // e.preventDefault()
        newChore.chore_completed = true;
        let newChoresCompleted = cloneDeep(this.state.chores);
        newChoresCompleted = map(newChoresCompleted, chore => {
            if(chore._id === newChore._id) {
                chore = newChore;
            }
            return chore;
        });
        axios.post('/chore/update/' + newChore._id, newChore)
            .then(res => this.setState({chores: newChoresCompleted}))
        console.log(`Chore Completed`);
    }


    render() {
        return (
            <div>
                <h3>Completed Chores</h3>
                
                        { this.completedList() }
                   

            </div>

            
        )
    }
}