export default ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className="bg-white p-10 rounded-3xl flex flex-col items-center max-w-2xl w-full">
        {children}
      </div>
    </>
  );
};
