import Link from "next/link";
import Image from "next/image";
import Splitter from "./Splitter";
import { IHero } from "../@types/generated/contentful";

type HeroProps = IHero;

export function Hero({
  fields: { title, description, buttonText, image, buttonLinkSlug },
}: HeroProps) {
  return (
    <>
      <div className="pt-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left min-h-500">
            <p className="uppercase tracking-loose w-full">This is a Uniform demo</p>
            <h1 className="my-4 text-5xl font-bold leading-tight">{title}</h1>
            <p className="leading-normal text-2xl mb-8">{description}</p>
            {buttonText && buttonLinkSlug && (
              <Link href={buttonLinkSlug}>
                <a className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg">
                  {buttonText}
                </a>
              </Link>
            )}
          </div>
          <div className="w-full md:w-3/5 py-6 text-center">
            {image?.fields?.file?.url && (
              <Image
                className="w-full md:w-4/5 z-50"
                src={`https:${image.fields.file.url}`}
                alt={buttonText || "Hero Image"}
                width={image.fields.file.details?.image?.width || 500}
                height={image.fields.file.details?.image?.height || 500}
              />
            )}
          </div>
        </div>
      </div>
      <Splitter />
    </>
  );
}
