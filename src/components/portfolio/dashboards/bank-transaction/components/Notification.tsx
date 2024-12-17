export const Notification = ({ message }: { message: string }) => {
  return (
    <div
      className="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
      role="alert"
    >
      <strong className="font-bold">Success!</strong>
      <span className="block sm:inline"> {message}</span>
    </div>
  );
};
