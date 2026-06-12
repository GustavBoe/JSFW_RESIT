interface AddedToastProps {
  name: string;
}
export default function AddedToast({ name }: AddedToastProps) {
  return (
    <div className="border-4 border-[#197944] right-5 px-4 py-3 rounded-lg shadow-lg bg-white text-[#197944] z-50 animate-[slideIn_0.3s_ease-out]">
      <div>
        <p>{name} was added to favourites</p>{" "}
      </div>
    </div>
  );
}
