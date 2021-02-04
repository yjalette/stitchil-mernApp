import { CREATE_GIG_MUTATION, CREATE_PRODUCT_MUTATION, UPDATE_GIG_MUTATION, UPDATE_PRODUCT_MUTATION } from "../graphql/mutations"

export const mutation_create = {
    gigs: CREATE_GIG_MUTATION,
    portfolio: CREATE_PRODUCT_MUTATION,
}

export const mutation_update = {
    gigs: UPDATE_GIG_MUTATION,
    portfolio: UPDATE_PRODUCT_MUTATION
}