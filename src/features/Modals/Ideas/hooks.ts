import { api } from "@/src/utils/api";

export const useIdeas = () => {

    const { data: allIdeasRaw, isLoading: loadingAllIdeas } = api.idea.getAll.useQuery();

    const { mutate: submitIdea, isLoading: submittingIdea } = api.idea.submit.useMutation();

    const { mutate: updateIdeaStatus, isLoading: updatingIdeaStatus } = api.idea.updateStatus.useMutation();

    const { mutate: addIdeaLabel, isLoading: addingIdeaLabel } = api.idea.addLabel.useMutation();

    const { mutate: removeIdeaLabel, isLoading: removingIdeaLabel } = api.idea.removeLabel.useMutation();

    const { mutate: updateIdeaLabels, isLoading: updatingIdeaLabels } = api.idea.updateLabels.useMutation();

    const getIdeasByBoard = (boardPath: string) => {
        const { data: boardIdeasRaw, isLoading: loadingBoardIdeas } = api.idea.getAllByBoard.useQuery({
            boardPath
        });
        return { ideas: boardIdeasRaw, isLoading: loadingBoardIdeas }; // add processing if necessary
    };

    const getIdea = (ideaId: string) => {
        const { data: ideaRaw } = api.idea.idea.useQuery({ id: ideaId });
        return ideaRaw;
    };

    const allIdeas = allIdeasRaw;

    return {
        allIdeas,
        loadingAllIdeas,
        submitIdea,
        submittingIdea,
        updateIdeaStatus,
        updatingIdeaStatus,
        addIdeaLabel,
        addingIdeaLabel,
        removeIdeaLabel,
        removingIdeaLabel,
        updateIdeaLabels,
        updatingIdeaLabels,
        getIdeasByBoard,
        getIdea,
    };
};
