import CommentsList from '@/modules/CommentsList/CommentsList';

function Comments() {
    return (
        <div className="comments-page my-20">
            <div className="container mx-auto px-4">
                <CommentsList />
            </div>
        </div>
    )
}

export default Comments;
