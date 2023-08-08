import Board from "@/src/components/board";
import { useRouter } from "next/router";
export default function BoardView() {
  const router = useRouter();
  if (!router.query.slug) return <div>404</div>;
  else {
    return <Board path={router.query.slug as string} />;
  }
}
