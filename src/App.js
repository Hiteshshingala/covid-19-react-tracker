import React from 'react';
import * as Icon from 'react-feather';

import { Cards, CountryPicker, Chart } from './components';
import { fetchData } from './api/';
import styles from './App.module.css';
import FilterDramaIcon from '@material-ui/icons/FilterDrama';
import {Typography} from '@material-ui/core'
import image from './images/image.png';
import {BigEclipse,MidEclipse} from './components/Svg/SvgImages';
class App extends React.Component {
  state = {
    data: {},
    country: '',
  }

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
        <img className={styles.image} src={image} alt="COVID-19" /> 
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
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
          href="https://github.com/Vbmavani/Covid19-react"
          className={styles.github} 
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon.GitHub className={styles.icon}/>
          <span>Open Sourced on GitHub</span>
        </a>
        <a
          className={styles.api}
          href="https://covid19.mathdro.id/api"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FilterDramaIcon className={styles.icon}/>
          <span>Used Api&nbsp;</span>
          
        </a>
        <Typography>Developed By</Typography>
        <h3 className={styles.DevName}>VAIBHAV MAVANI</h3>
      </footer>
      </div>
    );
  }
}

export default App;