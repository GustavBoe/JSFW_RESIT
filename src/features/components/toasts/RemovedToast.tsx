interface RemovedToastProps {
  name: string;
}
export default function RemovedToast({ name }: RemovedToastProps) {
  return (
    <div className="border-4 border-[#da2e2e] right-5 px-4 py-3 rounded-lg shadow-lg bg-white text-[#791919] z-50 animate-[slideIn_0.3s_ease-out]">
      <div>
        <p>{name} was removed from favourites</p>
      </div>
    </div>
  );
}
