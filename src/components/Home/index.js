import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {coursesData: '', apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCoursesData()
  }

  getCoursesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const courseApiUrl = 'https://apis.ccbp.in/te/courses'

    const response = await fetch(courseApiUrl)

    if (response.ok) {
      const data = await response.json()

      const updatedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))

      this.setState({
        coursesData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {coursesData} = this.state

    return (
      <>
        <h1 className="home-heading">Courses</h1>
        <ul className="courses-container">
          {coursesData.map(eachCourse => (
            <Link
              to={`/courses/${eachCourse.id}`}
              className="link"
              key={eachCourse.id}
            >
              <li className="course-item">
                <img
                  src={eachCourse.logoUrl}
                  alt={eachCourse.name}
                  className="course-logo"
                />
                <p className="course-name"> {eachCourse.name} </p>
              </li>
            </Link>
          ))}
        </ul>
      </>
    )
  }

  onClickRetry = () => {
    this.getCoursesData()
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading"> Oops! Something Went Wrong </h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderCoursesView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home">{this.renderCoursesView()}</div>
      </>
    )
  }
}

export default Home
