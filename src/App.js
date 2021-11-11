import './App.css';
import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import CircularProgress from '@mui/material/CircularProgress';
function App() {
  const [spiroData, setSpiroData] = useState([]);
  function getData() {
    fetch("https://spirometry.herokuapp.com/getData", {
      method: "GET"
    })
      .then((data) => data.json())
      .then((subjects) => setSpiroData(subjects))
  }

  useEffect(() => {
    getData()
  }, []);
  const state1 = {
    labels: spiroData.sub1 ? spiroData.sub1.map((el, index) => (index * 0.002).toFixed(3)) : ""
    ,
    datasets: [
      {
        label: 'flow (litres/sec)',
        fill: false,
        pointRadius: 1,
        lineTension: 0.3,
        backgroundColor: '#e80805',
        data: spiroData.sub1 ? spiroData.sub1.map((datapoint) => datapoint) : ""
      }
    ]
  };
  const state2 = {
    labels: spiroData.sub1 ? spiroData.sub1.map((el, index) => (index * 0.002).toFixed(3)) : ""
    ,
    datasets: [
      {
        label: 'volume (litres)',
        fill: false,
        pointRadius: 1,
        lineTension: 0.3,
        backgroundColor: '#e80805',
        data: spiroData.sub1 ? spiroData.sub1.map((datapoint, index) =>
          spiroData.sub1.slice(0, index + 1).reduce((previousValue, currentValue) =>
            Number(previousValue) + Number(currentValue)))
          .map((flow) => (flow * 0.002).toFixed(3)) : ""
      }
    ]
  };
  const state3 = {
    labels: spiroData.sub2 ? spiroData.sub2.map((el, index) => (index * 0.002).toFixed(3)) : ""
    ,
    datasets: [
      {
        label: 'flow (litres/sec)',
        fill: false,
        pointRadius: 1,
        lineTension: 0.3,
        backgroundColor: '#e80805',
        data: spiroData.sub2 ? spiroData.sub2.map((datapoint) => datapoint) : ""
      }
    ]
  }
  const state4 = {
    labels: spiroData.sub2 ? spiroData.sub2.map((el, index) => (index * 0.002).toFixed(3)) : ""
    ,
    datasets: [
      {
        label: 'volume (litres)',
        fill: false,
        pointRadius: 1,
        lineTension: 0.3,
        backgroundColor: '#e80805',
        data: spiroData.sub2 ? spiroData.sub2.map((datapoint, index) =>
          spiroData.sub2.slice(0, index + 1).reduce((previousValue, currentValue) =>
            Number(previousValue) + Number(currentValue)))
          .map((flow) => (flow * 0.002).toFixed(3)) : ""
      }
    ]
  };
  const state5 = {
    labels: spiroData.sub3 ? spiroData.sub3.map((el, index) => (index * 0.002).toFixed(3)) : ""
    ,
    datasets: [
      {
        label: 'flow (litres/sec)',
        fill: false,
        pointRadius: 1,
        lineTension: 0.3,
        backgroundColor: '#e80805',
        data: spiroData.sub3 ? spiroData.sub3.map((datapoint) => datapoint) : ""
      }
    ]
  }
  const state6 = {
    labels: spiroData.sub3 ? spiroData.sub3.map((el, index) => (index * 0.002).toFixed(3)) : ""
    ,
    datasets: [
      {
        label: 'volume (litres)',
        fill: false,
        pointRadius: 1,
        lineTension: 0.3,
        backgroundColor: '#e80805',
        data: spiroData.sub3 ? spiroData.sub3.map((datapoint, index) =>
          spiroData.sub3.slice(0, index + 1).reduce((previousValue, currentValue) =>
            Number(previousValue) + Number(currentValue)))
          .map((flow) => (flow * 0.002).toFixed(3)) : ""
      }
    ]
  }
  const states = [state1, state2, state3, state4, state5, state6];
  return (
    <div className="App">
      <div className="container">Q. What parameters can be extracted from the graph?
        <ul><li><b>FEV1</b>—Forced expiratory volume in one second; the volume of air exhaled in the first second under
          force after amaximal inhalation.</li>
          <li><b>FVC</b>—Forced vital capacity; the total volume of air that can be exhaled during a maximal forced
            expiration effort</li>
          <li><b>FEV1/ FVC ratio</b>—The percentage of the FVC expired in one second.</li>
          <li><b>PEF</b> –Peak expiratory flow, the maximal flow during forced expiration.</li>
          <li><b>FEF<sub>25–75%</sub></b>—Forced expiratory flow over the middle one half of the FVC; the average flow
            from the point at which 25 percent of the FVC has been exhaled to the point at which 75 percent of the FVC has
            been exhaled.</li>
          <li><b>MVV</b>—Maximal voluntary ventilation = FEV1 x 35 or FEV1 x 40.
            This estimation of MVV is less accurate.</li></ul>
      </div>
      <div className="container">
        Q. Can you comment on any disorders subject might have? Is the information available enough to differentiate
        between obstructive and restrictive lung diseases?
        <ul><li>As per European respiratory society, lower limit for FEV/FVC = 0.63, lower limit for FVC = 1.25, lower
          limit for FEV = 0.98 in adult Caucasian males aged 66-69 years. For age group less than 66, these limits will
          be higher. For restrictive disorders, FEV/FVC ratio will be greater than or equal to 0.63 and FVC values will be
           less than lower limit. For obstructive disorder, FEV/FVC ratio will be less than 0.63 and FEV value will be
           less than lower limit. By comparing the lower limits with the obtained value from the graph,
          we can comment on the lung disease. The information available is not sufficient to predict the lung diseases as
          we need the details of the person height, age, gender because the values are different for different type of
          people.</li></ul>

      </div>
      <div className="container">
        Q. Using relevant measures comment on the status of the subjects respiratory system and display relevant plots.
        <ul><li>Given that frequency = 500Hz. Therefore, time period = 2ms.
          In one second there are 500 data points.</li></ul>
      </div>
      {states.map((state, index) => <>
        <div className="subject-number">subject {Math.ceil((index + 1) / 2)}</div>
        <div>
          {!spiroData.sub1 ? 
          <div className="loading">Please wait...<CircularProgress /></div>
        :<Line
        data={state}
        options={{
          scales: {
            x: {
              suggestedMax: 4,
              title: {
                display: true,
                text: 'time (seconds)',
                fontSize: 20,
                color: 'blue',
              },
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'left',
            }
          }
        }}
      />}
          {index === 0 ?
            <div className="container">
              Flow started at t = 0.116 seconds (from the above flow-time graph).</div> : ""}
          {index === 2 ?
            <div className="container">
              Flow started at t = 0.180 seconds (from the above flow-time graph).</div> : ""}
          {index === 4 ?
            <div className="container">
              Flow started at t = 0.184 seconds (from the above flow-time graph).</div> : ""}
          {index === 1 ?
            <div className="container"> From the volume- time graph shown above,
              <ul><li>  Total volume expired, <b>FVC = 4.35</b></li>
                <li>After 1 second from the start of flow i.e., at t = 1.116 seconds,  volume <b>FEV = 3.202</b>.</li>
                <li>Therefore FEV/FVC = 3.202/4.35 = 0.7361.So, for the subject1, <b>FEV/FVC % = 73.61%</b> which is less
                  than the normal value 83%.</li></ul>
              <div className="red">Interpretation: </div>
              <ul><li>If the subject is female aged less than 25 and height greater than 195cm, the person has
                <b> obstructive lung disease</b> as FEV/FVC ratio is less than the lower limit of 0.75.FEV and FVC values
                are also less than lower limit (lower limits of FVC = 4.39, FEV = 3.86)</li>
                <li>If the subject is adult male aged greater than 18, the person doesn’t have obstructive lung disease as
                  FEV/FVC ratio is greater than the lower limit of 0.71.So, the subject might have either restrictive lung
                  disease or normal.</li>
                <li>If the subject is adult Caucasian male aged greater than 58 years and height less than 190cm
                  (lower limits of FEV/ FVC = 0.64, FVC = 4.02, FEV = 3.07), or adult Caucasian male aged greater than
                  18 years and height less than 165cm (lower limit of FEV/ FVC ratio = 0.71, FVC = 3.51, FEV = 3.04),
                  FEV/ FVC ratio is greater than the lower limit.FEV and FVC values are also greater than lower limit.
                  So, the subject <b>doesn’t have either restrictive or obstructive lung disease</b>.</li>
                <li>If the subject is Caucasian male aged less than 25 years and height greater than 180cm, FEV/FVC ratio
                  is less than the lower limit of 0.71.but FVC value is less than the lower limit of 4.38.
                  So, the subject has <b>restrictive lung disease</b>.FEV is also less than lower limit of 3.69.</li></ul>
            </div> : ""}
          {index === 3 ?
            <div className="container"> From the volume- time graph shown above,
              <ul><li>  Total volume expired, <b>FVC = 4.271</b></li>
                <li>After 1 second from the start of flow i.e., at t = 1.180 seconds,  volume <b>FEV = 3.814</b>.</li>
                <li>Therefore FEV/FVC = 3.814/4.271 = 0.8930. So, for the subject2, <b>FEV/FVC % = 89.30%</b></li></ul>
              <div className="red">Interpretation: </div>
              <ul><li>The subject <b>doesn’t have obstructive lung disease</b> as FEV/FVC ratio is greater the lower limit for 
                all people. So, the subject may have either obstructive lung disease or normal.</li>
                <li>If the subject is adult Caucasian male aged greater than 62 years and height less than 195cm (lower limits
                   of FEV/ FVC = 0.64, FVC = 4.2, FEV = 3.17), or adult Caucasian male aged greater than 18 years and height less
                    than 175cm (lower limit of FEV/ FVC ratio = 0.71, FVC = 4.09, FEV = 3.47), FEV/ FVC ratio is greater than the 
                    lower limit. FEV and FVC values are also greater than lower limit. So, the subject <b>doesn’t have either
                     restrictive or obstructive lung disease</b>.</li>
                <li>If the subject is Caucasian male aged less than 25 years and height greater than 185cm, FEV/FVC ratio is less
                   than the lower limit of 0.71.but FVC value is less than the lower limit of 4.38. So, the subject has 
                   <b>restrictive lung disease.</b> FEV is normal.</li></ul>
            </div> : ""}
          {index === 5 ?
            <div className="container"> From the volume- time graph shown above,
              <ul><li>  Total volume expired, <b>FVC = 1.453</b></li>
                <li>After 1 second from the start of flow i.e., at t = 1.184 seconds,  volume <b>FEV = 0.942</b>.</li>
                <li>Therefore	FEV/FVC = 0.942/1.453 = 0.6483. So, for the subject3, <b>FEV/FVC % = 64.83%</b></li></ul>
              <div className="red">Interpretation: </div>
              <ul><li>If the subject is adult Caucasian male aged 66-69 years and height greater than 150cm, FEV/FVC ratio
                 is greater than the lower limit of 0.63. But the FEV and FVC values are less than lower limit. So, the subject
                  has <b>restrictive lung disease</b></li>
                <li>If the subject is adult Caucasian female aged 66-69 years and height greater than 150cm, FEV/ FVC ratio is 
                  less than the lower limit of 0.65. So, the subject has<b> obstructive lung disease</b>. </li>
                <li>If the subject is Caucasian aged less than 57 years and height greater than 150cm, FEV/FVC ratio is less 
                  than the lower limit of 0.65. So, the subject has <b>obstructive lung disease</b>. </li></ul>
            </div> : ""}
        </div></>
      )}

    </div>
  );
}

export default App;
