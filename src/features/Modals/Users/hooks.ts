import { api } from "@/src/utils/api";

export const useUser = () => {
  const { mutate: syncUser, isLoading: syncing } = api.user.sync.useMutation();
  const { data: user, isLoading: userLoading } = api.user.get.useQuery();

  return { user, isLoading: userLoading || syncing, syncUser };
};
