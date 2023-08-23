import { api } from "@/src/utils/api";



export const useComments = ({ id }: { id: string }) => {
    const { data: comments, isError, isLoading: fetchingComments, refetch } = api.comments.getByIdea.useQuery({ ideaId: id });
    const { mutate: addComment, isLoading: addingComment, isSuccess, isError: failedtoAdd } = api.comments.createComment.useMutation();

    const handleAddComment = (comment: string) => {
        try {
            addComment({ comment: comment, ideaId: id});
            isSuccess && refetch();
        } catch (err) {
            failedtoAdd && console.error(err);
        }
    };


    return {
        comments,
        addComment: handleAddComment,
        fetchingComments,
        addingComment,
        isError
    }
}
