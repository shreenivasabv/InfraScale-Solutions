import "./Hero.css";
import videoSrc from "../../assets/new_video.mp4";

function Hero() {

  return (
    <section className="hero">
      {videoSrc && (
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-video"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      <div className="hero-content">
        <h1>
          We Don’t Just Manage IT. We Engineer Resilience.
        </h1>

        <p>
          Most IT firms provide support. We provide architectural mastery.
          From rack-and-stack to complex multi-cloud migrations,
          our elite team builds the bedrock your business grows on.
        </p>

        <div className="hero-buttons">
          <a href="#contact">
            <button className="primary-btn">
              Get a Free Infrastructure Health Check
            </button>
          </a>
          <a href="#techstack">
            <button className="secondary-btn">
              Our Tech Stack
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
