import Button from "./Button";
import Link from "next/link";

type TextSectionProps = {
  title: string;
  text: string;
  button?: {
    label: string;
    link?: string;
    onClick?: () => void;
    faIcon: string;
  };
};

export default function TextSection({ title, text, button }: TextSectionProps) {
  return (
    <>
      <h1 className="text-center font-serif text-3xl leading-tight font-bold text-slate-900 lg:text-right lg:text-4xl">
        {title}
      </h1>
      <div className="pb-10 lg:pb-0">
        <p className="text-md text-center leading-normal text-slate-900 lg:text-left lg:text-lg">
          {text}
        </p>
        {button && (
          <div className="flex justify-center pt-4 lg:justify-start">
            {button.link ? (
              <Link href={button.link}>
                <InternalButton
                  label={button.label}
                  onClick={button.onClick}
                  faIcon={button.faIcon}
                />
              </Link>
            ) : (
              <InternalButton
                label={button.label}
                onClick={button.onClick}
                faIcon={button.faIcon}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

function InternalButton({
  label,
  onClick,
  faIcon,
}: {
  label: string;
  onClick?: () => void;
  faIcon: string;
}) {
  return (
    <Button label={label} onClick={onClick} faIcon={faIcon} className="mt-4" />
  );
}
