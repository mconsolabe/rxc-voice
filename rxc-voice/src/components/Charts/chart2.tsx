import React, { useContext, useEffect, useState } from "react";
import { ActionContext } from "../../hooks";
import { BgColor } from "../../models/BgColor";
import {Container, Row, Col} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import Chart from "chart.js/auto"
import { Doughnut, Bar } from "react-chartjs-2"
import { ArcElement, CategoryScale, LinearScale} from 'chart.js'
import Header from '../Header';
import "./Charts.scss"
Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
const data={
    labels: ["New York", "Chicago", "Los Angeles", "Atlanta"],
    datasets:[{
        data:[2,6,10,15], 
        backgroundColor:[
            "Red", "Blue", "Yellow", "Green"
        ]
    }
]
};

const votesSpent={
    labels:["Person1", "Person2", "Person3", "Person4"], 
    datasets:[{
        data:[30,20,25,28],
        backgroundColor:[
            "Red", "Blue", "Yellow", "Green"
        ]
    }]
};
function BarChart(){
    const { setColor, setUserData } = useContext(ActionContext);
    useEffect(() => {
        setColor(BgColor.White)
    }, []);
    return(
        <div className="Chart">
            <Header/>
         <Container>
            <Row>
                <h1>Election Results</h1>
                <Col>
                    <div style={{width:"300px"}}>
                        <h2>Best City</h2>
                            <Doughnut data={data}/>
                            
                    </div>
                </Col>
                <Col>
                    <div style={{width:"500px"}}>
                        <h2>Tokens Spent</h2>
                            <Bar data={votesSpent}/>
                    </div>
                </Col>
                
            </Row>
        </Container>
                        
            
        </div>
    );
}

export default BarChart;