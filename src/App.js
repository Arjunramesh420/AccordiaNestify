import MainAccordian from './MainAccordian';
import { Grid } from '@mui/material';
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect } from 'react';

function App(title,subTitle,chips) {

  // functions for fetching industries, domains , skillsets
  // State for industries
  const [industries, setIndustries] = useState([]);
    
  useEffect(() => {
    // Fetch industries data from the backend API
    axios.get('https://app.gigleji.com/api/industry/')
      .then((response) => {
        let temp = response?.data?.result?.data
        console.log("res",temp);
        setIndustries(temp);
      })
      .catch(error => {
        console.error('Error fetching industries data:', error);
      });
  }, [title]);
  
  // State for domains
  const [domains, setDomains] = useState([]);
  
  useEffect(() => {
    // Fetch domains data for the specific industry from the backend API
    axios.get(`https://app.gigleji.com/api/domain/`)
      .then((response) => {
        let temp = response?.data?.result?.data
        console.log("resdom",temp)
        setDomains(temp);
      })
      .catch(error => {
        console.error('Error fetching domains data:', error);
      });
  }, [subTitle]); // <-- Using 'subTitle' as a dependency
  
  const [visibleMainAccordions, setVisibleMainAccordions] = useState(7); // Initial number of visible accordions
  
    const showMainAccordions = () => {
      setVisibleMainAccordions((prevVisibleMainAccordions) => prevVisibleMainAccordions + 7);
    };
  
    const showLessMainAccordions = () => {
      setVisibleMainAccordions((prevVisibleMainAccordions) => prevVisibleMainAccordions - 7);
    };


{/* Industry domain skills */}
<div className="container-fluid" style={{  background: 'hsla(0, 0%, 0%, 0.852)' }}>
  <Grid className="container" style={{ width: '100%' }}>
    <h1 className="text-center text-white pt-4 underln" style={{ fontSize: '40px' }}>
      Industries - Domain - Skills
      {/* <span style={{ content: '', position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', borderBottom: '3px solid brown', width: '75%' }}></span> */}
    </h1>

    {industries.slice(0, visibleMainAccordions).map((industry, index) => {
            // Filter domains belonging to the current industry
            const industryDomains = domains.filter((domain) => domain.Industry === industry.Industry);
    
      return (
        <div key={index} style={{ width: '100%', marginBottom: '15px' }}>
          <MainAccordian
          title={industry.Industry}
            subAccordian={industryDomains.map((domain) => ({
              subTitle: domain.Domain,
              chips: domain.skillSet,
            }))}>
          </MainAccordian>  
        </div>
  
      );
    })}
      <div>
       {console.log("count",visibleMainAccordions)}
   {visibleMainAccordions  <= industries.length ? (
<button type="button" class="btn btn-danger"  onClick={showMainAccordions}>See More</button>):
(<button type="button" class="btn btn-danger" onClick={showLessMainAccordions}>See less</button>)}
     </div> 
  </Grid> 
  </div>    


}

   

export default App;