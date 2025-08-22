export default function ErrorToast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg">
      {message}
    </div>
  );
}
