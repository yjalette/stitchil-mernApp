const { gql } = require("apollo-server-express");


module.exports = gql`
type DesignerResume {
    styles: [String]
    skills: [String]
    experience: [String]
    education: [String]
}

input DesignerInput {
    styles: [String]
    skills: [String]
    experience: [String]
    education: [String]    
}

type Mutation {    
    updateDesigner(designerInput: DesignerInput): Boolean
}


`;


