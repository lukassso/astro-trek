import ButtonPrimary from "./components/ButtonPrimary.tsx";
import ButtonSecondary from "./components/ButtonSecondary.tsx";
import HeroAnimeComponent from "./components/HeroAnimeComponent.tsx";
import HeroImageSvg from "./components/HeroImage.tsx";
import { useMediaQuery } from "@/hooks/use-media-query.tsx";

const SvgAnimeUniverseRoot = () => {
  const mobile = useMediaQuery("(min-width: 900px)");
  return (
    <>
      <div className={"heroWrapper"}>
        <div className={"heroTitle"}>
          <h1>
            Flow Control <span>as a service</span>
          </h1>
        </div>
        <div className={"heroContent"}>
          <div className={"imageHero"}>
            <HeroImageSvg
              width={mobile ? "auto" : 300}
              viewBox={mobile ? "-70 0 751 387" : "0 0 651 387"}
            />
          </div>
          <div className={"contentWrapper"}>
            <div className={"contentText"}>
              <p>
                Dapibus dignissim dis felis habitasse leo magna molestie nec nullam phasellus
                posuere praesent pretium proin. At bibendum dictumst dis eget facilisis fringilla
                habitasse hac justo lacinia maecenas magna malesuada massa montes quis sed tempor
                tincidunt ultricies ut venenatis volutpat. Ac aptent consectetur consequat.
              </p>
            </div>
            <div className={"contentButtons"}>
              <ButtonPrimary href="#">Start Free</ButtonPrimary>
              <ButtonSecondary>Book Demo</ButtonSecondary>
            </div>
          </div>
        </div>
      </div>

      <div className={"bcgAnimeHero"}>
        <HeroAnimeComponent />
      </div>
    </>
  );
};

export default SvgAnimeUniverseRoot;
