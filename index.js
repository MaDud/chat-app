import {gql} from '@apollo/client';

export const GET_USERS_ROOMS = gql`
  {
    usersRooms {
        rooms {
          id
          name
          roomPic
        }
    }
  }
`;

export const GET_CHAT_DATA = gql`
    query($id: String) { 
        room(id: $id) {
            name
            roomPic
            user {
                id
            }
            messages {
                id
                body
                insertedAt
                user {
                    id
                    profilePic
                    firstName
                    lastName
                }
            }
    }
}`

export const ADD_MESSAGE = gql`
  mutation ($body:String, $roomId: String) {
    sendMessage(body: $body, roomId: $roomId) {
      body
      id
    }
  }
`