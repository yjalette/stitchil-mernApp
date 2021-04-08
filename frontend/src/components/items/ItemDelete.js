import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router';
import { useMutation } from '@apollo/react-hooks';
import mutations from './graphql/mutations';
import AuthContext from '../../context/Auth-context';
import SectionWrapper from '../../layout/SectionWrapper';
import SectionHeader from '../../layout/SectionHeader';
import CustomForm from '../../layout/CustomForm';
import { useToggle } from '../../custom_hooks/useToggle';

const ItemDelete = ({ group }) => {
    const { user } = useContext(AuthContext)
    const { itemId } = useParams();
    const { push } = useHistory();
    const [idDeleted, toggleIsDeleted] = useToggle(false)
    const [post] = useMutation(mutations["DELETE"], {
        onCompleted: async data => {
            if (data.delete_item) {
                await toggleIsDeleted(true);
                return setTimeout(() => {
                    push(`/profile/${user.username}/${group}`)
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
            {/* <SectionHeader title="delete item" /> */}
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
        </SectionWrapper>
    )

}
export default React.memo(ItemDelete)

{/* <CustomModal
modal_title="Confirm Deletion"
modal_size="md"
modal_class="postModal"
displayWithoutBtn={true}
>
<Modal.Body className="p-3 d-flex flex-column">
    <h6 className="postModal__title">Are you sure to delete this item? </h6>
    <a href="#" className="postModal__button-wrapper" onClick={handleDelete}>
        <CustomButton btn_class="btn-click postModal__button float-right" >delete</CustomButton>
    </a>
</Modal.Body>
</CustomModal> */}