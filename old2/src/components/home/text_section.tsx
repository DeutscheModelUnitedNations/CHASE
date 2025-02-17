import React from "react";
import Button from "../button";
import { useRouter } from "next/navigation";

type TextSectionProps = {
  title: string;
  text: string;
  button?: {
    lable: string;
    link?: string;
    onClick?: () => void;
    faIcon: string;
  };
};

export default function TextSection({ title, text, button }: TextSectionProps) {
  const Router = useRouter();

  return (
    <>
      <h1 className="text-3xl lg:text-4xl font-bold font-serif text-center lg:text-right text-slate-900 leading-tight">
        {title}
      </h1>
      <div className="pb-10 lg:pb-0">
        <p className="text-md lg:text-lg text-center lg:text-left text-slate-900 leading-normal">
          {text}
        </p>
        {button && (
          <div className="pt-4 flex justify-center lg:justify-start">
            <Button
              label={button.lable}
              onClick={() => {
                if (button.onClick) {
                  button.onClick();
                  return;
                }
                if (button.link) {
                  Router.push(button.link);
                  return;
                }
                throw new Error("No link or onClick function provided");
              }}
              faIcon={button.faIcon}
              className="mt-4"
            />
          </div>
        )}
      </div>
    </>
  );
}
