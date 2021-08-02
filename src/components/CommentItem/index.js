import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails} = props
  const {
    id,
    username,
    comment,
    isLiked,
    initialClassName,
    date,
  } = commentDetails

  const initial = username ? username[0].toUpperCase() : ''
  const likedTextClassName = isLiked ? 'button active' : 'button'
  const likedImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onClickLiked = () => {
    const {onToggleIsLiked} = props
    onToggleIsLiked(id)
  }

  const onDeleteComments = () => {
    const {onDeleteComment} = props
    onDeleteComment(id)
  }

  const postedTime = formatDistanceToNow(date)

  return (
    <li className="comment-items">
      <div className="comments-items-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="user-time-container">
            <p className="username">{username}</p>
            <p className="time">{postedTime} ago</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="button-container">
        <div className="like-container">
          <img src={likedImageUrl} alt="like" className="like-image" />
          <button
            className={likedTextClassName}
            type="button"
            onClick={onClickLiked}
          >
            Like
          </button>
        </div>
        <button
          className="button"
          type="button"
          onClick={onDeleteComments}
          testid="delete"
        >
          <img
            className="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}
export default CommentItem
