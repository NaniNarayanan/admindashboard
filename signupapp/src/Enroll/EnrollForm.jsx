import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid'
import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
// import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Select from '@material-ui/core/Select';
// import TextField from '@material-ui/core/TextField';
// import { FormLabel, makeStyles } from '@material-ui/core/';

const useStyle = makeStyles(theme =>({
    root:{
        '& .MuiFormControl-root':{
            width:'80%',
            margin: theme.spacing(1)
        }
    }
}))

const initialFValues = {

    id:'0',
    courseToEnroll:'',
    fullName:'',
    mobileNumber:'',
    emailId:'',
    city:'',
    gender:'male',
    paymentmethod:'',
    studentId:'',
    enrolldate: new Date(),
    isPermanent: false,
}

export default function EnrollForm() {

    // const [values, setValues] = useState(initialFValues);
    const classes = useStyle();

    // const handleInputChange = (event) =>{
    //     setValues(event.target.value)
    // }

    // const [value, setValue] = React.useState("");

    // const handleChange = (event) =>{
    //     setValue(event.target.value);
    // };

  return (
    <form className={classes.root} autoComplete="off">
        <Grid container>
            <Grid item xs={6}>
                
                <TextField variant="outlined" label="Course to Enroll" name='courseToEnroll' />
                <TextField variant="outlined" label="Full Name" name='fullName' />
                <TextField variant="outlined" label="Mobile  Number" name='mobileNumber' />
                <TextField variant="outlined" label="Email Id" name='emailId' />
                <TextField variant="outlined" label="City" name='city'/>
            </Grid>
            <Grid item xs={6}>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup row aria-aria-labelledby='demo-row-radio-buttons-group-label' name='row-radio-buttons-group'>
                        <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                        <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                        <FormControlLabel value="other" control={<Radio/>} label="Other"/>
                    </RadioGroup>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Payment Method</InputLabel>
                        <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard"
                            
                            
                            label="Payment Method"
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Cash</MenuItem>
                            <MenuItem value={20}>Card</MenuItem>
                            <MenuItem value={30}>Online Transfer</MenuItem>
                        </Select>
                </FormControl>
                <FormControl>
                <TextField variant="outlined" label="Student Id" name='studentId' />
                </FormControl>
            </Grid>
            <Button variant="contained">Enroll Student</Button>
        </Grid>
    </form>
  )
}
