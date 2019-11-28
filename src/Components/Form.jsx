import React from 'react';
import './Form.css';

const countriesList = require ('../Resources/Countries');


export default class Form extends React.Component {
    initialState = {
        initialYear: (new Date()).getFullYear(),
        name: '',
        year: (new Date()).getFullYear(),
        month: 'January',
        day:'1',
        country: 'Afghanistan',
        dietary: 'Omnivore',
        motivation: '',
        attemptToSubmit: false,
        formSubmitted: false,
        missingField: false
    };

    state = {...this.initialState};


    handleUserFullNameInput = event => {
        this.setState({name: event.target.value, missingField:false})

        if (this.state.formSubmitted) {
            this.setState({formSubmitted: false})
        }
    }

    handleDOBYearInput = event => {
        this.setState({year: event.target.value})
        if (this.state.formSubmitted) {
            this.setState({formSubmitted: false})
        }
    }

    handleDOBMonthInput = event => {
        this.setState({month: event.target.value})
        if (this.state.formSubmitted) {
            this.setState({formSubmitted: false})
        }
    }

    handleDOBDayInput = event => {
        this.setState({day: event.target.value})
        if (this.state.formSubmitted) {
            this.setState({formSubmitted: false})
        }
    }

    handleCountryInput = event => {
        this.setState({country: event.target.value})
        if (this.state.formSubmitted) {
            this.setState({formSubmitted: false})
        }
    }

    handleDietInput = event => {
        this.setState({dietary: event.target.value})
        if (this.state.formSubmitted) {
            this.setState({formSubmitted: false})
        }
    }

    handleMotivationInput = event => {
        this.setState({motivation: event.target.value, missingField:false})
        if (this.state.formSubmitted) {
            this.setState({formSubmitted: false})
        }
    }

    handleSubmitForm = event => {
        event.preventDefault();
        if (this.state.name && this.state.motivation) {
            this.setState({attemptToSubmit: true})
        } else {
            this.setState({missingField: true})
        }
    }

    handleConfirmBtn = () => {
        this.setState(this.initialState)
        this.setState({formSubmitted: true})
    }

    handleEditFormBtn = () => {
        this.setState({attemptToSubmit: false})
    }

    // ####################### RENDER ##############################
    render() {
        const dobYear = (
            <select value={this.state.year} onChange={this.handleDOBYearInput}>
                {new Array(100).fill(this.state.initialYear).map((year, index) => {
                    return <option value={year-index} key={year-index}>{year-index}</option>
                })}
            </select>
        )

        const dobMonth = (
            <select value={this.state.month} onChange={this.handleDOBMonthInput} >
                <option value='January'>January</option>
                <option value='February'>February</option>
                <option value='March'>March</option>
                <option value='April'>April</option>
                <option value='May'>May</option>
                <option value='June'>June</option>
                <option value='July'>July</option>
                <option value='August'>August</option>
                <option value='September'>September</option>
                <option value='October'>October</option>
                <option value='November'>November</option>
                <option value='December'>December</option>
            </select>
        )

        const dobDay = (
            <select value={this.state.day} onChange={this.handleDOBDayInput}>
                {new Array(31).fill(1).map((day, index) => {
                    let dayNum;

                    switch (this.state.month) {
                      case 'April': case 'June': case 'September': case 'November':
                        dayNum = 30;
                      break;
                      case 'February':
                        // If month is February, calculate whether it is a leap year or not
                        const year = this.state.year
                        const isLeap = new Date(year, 1, 29).getMonth() === 1;
                        dayNum = isLeap ? 29 : 28;
                      break;
                      default:
                        dayNum = 31;
                    }
                    if (index < dayNum) {
                        let strDay = day+index+''
                        if (strDay.length === 1) {
                            strDay = `0${strDay}`
                        }
                        return <option value={strDay} key={strDay}>{strDay}</option>
                    } else {
                        return null
                    }
                })}
            </select>
        )

        const originCountry = (
            <select value={this.state.country} onChange={this.handleCountryInput}>
                {countriesList.map(country => <option value={country.name} key={country.code}>{country.name}</option>)}
            </select>
        )

        let confirmationRequest = null;
        if (this.state.attemptToSubmit) {
            confirmationRequest = (
                <div id='confirmationRequestDiv'>
                    <p>Full Name: {this.state.name}</p>
                    <p>Date of birth: {this.state.year}/{this.state.month}/{this.state.day}</p>
                    <p>Country of Origin: {this.state.country}</p>
                    <p>Dietary: {this.state.dietary}</p>
                    <p>Motivation to join the Mars Mission: {this.state.motivation}</p>
                    <h3>Are you sure all the information are correct?</h3>
                    <button id='confirmFormBtn' onClick={this.handleConfirmBtn}>Confirm</button>
                    <button id='editFormBtn' onClick={this.handleEditFormBtn}>Edit Form</button>
                </div>
            )
        }

        let submitConfirmationText = null;
        if (this.state.formSubmitted) {
            submitConfirmationText = <h3 id='submissionConfirmed'>Thank you for your application.</h3>
        }

        let errorMessage = null;
        if (this.state.missingField) {
            errorMessage = <h5 id='incompleteForm'>ALL FIELDS ARE REQUIRED</h5>
        }

        return (
            <>
                {submitConfirmationText}
                <form onSubmit={this.handleSubmitForm}>
                    <label>
                        What's your name?
                        <span>
                            <input type='text' value={this.state.name} onChange={this.handleUserFullNameInput} />
                        </span>
                    </label>
                    <br/>

                    <label>
                        What is your date of birth?
                        <span>
                            {dobYear}
                            {dobMonth}
                            {dobDay}
                        </span>
                    </label>
                    <br/>

                    <label>
                        What is your country of origin?
                        {originCountry}
                    </label>
                    <br/>

                    <label>
                        What is your dietary preference?
                        <select value={this.state.dietary} onChange={this.handleDietInput}>
                            <option value='Omnivore'>Omnivore</option>
                            <option value='Vegetarian'>Vegetarian</option>
                            <option value='Vegan'>Vegan</option>
                        </select>
                    </label>
                    <br/>

                    <label>
                        Why do you want to be a Mars explorer? 
                        <textarea id='motivationTextArea' value={this.state.motivation} onChange={this.handleMotivationInput} 
                                rows="10"></textarea>
                    </label>
                    <br/>
                    {errorMessage}
                    <button>Submit</button>
                    {/* <button onChange={this.handleSubmitButton}>Submit</button> */}
                </form>

                {confirmationRequest}
                {submitConfirmationText}
            </>
        )
    }
}