import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Chip, Box } from '@mui/material';
 
export default function IndusDomSkillList({title,subTitles,chipDatas}) {
  return (
    <>
<Box component="center">
<Accordion sx={{m:2, borderRadius:5,width:'100%', backgroundColor:"#638fb8"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {subTitles?.map((subTitle,index)=>(
            <Box>
            <Accordion
            key={index}
            sx={{m:2, borderRadius:5 , backgroundColor:"#a4caed"}}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 2}-content`}
                id={`panel${index + 2}-header`}
              >
                <Typography>{subTitle}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {chipDatas[index]?.map((chipData,chipIndex)=>(
                    <Chip key={chipIndex} label={chipData} sx={{m:2}}/>
                ))}
              </AccordionDetails>
            </Accordion>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
      </Box>
   
    </>
  )
}