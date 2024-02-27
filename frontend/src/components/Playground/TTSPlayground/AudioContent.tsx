type AudioContentProps = {
  fileName?: string | null;
}

const AudioContent = ({fileName}: AudioContentProps) => {

  if (!fileName) {
    return null;
  }

  return (
    <div className={"w-full"}>
      <audio controls>
        <source
          src={fileName}
        />
      </audio>
    </div>
  )
};

export default AudioContent;
