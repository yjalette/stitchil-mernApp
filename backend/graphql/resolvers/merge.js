
const { dateToString } = require("../../helpers/date");
const User = require("../../models/user");



const transformPortfolio = portfolio => {
    return {
        designerInfo: { ...portfolio._doc, gallery: undefined },
        gallery: portfolio.gallery || null,
        creator: portfolio.creator
    }
}

const transformUsersIds = async ids => {
    return await ids.map(async id => {
        const { username } = await User.findById(id, { username: 1, _id: 0 });
        return username;
    })
}

const transformComment = comment => {
    const { username, profileImage } = comment.sender;
    return {
        ...comment._doc,
        sender: {
            username,
            profileImage
        }
    }
}


const portfolios = portfoliosIds => {
    return Portfolio
        .find({ id: { $in: portfoliosIds } })
        .then(portfolios => {
            return portfolios.map(portfolio => {
                return transformportfolio(portfolio)
            })
        })
        .catch(err => {
            console.log("no portfolios found")
            throw err
        })
}

const singlePortfolio = async portfolioId => {
    try {
        const portfolio = await Portfolio.findById(portfolioId);
        return transformPortfolio(portfolio)
    } catch (err) {
        console.log("no portfolio")
        throw err;
    }
}


const transformFile = file => file._doc

async function fetchChat(chat, userId) {
    const { _id, messages } = chat;
    const members = chat.members.map(member => member.username);
    const profileImage = chat.members.find(member => !member._id.equals(userId)).profileImage;
    return {
        _id,
        members,
        messages: messages.map(msg => {
            return {
                ...msg._doc
            }
        }),
        profileImage
    };
}

exports.fetchChat = fetchChat;
exports.portfolios = portfolios;
exports.singlePortfolio = singlePortfolio;
exports.transformComment = transformComment;
exports.transformFile = transformFile;
exports.transformPortfolio = transformPortfolio;
// exports.transformUser = transformUser;
exports.transformUsersIds = transformUsersIds;




// const transformEvent = event => {
//     return {
//         ...event._doc,
//         _id: event.id,
//         date: dateToString(event._doc.date),
//         creator: user.bind(this, event.creator)
//     }
// }

