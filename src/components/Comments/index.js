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
  state = {
    username: '',
    comment: '',
    commentsList: [],
  }

  onDeleteComment = commentId => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  onToggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        commentDetails={eachComment}
        onDeleteComment={this.onDeleteComment}
        onToggleIsLiked={this.onToggleIsLiked}
        key={eachComment.id}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {username, comment} = this.state

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      username,
      comment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      username: '',
      comment: '',
    }))
  }

  onChangeName = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangeComment = event => {
    this.setState({
      comment: event.target.value,
    })
  }

  render() {
    const {username, comment, commentsList} = this.state

    return (
      <div className="bg-container">
        <div className="comment-content-container">
          <h1 className="main-heading">Comments</h1>
          <div className="inputs-container">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="form-para">Say Something about 4.0 Technologies</p>
              <input
                onChange={this.onChangeName}
                type="text"
                className="text-input"
                placeholder="Your name"
                value={username}
              />
              <textarea
                rows="6"
                className="textarea-edit"
                placeholder="Your Comment"
                onChange={this.onChangeComment}
                value={comment}
              />
              <button type="submit" className="comment-button-edit">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="image"
            />
          </div>
          <hr className="hr-line" />
          <p className="bottom-comment">
            <span className="count">{commentsList.length}</span> Comments
          </p>
          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
