import gql from 'graphql-tag';

export const ADDRESS_QUERY = gql`
    query address($addressId: addressId){
        address(addressId: $addressId) {
            _id
                
        }
}     
`;

export const ADDRESSES_USER_QUERY = gql`
    query addressesUser($onlyLatest: Boolean){
        addressesUser(onlyLatest: $onlyLatest) {
            _id
            address1
            address2
            city
            state
            zip
            country
        }
}     
`;

export const ADDRESS_LATEST_QUERY = gql`
    query addressLatest{
        addressLatest{
                _id
                address1
                address2
                city
                state
                zip
                country 
        }
}     
`;