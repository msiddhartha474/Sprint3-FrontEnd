import { Button } from 'bootstrap';
import React, { Component } from 'react'
import Question from '../components/Question'


class ViewQuestion extends Component{
    constructor(props){
        super(props);

        this.state = {

            qid : 0,
            question : '',
            option1 : '',
            option2 : '',
            option3 : '',
            option4 : '',
            

        };
    }

    componentWillMount(){
        const props = this.props;
        console.log(props);
        debugger;
        if(props.location && props.location.state){
            const question = props.location.state.question;

            this.setState({
                qid : question.qid,
                question : question.question,
                option1 : question.option1,
                option2 : question.option2,
                option3 : question.option3,
                option4 : question.option4,
               
            })
           
        }

        
    }





    render(){
        
        if(this.props.isLoading){
            return(
                <p>Loading....</p>
            )
        }
        else if(this.props.error){
            return(
                <div className = "alert alert-danger" role = "alert">]
                    {this.props.error.message}
                </div>
            )
        }
        else{
            return(
                <div >
                    
                    <div>
                        <p><b>Question ID:</b> &nbsp; {this.state.qid}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <b>Question:</b> &nbsp; {this.state.question}
                        &nbsp;&nbsp;&nbsp;&nbsp;<br/>
                        <b>option1: </b> {this.state.option1}
                        &nbsp;&nbsp;&nbsp;&nbsp;<br/>
                        <b>option2:</b>  {this.state.option2}
                        &nbsp;&nbsp;&nbsp;&nbsp;<br/>
                        <b>option3:</b>  {this.state.option3}
                        &nbsp;&nbsp;&nbsp;&nbsp;<br/>
                        <b>option4:</b>  {this.state.option4}</p> 
                    </div>
                    
                </div>
            )
        }
    }
}

export default ViewQuestion;