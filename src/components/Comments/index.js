import {Component} from 'react'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {commentsList: [], commentInput: '', nameInput: ''}

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = commentId => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  onAddNameChange = event => {
    this.setState({nameInput: event.target.value})
  }

  onAddCommentChange = event => {
    this.setState({commentInput: event.target.value})
  }

  render() {
    const {commentsList, nameInput, commentInput} = this.state
    return (
      <div className="app-container">
        <div className="bg-container">
          <form className="form-container" onSubmit={this.onAddComment}>
            <h1 className="heading">Comments</h1>
            <p className="description">Say something about 4.0 Technologies</p>
            <input
              type="text"
              placeholder="Your Name"
              className="input"
              value={nameInput}
              onChange={this.onAddNameChange}
            />
            <div>
              <textarea
                placeholder="Your Comment"
                className="comment-box"
                value={commentInput}
                onChange={this.onAddCommentChange}
              />
            </div>
            <button className="button" type="submit">
              Add Comment
            </button>
          </form>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-image"
            />
          </div>
        </div>
        <hr className="break-line" />
        <div className="comments-container">
          <div className="count-container">
            <p className="count">{commentsList.length}</p>
            <p className="description">Comments</p>
          </div>
          <ul className="comment-list-container">
            {commentsList.map(eachItem => (
              <CommentItem
                commentDetails={eachItem}
                key={eachItem.id}
                toggleIsLiked={this.toggleIsLiked}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
