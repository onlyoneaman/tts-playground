
type AudioContentProps = {
    fileName?: string | null;
}

const AudioContent = ({fileName}: AudioContentProps) => {

    if(!fileName) {
        return null;
    }

    return(
        <div>
            <audio controls>
                <source src={fileName} />
            </audio>
        </div>
    )
};

export default AudioContent;
