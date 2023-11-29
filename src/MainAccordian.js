import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SubAccordion from './SubAccordian';

import axios from 'axios';

export default function MainAccordion({ title, subAccordion }) {
  const mainAccordionStyles = {
    backgroundColor: 'gray',
  };

  const titleStyles = {
    color: 'white',
    fontWeight: 'bold',
  };

  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    // Fetch industry data from the backend API
    axios.get('https://app.gigleji.com/api/industry/')
      .then(response => {
        setIndustries(response.data);
      })
      .catch(error => {
        console.error('Error fetching industry data:', error);
      });
  }, []);

  return (
    <div>
      {industries.map((industry, index) => (
        <Accordion key={index} style={mainAccordionStyles} square={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id="panel-header">
            <Typography variant="h6" style={titleStyles}>
              {industry.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {industry.domains?.map((domain, domainIndex) => (
              <SubAccordion key={domainIndex} subTitle={domain.Domain} chips={domain.skillset} />
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
