import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 items-center justify-center flex">
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
};

export default Loading;
