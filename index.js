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
            messages {
                id
                body
            }
    }
}`