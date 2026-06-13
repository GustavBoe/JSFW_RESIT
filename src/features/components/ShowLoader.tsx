import { Loader } from "lucide-react";
export default function ShowLoader() {
  return (
    <div className="flex flex-col items-center mx-auto pt-50 text-white">
      <p className="animate-bounce text-xl text-primary font-medium">
        Loading games
      </p>
      <Loader size={48} />
    </div>
  );
}
