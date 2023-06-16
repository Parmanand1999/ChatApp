export const baseurl = 'http://65.108.77.50:8005';
export const connectUrl = 'ws://65.108.77.50:8005';
export const endpoint = {
    login: `${baseurl}/api/v1/login/`,
    signup: `${baseurl}/api/v1/register/`,
    getUser: `${baseurl}/api/v1/get_user`,
    connection: `${connectUrl}/api/v1/ws/chat`,
    roomId: `${baseurl}/api/v1/get_room_Id`,
    messages:`${baseurl}/api/v1/chats`
}