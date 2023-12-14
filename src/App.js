import React from 'react'
import IndusDomSkillList from './IndusDomSkillList.js'
import { useState , useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [industryData, setIndustryData] = useState();
useEffect(()=>{
    axios.get(`https://app.gigleji.com/api/industry/`)
    .then((response)=>{
      let temp = response?.data?.result?.data;
      // console.log("indresponse",temp);
      setIndustryData(temp)
    })
    .catch(error=>{
      console.error('Some Error occured during fetching the data',error)
    });
  },[])
 
  const [domSkillData, setDomSkillData] = useState();
  useEffect(()=>{
    axios.get(`https://app.gigleji.com/api/domain/`)
    .then((response)=>{
      let temp = response?.data?.result?.data;
      // console.log("domskresponse",temp);
      setDomSkillData(temp)
    })
    .catch(error=>{
      console.error('Some Error occured during fetching the data',error)
    });
  },[])

//Accordian function (showmore/showless button)
// const initialAccordionsToShow = 7;
const defaultAccordionsToShow = 7;
  const [accordionsToShow, setAccordionsToShow] = useState(defaultAccordionsToShow);
  
  const loadMoreAccordions = () => {
    setAccordionsToShow(accordionsToShow + 7);
  };

  const showLessAccordions = () => {
    setAccordionsToShow(Math.max(accordionsToShow - 7, defaultAccordionsToShow));
  };

  return (
    <div>
      {/* Industry domain skills */}

<div>
      <h1 className="text-center text-black pt-4 underln" style={{ fontSize: '40px', position: 'relative', marginBottom: '10px' }}>Industry-Domain-Skills</h1>

      {industryData?.slice(0, accordionsToShow).map((industry, index) => {
        const domainDataAccordingToIndustry = domSkillData
          ?.filter((domain) => domain.Industry === industry.Industry);

        return (
          <IndusDomSkillList
            key={index}
            title={industry.Industry}
            subTitles={domainDataAccordingToIndustry?.map(item => item.Domain) || []}
            chipDatas={domainDataAccordingToIndustry?.map(item => item.skillSet) || []}
          />
        );
      })}
{industryData && industryData.length > defaultAccordionsToShow && (
  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
    <button 
    onClick={loadMoreAccordions}
    style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}
    >
      Load More
    </button>
    {accordionsToShow > defaultAccordionsToShow && (
      <button 
      onClick={showLessAccordions}
      style={{ backgroundColor: 'blue', color: 'white' }}
      >
        Show Less
      </button>
    )}
  </div>
)}
    </div>
    </div>
  )
}

export default App
