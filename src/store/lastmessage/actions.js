import axios from 'axios';

export const actionLastMessages = async ({commit}) => {
    
    const res = await axios.get("messages/list")

    let messages = res.data.data;
    // messages = messages.sort((a, b) => a-b);

    commit("SET_LASTMESSAGES",messages)
    
}