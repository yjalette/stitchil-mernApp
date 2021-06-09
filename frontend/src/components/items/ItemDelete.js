import React, { useContext } from 'react';
import { Redirect, useHistory, useParams } from 'react-router';
import { useMutation } from '@apollo/react-hooks';
import mutations from './graphql/mutations';
import AuthContext from '../../context/Auth-context';
import SectionWrapper from '../../layout/SectionWrapper';
import SectionHeader from '../../layout/SectionHeader';
import CustomForm from '../../layout/CustomForm';
import { useToggle } from '../../custom_hooks/useToggle';
import { item_section } from './constants';
import BoxWrapper from '../../layout/BoxWrapper';

const ItemDelete = ({ group }) => {
    const { user } = useContext(AuthContext)
    const { itemId } = useParams();
    const { replace } = useHistory();
    const [idDeleted, toggleIsDeleted] = useToggle(false)
    const [post] = useMutation(mutations["DELETE"], {
        onCompleted: async data => {
            if (data.delete_item) {
                await toggleIsDeleted(true);
                return setTimeout(() => {
                    replace(`/profile/${user.username}/${item_section[group]}`)
                }, 3000)
            }
        }
    });

    const handleDelete = (e) => {
        e.preventDefault();
        post({ variables: { itemId } });
    }

    return (
        <SectionWrapper section_class="item delete">
            <BoxWrapper>
                {!idDeleted ?
                    <>
                        <h5>Do you want to delete this item?</h5>
                        <CustomForm
                            form_class="itemForm-delete"
                            submitTitle="delete"
                            onSubmit={handleDelete}
                        />
                    </>
                    :
                    <h5>Item was successfully deleted. You are being redirected to your profile page</h5>}
            </BoxWrapper>
        </SectionWrapper>
    )

}
export default React.memo(ItemDelete)

