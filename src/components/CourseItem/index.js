import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItem extends Component {
  state = {courseDetails: '', apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    const {match} = this.props

    const {params} = match

    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const courseDetailsApiUrl = `https://apis.ccbp.in/te/courses/${id}`

    const response = await fetch(courseDetailsApiUrl)

    if (response.ok) {
      const data = await response.json()

      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }

      this.setState({
        courseDetails: updatedData,
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
    const {courseDetails} = this.state

    const {name, imageUrl, description} = courseDetails

    return (
      <div className="course-details">
        <div className="course-details-container">
          <img src={imageUrl} alt={name} className="course-details-image" />
          <div className="course-details-content">
            <h1 className="course-details-heading"> {name} </h1>
            <p className="course-details-description"> {description} </p>
          </div>
        </div>
      </div>
    )
  }

  onClickRetry = () => {
    this.getCourseDetails()
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

  renderCourseDetailsView = () => {
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
        <div> {this.renderCourseDetailsView()} </div>
      </>
    )
  }
}

export default CourseItem
