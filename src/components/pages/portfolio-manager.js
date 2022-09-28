import React, {Component} from "react";
import axios from "axios";
import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component{
    constructor(){
        super();
        this.state ={
            portfolioItems: []
        }
        this.handleSuccsessfulFormSubmission = this.handleSuccsessfulFormSubmission.bind(this);
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }
    handleDeleteClick(portfolioItem){
        console.log("handleDeleteClick", portfolioItem);
    }

    handleSuccsessfulFormSubmission(portfolioItem){
        this.setState({
            portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
        })
    }

    handleFormSubmissionError(error){
        console.log("handleFormSubmissionError error", error);
    }
    getPortfolioItems(){
        axios.get("https://karl.devcamp.space/portfolio/portfolio_items",
         {withCredentials: true
        }).then(response => {
            this.setState({
                portfolioItems: [...response.data.portfolio_items]
            })
        }).catch(error=>{
            console.log("error in getPortfolioItems", error);
        })
    }
    componentDidMount(){
        this.getPortfolioItems();
    }
    render(){
        return(
            <div className="portfolio-manager-wrapper">
                <div className="left-column">
                    <PortfolioForm
                        handleSuccsessfulFormSubmission={this.handleSuccsessfulFormSubmission}
                        handleFormSubmissionError={this.handleFormSubmissionError}
                    />
                </div>
                <div className="right-column">
                    <PortfolioSidebarList 
                        handleDeleteClick={this.handleDeleteClick}
                        data={this.state.portfolioItems}
                    /> 
                </div>
            </div>
        )
    }
}