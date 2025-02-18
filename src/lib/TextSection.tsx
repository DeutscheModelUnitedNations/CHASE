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
			<h1 className="text-3xl lg:text-4xl font-bold font-serif text-center lg:text-right text-slate-900 leading-tight">
				{title}
			</h1>
			<div className="pb-10 lg:pb-0">
				<p className="text-md lg:text-lg text-center lg:text-left text-slate-900 leading-normal">
					{text}
				</p>
				{button && (
					<div className="pt-4 flex justify-center lg:justify-start">
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
}: { label: string; onClick?: () => void; faIcon: string }) {
	return (
		<Button label={label} onClick={onClick} faIcon={faIcon} className="mt-4" />
	);
}
