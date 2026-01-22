import { Github, Linkedin } from "lucide-react";
import SectionWrapper from "./section-wrapper";
import { BackgroundRippleEffect } from "./ui/background-ripple-effect";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <SectionWrapper>
      <div className="relative min-h-[512px]">
        <BackgroundRippleEffect>
          <div className="flex flex-row gap-6 items-center">
            <img
              className="h-30 w-30 rounded-full border-2 border-accent-foreground"
              src="https://rhg08ejxm8a9ebf4.public.blob.vercel-storage.com/file.jpeg"
            ></img>
            <div className="flex flex-col justify-center gap-2">
              <h1 className="text-4xl lg:text-5xl font-mono">
                Hi, I'm <span className="text-primary font-mono">Marius</span>!
              </h1>
              <p className="text-secondary-foreground text-lg lg:text-xl font-mono">
                backend engineer
              </p>
              <ul className="flex flex-row items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/marius-cozma-5262a5207"
                  target="_blank"
                >
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="rounded-full"
                  >
                    <Linkedin color="white" />
                  </Button>
                </a>
                <a href="https://github.com/mariuscozma11" target="_blank">
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="rounded-full"
                  >
                    <Github color="white" />
                  </Button>
                </a>
              </ul>
            </div>
          </div>
        </BackgroundRippleEffect>
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
