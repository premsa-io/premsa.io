const BUILD_TIME = new Date().toISOString();

export const BuildStamp = () => {
  return (
    <div className="fixed bottom-2 left-2 text-[10px] text-muted-foreground/50 font-mono z-50">
      Build: {BUILD_TIME.slice(0, 16).replace('T', ' ')}
    </div>
  );
};
