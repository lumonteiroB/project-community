const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-40 w-40 border-t-4 border-b-4 border-blue-500" />
    </div>
  );
};

export default Loading;
