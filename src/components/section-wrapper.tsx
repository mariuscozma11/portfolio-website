const SectionWrapper = ({ children }: any) => {
  return (
    <div className="w-full   border-dashed border-b">
        <div className="border-x border-dashed max-w-7xl mx-auto">
      {children}</div>
    </div>
  );
};

export default SectionWrapper;
