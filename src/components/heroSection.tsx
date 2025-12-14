import { Github, Linkedin } from "lucide-react";
import SectionWrapper from "./section-wrapper";
import { BackgroundRippleEffect } from "./ui/background-ripple-effect";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <SectionWrapper>
      <div className="h-screen relative ">
        <BackgroundRippleEffect>
          <div className="flex flex-row gap-4 items-center">
            <div className=" h-30 w-30 rounded-full border-4 border-accent-foreground">
              <img
                className="rounded-full object-fit"
                src="src/public/marius.jpeg"
              ></img>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <h1 className="text-6xl">Hi, I'm Marius!</h1>
              <p className="text-secondary-foreground text-xl">
                a Full-Stack / Backend developer
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
