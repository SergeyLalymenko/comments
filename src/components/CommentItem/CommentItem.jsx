import { useState } from 'react';
import classNames from 'classnames';
import Button from '@/UI/Button/Button';

function CommentItem({ comment, removeComment }) {
    const [isDisabled, setIsDisabled] = useState(false);

    function onRemoveCommentClick() {
        setIsDisabled(true);
        removeComment(comment.id, () => {
            setIsDisabled(false);
        });
    }

    function getRemoveButtonClasses() {
        return classNames({ 'pointer-events-none': isDisabled }, 'ml-auto');
    }

    return (
        <div className="comment-item flex border-solid border-border border mt-2 rounded p-2">
            <p className="mr-5">
                {comment.body}
            </p>
            <Button
                onClickAction={onRemoveCommentClick}
                config={{ visualType: 'danger' }}
                additionalClasses={getRemoveButtonClasses()}
            >
                Remove
            </Button>
        </div>
    )
}

export default CommentItem;
