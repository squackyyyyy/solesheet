export function PreviewDisclosure({ className = "" }: { className?: string }) {
	return (
		<p
			data-testid="preview-disclosure"
			className={`inline-flex rounded-full border border-[#14213d]/12 bg-white/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#14213d]/65 ${className}`}
		>
			Illustrative sample data · Planned product preview
		</p>
	);
}
