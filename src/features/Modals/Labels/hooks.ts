import { api } from "@/src/utils/api";

export const useLabels = () => {
  const { data: allLabels } = api.labels.getAll.useQuery();
  const { mutate: createLabel, isLoading: creatingLabel } = api.labels.create.useMutation();
  const { mutate: deleteLabel, isLoading: deletingLable } = api.labels.delete.useMutation();
  const { mutate: updateLabel, isLoading: updatingLabel } = api.labels.update.useMutation();

  return { allLabels, createLabel, deleteLabel, creatingLabel, deletingLable, updateLabel, updatingLabel };
};

