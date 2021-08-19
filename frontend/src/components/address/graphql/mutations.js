import gql from 'graphql-tag';

export const CREATE_ADDRESS_MUTATION = gql`
        mutation createAddress($addressInput: AddressInput){
            createAddress(addressInput: $addressInput) {
                _id
                address1
                address2
                city
                state
                zip
                country

            }
        }
`

export const UPDATE_ADDRESS_MUTATION = gql`
        mutation UpdateAddress($addressInput: AddressInput){
            updateAddress(addressInput: $addressInput) {
                _id
                address1
                address2

            }
        }
`

export const DELETE_ADDRESS_MUTATION = gql`
mutation DeleteAddress($addressId: ID){
    deleteAddress(addressId: $addressId)
}
`