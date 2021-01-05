
import {
    PROFILE_GIGS_QUERY,
    COMMENTS_QUERY,
    LOGIN_QUERY,
    CHECK_IF_EXISTS_QUERY,
    CHATS_QUERY,
    FILTER_GIGS_QUERY,
    FILTER_TALENTS_QUERY,
    PROFILE_REVIEWS_QUERY,
    PROFILE_INTRO_QUERY,
    DESIGNER_RESUME_QUERY,
    PROFILE_PORTFOLIO_QUERY,
    MESSAGES_QUERY,
    ACCOUNT_QUERY
} from '../graphql/queries';



export const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                QUERY: LOGIN_QUERY
            }
        case "ACCOUNT":
            return {
                QUERY: ACCOUNT_QUERY
            }
        case "PROFILEINTRO":
            return {
                QUERY: PROFILE_INTRO_QUERY
            }

        case "DESIGNERRESUME": {
            return {
                QUERY: DESIGNER_RESUME_QUERY
            }
        }
        case "COMMENTS":
            return {
                QUERY: COMMENTS_QUERY
            }
        case "PROFILEREVIEWS":
            return {
                QUERY: PROFILE_REVIEWS_QUERY
            }
        case "PROFILEPORTFOLIO":
            return {
                QUERY: PROFILE_PORTFOLIO_QUERY
            }
        case "FILTER_TALENTS":
            return {
                QUERY: FILTER_TALENTS_QUERY
            }
        case "PROFILEGIGS":
            return {
                QUERY: PROFILE_GIGS_QUERY
            }
        case "FILTER_GIGS":
            return {
                QUERY: FILTER_GIGS_QUERY
            }
        case "FINDUSER": {
            return {
                QUERY: CHECK_IF_EXISTS_QUERY
            }
        }
        case "CHATS": {
            return {
                QUERY: CHATS_QUERY
            }
        }
        case "MESSAGES": {
            return {
                QUERY: MESSAGES_QUERY
            }
        }

        default: return {
            QUERY: null
        }

    }
}