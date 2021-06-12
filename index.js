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
  {
    room($id: String) {
        name
        roomPic
        messages {
            id
            body
        }
    }
}`