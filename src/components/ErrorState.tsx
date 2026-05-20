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
		<div className="mx-auto flex flex-col items-center rounded-2xl p-8 text-center text-white">
			<img src={ErrorIcon} alt="" className="mb-4 h-8 w-8"/>
			<h2 className="mb-2 text-4xl font-semibold">{title}</h2>
			<p className="mb-6 max-w-xs text-xs text-white/70">{message}</p>
			<button
				type="button"
				onClick={onAction}
				className="flex items-center gap-2 rounded bg-[hsl(243,27%,16%)] px-3 py-1.5 text-white transiton hover:bg-[hsl(243,27%,26%)]"
			>
				<img src={RetryIcon} alt="" className="h-3 w-3"/>
				<span className="text-xs">{actionLabel}</span>
			</button>
		</div>
	);
};

export default ErrorState;