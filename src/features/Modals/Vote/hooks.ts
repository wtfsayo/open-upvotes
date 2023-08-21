import { api } from "@/src/utils/api";

export const useUpvotes = () => {
  const { mutate: createUpvote, isLoading: creatingUpvote } =
    api.upvote.create.useMutation();
  const { mutate: deleteUpvote, isLoading: deletingUpvote } =
    api.upvote.delete.useMutation();

  return {
    createUpvote,
    deleteUpvote,
    creatingUpvote,
    deletingUpvote,
  };
};
