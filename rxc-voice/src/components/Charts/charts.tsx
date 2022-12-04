import React, { useContext, useEffect, useState } from "react";
import { ActionContext } from "../../hooks";
import { BgColor } from "../../models/BgColor";
import {Container, Row, Col, Button} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import {Chart, registerables} from "chart.js/auto"
import { Doughnut, Bar, Line } from "react-chartjs-2"
import { ArcElement, CategoryScale, LinearScale} from 'chart.js'
import Header from '../../components/Header';
import "./Charts.scss"
import { ResultData } from "../../models/ResultData";
import { Transfer } from "../..//models/Transfer";
import { Proposal } from "../../models/Proposal"; 
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { Process } from "../../models/Process";
import { TitleSharp } from "@material-ui/icons";
Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(...registerables)

function DoughnutChart(props: any){   
    type LocationState = { result: ResultData, name: String, transfer: Transfer[], startingBalance: number };
    const location = useLocation(); 
    const{ result } = location.state as LocationState; 
    const {name} = location.state as LocationState;
    const {transfer} = location.state as LocationState
    const {startingBalance} = location.state as LocationState
    const { setColor, setUserData } = useContext(ActionContext);
    const [btnOnewidth, setBtnOneWidth] = useState({width: 200, description:' '})
    const [btnTwowidth, setBtnTwoWidth] = useState({width: 200, description:' '})
    const [btnThreewidth, setBtnThreeWidth] = useState({width: 200, description:' '})
    const [btnOneText, setBtnOneText] = useState("Click here for more")
    const [btnTwoText, setBtnTwoText] = useState("Click here for more")
    const [btnThreeText, setBtnThreeText] = useState("Click here for more")
    const [list, setList] = useState(new Array<any>())

    const setText = (button) =>{
        let text;
        if(button === "btn-1")
        {
            text= "This Doughnut Chart represents the total number \n"
            text +="number of credits the delegates spent on each proposal.\n"
            text+= "Credits represent the tokens that were assigned at the creation of the event \n"
            text += "plus tokens received via transfer during the delegation stage."
            return text; 
        }   
        else if(button === "btn-2")
        {
            text="The Line graph the total amount of votes received by each proposal. \n"
            text+= "This chart easily displays how popular each proposals were after \n"
            text+= "the conclusion of an event."
            return text;
        }
        else if(button==="btn-3"){
            text="The stacked bar shows side by side the tokens spent on each proposal \n"
            text+= "as well as the votes received for each proposal. This can clearly shows \n"
            text+="the Quadratic Voting process. The total votes received by a proposal were computed by taking\n"
            text+="square root of the credits spent."
            return text
        }
    }
    const setButton = (name) =>
    {
        if(name === "btn-1")
        {
            if(btnOnewidth.description === ' ')
            {
                setBtnOneWidth({...btnOnewidth, width: btnOnewidth.width=120, description: btnOnewidth.description = setText("btn-1") })
                setBtnOneText("Collapse")
            }
            else{
                setBtnOneWidth({...btnOnewidth, width: btnOnewidth.width=200, description: btnOnewidth.description = ' ' })
                setBtnOneText("Click here for more")
            }
        }
        else if(name === "btn-2")
        {
            if(btnTwowidth.description === ' ')
            {
                setBtnTwoWidth({...btnTwowidth, width: btnTwowidth.width=120, description: btnTwowidth.description = setText("btn-2") })
                setBtnTwoText("Collapse")
            }
            else{
                setBtnTwoWidth({...btnTwowidth, width: btnTwowidth.width=200, description: btnTwowidth.description = ' ' })
                setBtnTwoText("Click here for more")
            }
        }
        else if(name === "btn-3")
        {
            if(btnThreewidth.description === ' ')
            {
                setBtnThreeWidth({...btnThreewidth, width: btnThreewidth.width=120, description: btnThreewidth.description = setText("btn-2") })
                setBtnThreeText("Collapse")
            }
            else{
                setBtnThreeWidth({...btnThreewidth, width: btnThreewidth.width=200, description: btnThreewidth.description = ' ' })
                setBtnThreeText("Click here for more")
            }
        }
    }
 
    useEffect(() => {
        setColor(BgColor.White)
    }, []);
   
    if(result === undefined || result.highestProposal === 0)
    {
        return(
            <div>
                <Header/>
            
        <h1> <br></br>Undefined</h1>
        </div>
        )
    }
    const get_rand_color = (size) =>
    {
        var color_arr : string[] = []
        var color_num = "0000FF"; 
       
        //var color_num = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
        //let i=0;
        while(color_arr.length < size)
        {
            if(color_num.length === 6) {
                let color = "#" + color_num;
                color_arr.push(color)
            }
           color_num =  Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
        }
        if(list.length===0)
        {
            setList(color_arr)
        }
        return color_arr;
    }
    
    const removeProposal = (arr, remove) =>{
        let length; 
        if(arr?.length === undefined)
        {
            length = 0;
        }
        else{
            length= arr?.length
        }
        for(let i = 0; i<length; i++)
        {
            if(arr?.[i] == remove)
            {
                arr?.splice(i, 1);
            }
        }
        return arr;
    }
    let transfer_data = {transfer_total: []}
    let resultData={ credit_received: [], votes_received: [], title: []}; 
    processData(result, resultData, transfer, transfer_data)
    console.log(startingBalance)
    console.log(transfer)
    function getMax(graph){
        
        if(graph==="line") 
        {
            if(result?.highestProposal!==undefined)
            {
                return result?.highestProposal + 5
            }
            else{
                result.highestProposal = undefined
                return result.highestProposal
            }
        }
        else if(graph==="bar"){
            if(result?.highestProposal!==undefined)
            {
                return result?.highestProposal * result?.highestProposal; 
            }
            else{
                result.highestProposal = undefined;
                return result.highestProposal;
            }
        }
    }
    
    resultData.title=removeProposal(resultData.title, "Ballot Ratification");
    resultData.credit_received=removeProposal(resultData.credit_received, 0);
    resultData.votes_received = removeProposal(resultData.votes_received, 0); 

    //var credits_transfered = 25;
    
    //var color_arr: string[] = []
    
    get_rand_color(resultData.votes_received?.length);
    

    console.log(transfer)
    const data={
        labels: resultData.title,
        datasets:[{
            data:resultData.credit_received,
            backgroundColor:list   
        },]
    };
    let line_max=getMax("line")
    const options= {
        scales: {
            y:{
                min:0, 
                max: line_max,
                stepSize: 10,
            },
            x:{

            }
        }
    }
    let bar_max=getMax("bar")
    const bar_options={
        scales: {
            y:{
                min:0, 
                max: bar_max,
                stepSize: 500,
            },
            x:{

            }
        }
    }
    const bar={
        labels: resultData.title,
        datasets:[{
            label:"Credits Received",
            backgroundColor: "Red",
            data: resultData.credit_received
        },
        {
            label: "Votes Received", 
            backgroundColor: "Blue",
            data: resultData.votes_received
        }    
    ]

    };

    const votesSpent={
        labels: resultData.title, 
        datasets:[{
            label:"Votes",
            data:resultData.votes_received,
            backgroundColor:list
        }],
        
    };
    
    return(
        <div className="Chart">
            
            <Header/>
         <Container>
            <Row>
                <h1 className="election"><b>Election Results</b></h1>
            </Row>
            <Row><h2 className="event">{name}</h2></Row>
            <Row>
                <Col>
                    <div style={{width:"370px"}} className= ".justify-content-center">
                        <h2 className="creditsSpent"></h2>
                            <Doughnut data={data} className=".justify-content-center"/>
                            <br></br>
                            <p className="text-center"><Button 
                                                            onClick={()=>setButton("btn-1")}
                                                            style={{
                                                            color: "white",
                                                            backgroundColor: "black",
                                                            fontFamily: "suisse_intlbook_italic",
                                                            width: btnOnewidth.width,
                                                            height: 40,
                                                            marginRight: 15,}}>{btnOneText}</Button></p>
                                                            <br></br>
                                                            <p className="text-center">{btnOnewidth.description}</p>
                    </div>
                </Col>
                                           
                <Col>
                    <div style={{width:"600px"}}>
                        <h2 className="votesSpent"></h2>
                        <br></br> <br></br>
                            <Line data={votesSpent} options={options}/>
                            <br></br>
                            <p className="text-center"><Button className="btn-2"
                                                            onClick={()=>setButton("btn-2")}
                                                            style={{
                                                            color: "white",
                                                            backgroundColor: "black",
                                                            fontFamily: "suisse_intlbook_italic",
                                                            width: btnTwowidth.width,
                                                            height: 40,
                                                            marginRight: 15,}}>{btnTwoText}</Button></p>
                                                            <br></br>
                                                            <p className="text-center">{btnTwowidth.description}</p>
                    </div>
                </Col>

            </Row>
            <Row >
                <Col>
                </Col>
                
            <Col>
                <Bar data={bar} options={bar_options} style = {{width:"600px"} }/>
                            <br></br>
                            <p className="text-center"><Button className="btn-3"
                                                            onClick={()=>setButton("btn-3")}
                                                            style={{
                                                            color: "white",
                                                            backgroundColor: "black",
                                                            fontFamily: "suisse_intlbook_italic",
                                                            width: btnThreewidth.width,
                                                            height: 40,
                                                            marginRight: 15,}}>{btnThreeText}</Button></p>
                                                            <br></br>
                                                            <p className="text-center">{btnThreewidth.description}</p>
            </Col>   
             <Col>
             </Col>   
                
            </Row>                                                    
        </Container>
                        
            
        </div>
    );
    }


    
    

    function processData(result, resultData, transfer,transferData){
        resultData.credit_received = result?.proposals?.map((proposal)=>{return (proposal.votes_received*proposal.votes_received)/1});
        resultData.votes_received = result?.proposals?.map((proposal)=>{return proposal.votes_received/1});
        resultData.title= result?.proposals?.map((proposal)=>{return proposal.title});
        transferData.transfer_data = transfer.map((transfers) => {return transfers.amount})
       
   }

export default DoughnutChart;



