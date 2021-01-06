import {
    SIGNUP_MUTATION,
    UPDATE_DESIGNER_MUTATION,
    CREATE_MESSAGE_MUTATION,
    CREATE_CHAT_MUTATION,
    CREATE_REVIEW_MUTATION,
    CREATE_COMMENT_MUTATION,
    CREATE_GIG_MUTATION,
    UPDATE_GIG_MUTATION,
    UPDATE_EMAIL_MUTATION,
    UPDATE_GENERAL_MUTATION,
    UPDATE_USERNAME_MUTATION,
    UPDATE_PASSWORD_MUTATION,
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
        case "UPDATEUSERNAME":
            return {
                MUTATION: UPDATE_USERNAME_MUTATION
            }
        case "UPDATEEMAIL":
                return {
                    MUTATION: UPDATE_EMAIL_MUTATION
                }
        case "UPDATEGENERAL":
                    return {
                        MUTATION: UPDATE_GENERAL_MUTATION
                    }
        case "UPDATEPASSWORD":
            return {
                MUTATION: UPDATE_PASSWORD_MUTATION
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