

import {useState , useEffect} from 'react'
// https://www.carlrippon.com/drop-down-data-binding-with-react-hooks/

//https://canvasjs.com/react-charts/bar-chart/

import CanvasJSReact from '../canvasjs-3.2.11/canvasjs.react'
import { timeParse } from 'd3';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function ChartControlApplied() {
    const [values, setValues] = useState([]);
    const[filter, setFilter] = useState('Country')
    const[status, setStatus] = useState('Corona Retention Scheme')


    const [filters] = useState([
        {
            value: "Country"
        },
        {
            value: "Workforce Size"
        },
        {
            value: "Industry"
        }
    ])
    const [statuses] = useState([
        {
            value: "Corona Retention Scheme"
        },
        {
            value: "Not Trading"
        },
        {
            value: "Temporarily Not Trading"
        }
    ])


    useEffect(() => {
        fetch(`/api/trading?status=${status}&filter=${filter}`)
        .then(res => res.json())
        .then(data => {
            let tmp = []
            data.data.forEach(element => {
                let value = {label: element.label, y: parseFloat(element.y)}
                tmp.push(value)
            });
            setValues(tmp)
        })
    },[])
    
    useEffect(() => {
        fetch(`/api/trading?status=${status}&filter=${filter}`)
        .then(res => res.json())
        .then(data => {
            let tmp = []
            data.data.forEach(element => {
                let value = {label: element.label, y: parseFloat(element.y)}
                tmp.push(value)
            });
            setValues(tmp)
        })
    },[status,filter])


    
    const options = {
        title: {
            text: "%"
        },
        data: [
        {
            // Change type to "doughnut", "line", "splineArea", etc.
            type: "column",
            dataPoints: values
        }
        ]
    }

    return (
        <div style={{width: '100%'}}> 
            <h3>{status} by {filter}</h3>
            <CanvasJSReact.CanvasJSChart options = {options}/>
            <div className="container">
                <div className='row'>

                  <div className='col-sm'>
                    <h6>Please choose:</h6>
                    <select className="form-select"
                        onChange={ e => setFilter(e.currentTarget.value)}
                    >
                      {filters.map(f => (
                        <option
                          key={f.value}
                          value={f.value}
                        >
                          {f.value}
                        </option>
                      ))}
                    </select>

                  </div>
                  <div className='col-sm'>
                    <h6>Please choose:</h6>
                        <select className="form-select"
                            onChange={ e => setStatus(e.currentTarget.value)}
                        >
                          {statuses.map(f => (
                            <option
                              key={f.value}
                              value={f.value}
                            >
                              {f.value}
                            </option>
                          ))}
                        </select>

                  </div>
            </div>
            </div>
        </div>
    )
}
export default ChartControlApplied;