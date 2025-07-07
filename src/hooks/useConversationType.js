import { useSearchParams } from "react-router-dom";

export function useConversationType() {
  const [searchParams] = useSearchParams();
  const rawType = searchParams.get("type");

  const conversationType = rawType && rawType !== "null" ? rawType : null;

  return conversationType;
}
