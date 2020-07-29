
const host = 'http://127.0.0.1:8000/';

let url = {
  users: host+'users/',
  checkInviteCode: host+'inviteCode/check/',
  login: host+'login/',
  logout: host+'logout/',
  updateUserInfo: host+'updateUserInfo/',

  saasApiGetTickets: host+'saasApi/getTickets/',
  saasApiGetKnowledges: host+'saasApi/getKnowledges/',
};

export default url;