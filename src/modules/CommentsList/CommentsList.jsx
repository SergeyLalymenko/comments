import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    fetchComments,
    createComment,
    deleteComment
} from '@/store/commentsSlice';
import CommentItem from '@/components/CommentItem/CommentItem';
import Modal from '@/components/Modal/Modal';
import Input from '@/UI/Input/Input';
import Button from '@/UI/Button/Button';

function CommentsList() {
    const schema = yup.object({
        body: yup.string().required('Required').min(2, 'Min 2 symbols!').max(64, 'Max 64 symbols!')
    });
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments.data);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const initLocalStorageData = useCallback(() => {
        const createFormData = JSON.parse(localStorage.getItem('createFormData'));
        if (createFormData) return;

        resetCreateFormDataStorage();
    }, []);

    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(() => {
        dispatch(fetchComments()).then(() => {
            const scrollPositionY = localStorage.getItem('scrollPositionY');
            if (!scrollPositionY) return;

            window.scrollTo(0, scrollPositionY);
        });
        initLocalStorageData();
    }, [dispatch, initLocalStorageData]);

    function removeComment(id, callback) {
        dispatch(deleteComment(id)).catch(callback);
    }

    function toggleModal() {
        setIsOpenModal(!isOpenModal);
    }

    function onSubmit(data) {
        dispatch(createComment(data));
        setValue('body', '');
        resetCreateFormDataStorage();
        toggleModal();
    }

    function resetCreateFormDataStorage() {
        localStorage.setItem('createFormData', JSON.stringify({ body: '' }));
    }

    function onFieldChange(value, name) {
        const createFormData = JSON.parse(localStorage.getItem('createFormData'));
        if (!createFormData) return;

        localStorage.setItem('createFormData', JSON.stringify({
            ...createFormData,
            [name]: value
        }));
    }

    return (
        <>
            <div className="comments-list">
                <Button
                    additionalClasses="mb-2"
                    onClickAction={toggleModal}
                >
                    Add New
                </Button>
                {
                    comments.length ? (
                        comments.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                removeComment={removeComment}
                            />
                        ))
                    ) : (
                        <h5>
                            Loading...
                        </h5>
                    )
                }
            </div>
            <Modal
                isOpen={isOpenModal}
                toggleModal={toggleModal}
                config={{
                    title: 'Add comment',
                    size: 'sm'
                }}
            >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            config={{
                                placeholder: 'Comment'
                            }}
                            register={register}
                            name="body"
                            defaultValue={JSON.parse(localStorage.getItem('createFormData'))?.body || ''}
                            error={errors.body}
                            onFieldChange={onFieldChange}
                        />
                        <Button
                            additionalClasses="mt-4"
                            config={{
                                type: 'submit'
                            }}
                        >
                            Create
                        </Button>
                    </form>
            </Modal>
        </>
    )
}

export default CommentsList;
