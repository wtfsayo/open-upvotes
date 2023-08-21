import { api } from "@/src/utils/api";

export const useBoards = () => {
  const { data: rawBoards } = api.boards.getAllByUser.useQuery();
  const { mutate: addBoard, isLoading } = api.boards.createBoard.useMutation();
  const { data: allBoards } = api.boards.getAllBoards.useQuery();

  const boards = rawBoards?.map((board) => ({
    title: board.title,
    path: board.path,
  }));

  return { boards, allBoards, addBoard, isLoading };
};
