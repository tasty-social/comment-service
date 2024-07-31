import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Comment } from 'src/comments/schemas/comment.schema'

@WebSocketGateway({
  cors: true
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  afterInit(server: Server) {
    console.log('WebSocket initalized Server: ', server)
  }

  handleConnection(client: Socket) {
    console.log(`Client connected ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected ${client.id}`)
  }

  @SubscribeMessage('joinPost')
  handleJoinPost(@ConnectedSocket() client: Socket, @MessageBody() postId: string) {
    client.join(postId)
    console.log(`Client ${client.id} joined room ${postId}`)
  }

  @SubscribeMessage('leavePost')
  handleLeavePost(@ConnectedSocket() client: Socket, @MessageBody() postId: string) {
    client.leave(postId)
    console.log(`Client ${client.id} leaved room ${postId}`)
  }

  emitNewComment(comment: Comment) {
    this.server.to(comment.postId.toString()).emit('newComment', comment)
  }
}
