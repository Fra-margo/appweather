import { Container } from "react-bootstrap"

const ChiSiamo = () => {
    const videoId = "UpA-VxEldPg";
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <Container>
            <div className="embed-responsive embed-responsive-16by9 text-center mt-3">
                <iframe
                    title="YouTube Video"
                    className="embed-responsive-item rounded"
                    style={{width:'80%', height:'350px'}}
                    src={embedUrl}
                    allowFullScreen
                ></iframe>
            </div>
        </Container>
    );
}

export default ChiSiamo