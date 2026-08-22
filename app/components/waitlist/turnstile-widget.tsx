"use client";

import Script from "next/script";
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
} from "react";
import {
	TURNSTILE_ACTION,
	TURNSTILE_RESPONSE_FIELD,
	TURNSTILE_WIDGET_ID,
} from "@/app/lib/turnstile";

type TurnstileWidgetId = string;

type TurnstileRenderOptions = {
	sitekey: string;
	action: string;
	appearance: "interaction-only";
	size: "flexible";
	theme: "auto";
	retry: "auto";
	"refresh-expired": "auto";
	"refresh-timeout": "auto";
	"response-field": true;
	"response-field-name": string;
	callback: (token: string) => void;
	"error-callback": () => boolean;
	"expired-callback": () => void;
	"timeout-callback": () => void;
};

type TurnstileApi = {
	render: (
		container: HTMLElement,
		options: TurnstileRenderOptions,
	) => TurnstileWidgetId;
	reset: (widgetId: TurnstileWidgetId) => void;
	remove: (widgetId: TurnstileWidgetId) => void;
};

declare global {
	interface Window {
		turnstile?: TurnstileApi;
	}
}

export type TurnstileWidgetHandle = {
	reset: () => void;
};

type TurnstileWidgetProps = {
	siteKey: string;
	onTokenChange: (token: string) => void;
	onUnavailable: () => void;
};

const TURNSTILE_SCRIPT_URL =
	"https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export const TurnstileWidget = forwardRef<
	TurnstileWidgetHandle,
	TurnstileWidgetProps
>(function TurnstileWidget(
	{ siteKey, onTokenChange, onUnavailable },
	forwardedRef,
) {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const widgetIdRef = useRef<TurnstileWidgetId | null>(null);
	const callbacksRef = useRef({ onTokenChange, onUnavailable });
	callbacksRef.current = { onTokenChange, onUnavailable };

	const renderWidget = useCallback(() => {
		if (!siteKey || !containerRef.current || !window.turnstile) return;
		if (widgetIdRef.current !== null) return;

		widgetIdRef.current = window.turnstile.render(containerRef.current, {
			sitekey: siteKey,
			action: TURNSTILE_ACTION,
			appearance: "interaction-only",
			size: "flexible",
			theme: "auto",
			retry: "auto",
			"refresh-expired": "auto",
			"refresh-timeout": "auto",
			"response-field": true,
			"response-field-name": TURNSTILE_RESPONSE_FIELD,
			callback(token) {
				callbacksRef.current.onTokenChange(token);
			},
			"error-callback"() {
				callbacksRef.current.onTokenChange("");
				callbacksRef.current.onUnavailable();
				return true;
			},
			"expired-callback"() {
				callbacksRef.current.onTokenChange("");
			},
			"timeout-callback"() {
				callbacksRef.current.onTokenChange("");
				callbacksRef.current.onUnavailable();
			},
		});
	}, [siteKey]);

	useEffect(() => {
		renderWidget();
		if (!siteKey) callbacksRef.current.onUnavailable();

		return () => {
			if (widgetIdRef.current !== null && window.turnstile) {
				window.turnstile.remove(widgetIdRef.current);
				widgetIdRef.current = null;
			}
		};
	}, [renderWidget, siteKey]);

	useImperativeHandle(
		forwardedRef,
		() => ({
			reset() {
				callbacksRef.current.onTokenChange("");
				if (widgetIdRef.current !== null && window.turnstile) {
					window.turnstile.reset(widgetIdRef.current);
				}
			},
		}),
		[],
	);

	return (
		<>
			<Script
				id="cloudflare-turnstile"
				src={TURNSTILE_SCRIPT_URL}
				strategy="afterInteractive"
				onLoad={renderWidget}
				onReady={renderWidget}
				onError={() => callbacksRef.current.onUnavailable()}
			/>
			<div
				id={TURNSTILE_WIDGET_ID}
				ref={containerRef}
				data-turnstile-widget="true"
				className="w-full max-w-full"
			/>
		</>
	);
});
