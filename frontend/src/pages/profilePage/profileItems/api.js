import { CREATE_GIG_MUTATION, CREATE_PRODUCT_MUTATION, UPDATE_GIG_MUTATION, UPDATE_PRODUCT_MUTATION } from "../graphql/mutations"
import { PROFILE_GIGS_QUERY, PROFILE_PORTFOLIO_QUERY, PROFILE_REVIEWS_QUERY } from "../graphql/queries"

export const query_get = {
    gigs: PROFILE_GIGS_QUERY,
    portfolio: PROFILE_PORTFOLIO_QUERY,
    reviews: PROFILE_REVIEWS_QUERY
}

export const mutation_create = {
    gigs: CREATE_GIG_MUTATION,
    portfolio: CREATE_PRODUCT_MUTATION,
}

export const mutation_update = {
    gigs: UPDATE_GIG_MUTATION,
    portfolio: UPDATE_PRODUCT_MUTATION
}