import {Component} from 'react'
import Cookies from 'js-cookie'
import McqGenerator from '../McqGenerator'
import './index.css'

const questionsData = [
  {
    id: 1,
    question: '1) HTML stands for -',
    options: {
      a: 'HighText Machine Language',
      b: 'HyperText and links Markup Language',
      c: 'HyperText Markup Language',
      d: 'None of these',
    },
  },
  {
    id: 2,
    question:
      '2) The correct sequence of HTML tags for starting a webpage is -',
    options: {
      a: 'Head, Title, HTML, body',
      b: 'HTML, Body, Title, Head',
      c: 'HTML, Head, Title, Body',
      d: 'HTML, Title, Body',
    },
  },
  {
    id: 3,
    question:
      '3) Which of the following element is responsible for making the text bold in HTML?',
    options: {a: '<pre>', b: '<a>', c: '<b>', d: '<br>'},
  },
  {
    id: 4,
    question:
      '4) Which of the following tag is used to insert a line-break in HTML?',
    options: {a: '<br>', b: '<a>', c: '<pre>', d: '<b>'},
  },
  {
    id: 5,
    question:
      '5) How to create an unordered list (a list with the list items in bullets) in HTML?',
    options: {a: '<ul>', b: '<ol>', c: '<li>', d: '<i>'},
  },
]
const Answers = [
  'HyperText Markup Language',
  'HTML, Head, Title, Body',
  '<b>',
  '<br>',
  '<ul>',
]

let selectedOption = ['', '', '', '', '']
let timerId

class Home extends Component {
  state = {minutes: 5, seconds: 0, isSubmitted: false}

  componentDidMount() {
    timerId = setInterval(this.updateTime, 1000)
  }

  componentWillUnmount() {
    clearInterval(timerId)
  }

  updateTime = () => {
    const {minutes, seconds} = this.state
    if (minutes === 0 && seconds === 0) {
      clearInterval(timerId)
      this.setState({isSubmitted: true})
    } else {
      const second = minutes * 60 - 1 + seconds
      const m = Math.floor(second / 60)
      const s = second % 60
      this.setState({seconds: s, minutes: m})
    }
  }

  onLogout = () => {
    this.componentWillUnmount()
    selectedOption = ['', '', '', '', '']
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onSubmitTest = () => {
    clearInterval(timerId)
    this.setState({isSubmitted: true, seconds: '00', minutes: '00'})
  }

  saveOption = (id, value) => {
    selectedOption[id - 1] = value
  }

  getResults = () => {
    const score = Answers.filter(
      (each, index) => each === selectedOption[index],
    )

    return (
      <>
        <p>Your MCQ Score</p>
        <h1>{score.length}/5</h1>
      </>
    )
  }

  render() {
    const {minutes, seconds, isSubmitted} = this.state
    return (
      <div>
        <div className="nav-bar">
          <img
            src="https://res.cloudinary.com/dl3cvyhk8/image/upload/v1670292231/v_phrase_mcq_app_1_isyo09.png"
            alt="navbar-logo"
          />
          <button
            type="button"
            onClick={this.onSubmitTest}
            className="submit-button"
          >
            SUBMIT
          </button>
          <div className="timer">
            {minutes} : {seconds}
          </div>
          <button
            className="logout-button"
            type="button"
            onClick={this.onLogout}
          >
            Logout
          </button>
        </div>
        {isSubmitted ? (
          <div className="results-container">{this.getResults()}</div>
        ) : (
          <div className="questions-container">
            {questionsData.map(each => (
              <McqGenerator
                mcqData={each}
                key={each.id}
                saveOption={this.saveOption}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default Home
