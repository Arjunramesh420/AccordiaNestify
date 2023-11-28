import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';



export default function SubAccordian({subTitle,chips}) {
  return (
    
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id="panel-header">
        <Typography variant="subtitle1">{subTitle}</Typography>
      </AccordionSummary>
      <AccordionDetails>
      <Stack direction="row" spacing={1} display={'flex'} flexWrap={'wrap'}>
        {chips?.map((chip,index)=>(
            <Chip key={index} label={chip} style={{ margin: '5px' }} />
        ))}
    </Stack>
      </AccordionDetails>
    </Accordion>
    
  )
}