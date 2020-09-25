import React from 'react';
import * as Icon from 'react-feather';

import { Cards, CountryPicker, Chart } from './components';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { fetchData } from './api/';
import styles from './App.module.css';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FilterDramaIcon from '@material-ui/icons/FilterDrama';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import {Typography} from '@material-ui/core'
import image from './images/image.png';
import Box from '@material-ui/core/Box';
import {BigEclipse,MidEclipse} from './components/Svg/SvgImages';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


class App extends React.Component {
  

  constructor(props){
    super(props)
    this.state = {
      data: {},
      country: '',
      date: '',
      step: 1
    }
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange (event, newValue) {
    this.setState({...this.state, step: newValue})
  };


  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
  }

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image}  src={image} alt="COVID-19" /> 
        <Cards data={data} />
        <Paper square>
        <Tabs value={this.state.step} onChange={this.handleChange} aria-label="simple tabs example">
          <Tab label="Item One" style={{Width: '100%'}} id="simple-tab-0" aria-controls="simple-tabpanel-0" />
          <Tab label="Item Two" id="simple-tab-1" aria-controls="simple-tabpanel-1"/> 
        </Tabs>
      </Paper>
      <TabPanel value={this.state.step} index={0}>
      <CountryPicker handleCountryChange={this.handleCountryChange} />
      </TabPanel>
      <TabPanel value={this.state.step} index={1}>
      <TextField
    id="date"
    label="Birthday"
    type="date"
    defaultValue="2017-05-24"
    InputLabelProps={{
      shrink: true,
    }}
  />
      </TabPanel>
       
        <Chart data={data} country={country} /> 
         <div className={styles.big_circle}>
          <BigEclipse />
        </div>
        
        <div className={styles.medium_circle}>
          <MidEclipse /> 
        </div>
        {/*<div className={styles.small_circle}>
          <SmallEclipse />
        </div> */}
         <footer className={styles.footer} style={{animationDelay: '2s'}}>
        {/* <img
          src="/icon.png"
          alt="https://www.covid19india.org | Coronavirus cases live dashboard"
        />*/}

        <h3 className={styles.h3}>We stand with everyone fighting on the frontlines</h3>
     
        <a
          className={styles.devDetails}
          href="https://vaibhav-mavani.surge.sh"
          target="_blank"
          rel="noopener noreferrer"
        >
          <PersonOutlineOutlinedIcon className={styles.icon}/>
          <span>About Developer&nbsp;</span>
          
        </a>
        <Typography>Developed By</Typography>
        <h3 className={styles.DevName}>Hitesh Shingala</h3>
      </footer>
      </div>
    );
  }
}

export default App;