import {
    SIGNUP_MUTATION,
    UPDATE_DESIGNER_MUTATION,
    CREATE_MESSAGE_MUTATION,
    CREATE_CHAT_MUTATION,
    CREATE_REVIEW_MUTATION,
    CREATE_COMMENT_MUTATION,
    CREATE_GIG_MUTATION,
    UPDATE_GIG_MUTATION,
    UPDATE_USER_MUTATION,
    UPDATE_SECURITY_MUTATION,
    FORGOT_PASSWORD_MUTATION,
    CREATE_PORTFOLIO_ITEM_MUTATION,
    UPDATE_PORTFOLIO_ITEM_MUTATION,
    LIKE_PORTFOLIO_ITEM_MUTATION,
    UPLOAD_PROFILE_IMAGE_MUTATION,
    CONTACT_US_MUTATION
} from '../graphql/mutations';


export const reducer = (state, action) => {
    console.log("action--->", action.type)
    switch (action.type) {
        case "JOIN":
            return {
                MUTATION: SIGNUP_MUTATION
            }
        case "CREATEMESSAGE":
            return {
                MUTATION: CREATE_MESSAGE_MUTATION
            }
        case "CREATEREVIEW":
            return {
                MUTATION: CREATE_REVIEW_MUTATION
            }
        case "UPDATEDESIGNER":
            return {
                MUTATION: UPDATE_DESIGNER_MUTATION
            }
        case "CREATEPORTFOLIO": {
            return {
                MUTATION: CREATE_PORTFOLIO_ITEM_MUTATION
            }
        }
        case "UPDATEPORTFOLIO": {
            return {
                MUTATION: UPDATE_PORTFOLIO_ITEM_MUTATION,
            }
        }
        case "UPDATEGIGS":
            return {
                MUTATION: UPDATE_GIG_MUTATION
            }
        case "CREATEGIGS":
            return {
                MUTATION: CREATE_GIG_MUTATION
            }
        case "UPDATEUSER":
            return {
                MUTATION: UPDATE_USER_MUTATION
            }
        case "UPDATESECURITY":
            return {
                MUTATION: UPDATE_SECURITY_MUTATION
            }
        case "FORGOTPASSWORD":
            return {
                MUTATION: FORGOT_PASSWORD_MUTATION
            }
        case "LIKEPORTFOLIOITEM":
            return {
                MUTATION: LIKE_PORTFOLIO_ITEM_MUTATION
            }
        case "UPLOADPROFILEIMAGE":
            return {
                MUTATION: UPLOAD_PROFILE_IMAGE_MUTATION
            }
        case "CHAT":
            return {
                MUTATION: CREATE_CHAT_MUTATION
            }
        case "CREATECOMMENT":
            return {
                MUTATION: CREATE_COMMENT_MUTATION
            }
        case "CONTACTUS":
            return {
                MUTATION: CONTACT_US_MUTATION
            }

        default: return

    }
}