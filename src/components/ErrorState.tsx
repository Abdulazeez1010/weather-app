import React from "react";

import type { ErrorStateProps } from "../types/weather";

import ErrorIcon from '../assets/images/icon-error.svg'
import RetryIcon from '../assets/images/icon-retry.svg'


const ErrorState: React.FC<ErrorStateProps> = ({
	title,
	message,
	actionLabel,
	onAction,
}) => {
	return (
		<div className="mx-auto flex max-w-md flex-col items-center rounded-2xl bg-[hsl(243,27%,16%)] p-8 text-center text-white">
			<img src={ErrorIcon} alt="" className="mb-4 h-12 w-12"/>
			<h2 className="mb-2 text-2xl font-semibold">{title}</h2>
			<p className="mb-6 text-sm text-white/70">{message}</p>
			<button
				type="button"
				onClick={onAction}
				className="flex items-center gap-2 rounded-lg bg-[hsl(233,67%,56%)] px-4 py-2 text-white transiton hover:bg-[hsl(243,27%,26%)]"
			>
				<img src={RetryIcon} alt="" className="h-4 w-4"/>
				<span>{actionLabel}</span>
			</button>
		</div>
	);
};

export default ErrorState;