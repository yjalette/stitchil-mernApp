import { DELETE_PORTFOLIO_ITEM_MUTATION, DELETE_COMMENT_MUTATION, DELETE_GIG_MUTATION, DELETE_CHAT_MUTATION, DELETE_MESSAGE_MUTATION } from '../graphql/mutations';


export const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case "MESSAGE":
            return {
                MUTATION: DELETE_MESSAGE_MUTATION
            }
        case "PORTFOLIO":
            return {
                MUTATION: DELETE_PORTFOLIO_ITEM_MUTATION
            }
        case "CHAT":
            return {
                MUTATION: DELETE_CHAT_MUTATION
            }
        case "DELETECOMMENT":
            return {
                MUTATION: DELETE_COMMENT_MUTATION
            }
        case "GIGS":
            return {
                MUTATION: DELETE_GIG_MUTATION
            }


        default: return {
            MUTATION: null
        }

    }
}
