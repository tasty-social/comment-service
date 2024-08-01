export const CommentEvent = {
  created: 'comment.created',
  updated: 'comment.updated',
  delete: 'comment.deleted'
}

export class CreatedCommentEvent {
  _id: string
  constructor(id: string) {
    this._id = id
  }
}

export class UpdatedCommentEvent {
  _id: string
  constructor(id: string) {
    this._id = id
  }
}

export class DeletedCommentEvent {
  _id: string
  constructor(id: string) {
    this._id = id
  }
}
