import { BACKEND_SERVER } from './secrets'

const host = BACKEND_SERVER

const url = {
  users: `${host}/users/`,
  checkInviteCode: `${host}/inviteCode/check/`,
  login: `${host}/login/`,
  logout: `${host}/logout/`,
  updateUserInfo: `${host}/updateUserInfo/`,

  saasApiGetTickets: `${host}/saasApi/getTickets/`,
  saasApiGetKnowledges: `${host}/saasApi/getKnowledges/`
}

export default url
