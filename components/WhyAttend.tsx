import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IWhyAttend } from "../@types/generated/contentful";
import { Asset } from "contentful";

enum WhyAttendVariant {
  Left = "left image",
  Right = "right image",
}

type WhyAttendProps = IWhyAttend & {
  variant: WhyAttendVariant;
};

export const WhyAttend = ({ fields }: WhyAttendProps) => {
  const { title, description, image, alignToTheLeft } = fields || {};
  if (!title || !description || !image) {
    return null;
  }

  const variant = alignToTheLeft ? WhyAttendVariant.Left : WhyAttendVariant.Right;

  return (
    <section className="bg-white border-b py-8">
      <div className="container max-w-5xl mx-auto m-8">
        <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
          {title}
        </h1>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
        </div>
        <ImageCallout description={description} image={image} variant={variant} />
      </div>
    </section>
  );
};

type CalloutProps = {
  description: string;
  image: Asset;
  variant: WhyAttendVariant;
};

const getLabelStyle = (variant: WhyAttendVariant) => {
  switch (variant) {
    case WhyAttendVariant.Left:
      return "bg-green-100 text-green-800";
    case WhyAttendVariant.Right:
      return "bg-red-800 text-white";
    default:
      return "bg-blue-800 text-white";
  }
};

const ImageCallout = ({ description, image, variant }: CalloutProps) => {
  const labelStyle = getLabelStyle(variant);

  return (
    <div className={`flex flex-wrap ${variant === WhyAttendVariant.Left ? 'flex-row-reverse' : ''}`}>
      <div className="w-full sm:w-1/2 p-6 mt-6">
        <ImageComponent image={image} />
      </div>
      <div className="w-full sm:w-1/2 p-6 mt-6">
        <div className="align-middle">
          <span
            className={`mb-8 px-6 inline-flex text-xs leading-5 font-semibold rounded-full ${labelStyle}`}
          >
            {variant} variant
          </span>
          <p className="text-gray-600 mb-8" dangerouslySetInnerHTML={{ __html: description }} />
          <Link prefetch={false} href="/registration">
            <button className="mx-auto lg:mx-0 hover:underline bg-green-800 text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg">
              Register now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ImageComponent = ({ image }: { image: Asset }) => {
  return image?.fields?.file?.url ? (
    <Image
      src={`https:${image.fields.file.url}`}
      layout="responsive"
      loading="lazy"
      className="w-full sm:h-64 mx-auto"
      height={373}
      width={560}
      alt="why attend image"
    />
  ) : null;
};
