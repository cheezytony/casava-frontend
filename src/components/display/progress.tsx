export interface ProgressBarProps {
  transition?: boolean;
  progress?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 0,
  transition,
}) => {
  return (
    <div className="relative h-[2px] bg-[#EAEAEA] rounded-full">
      <div
        className="absolute h-full bg-pink-700 rounded-full"
        style={{
          width: `${progress}%`,
          transition: transition ? 'width 0.5s ease' : 'none',
        }}
      />
    </div>
  );
};
