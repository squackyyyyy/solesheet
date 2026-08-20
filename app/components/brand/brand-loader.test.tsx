import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BrandLoader } from "@/app/components/brand/brand-loader";

describe("BrandLoader", () => {
  it("defaults to an accessible light-surface loading state", () => {
    const { container } = render(<BrandLoader label="Loading product preview" />);

    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("data-state", "loading");
    expect(status).toHaveAttribute("data-background", "light");
    expect(screen.getByText("Loading product preview")).toHaveClass("sr-only");

    const mark = screen.getByTestId("brand-loader-mark");
    expect(mark).toHaveAttribute("aria-hidden", "true");
    expect(mark).toHaveAttribute("focusable", "false");
    expect(mark).toHaveAttribute("viewBox", "0 0 512 512");
    expect(container.querySelector("svg title")).not.toBeInTheDocument();
  });

  it("supports a caller-owned success status on a dark surface", () => {
    render(
      <BrandLoader
        state="success"
        background="dark"
        label="Survey submitted"
        className="consumer-size"
      />,
    );

    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("data-state", "success");
    expect(status).toHaveAttribute("data-background", "dark");
    expect(status).toHaveClass("consumer-size");
    expect(screen.getByText("Survey submitted")).toHaveClass("sr-only");
    expect(status.querySelector('[data-layer="success-cue"]')).toBeInTheDocument();
  });

  it("supports a decorative presentation without duplicate status semantics", () => {
    const { container } = render(
      <BrandLoader state="success" background="light" decorative />,
    );

    const presentation = container.firstElementChild;
    expect(presentation).toHaveAttribute("aria-hidden", "true");
    expect(presentation).toHaveAttribute("data-state", "success");
    expect(presentation).toHaveAttribute("data-background", "light");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(container.querySelector(".sr-only")).not.toBeInTheDocument();
    expect(screen.getByTestId("brand-loader-mark")).toHaveAttribute(
      "viewBox",
      "0 0 512 512",
    );
  });

  it("preserves the canonical mark geometry as named decorative layers", () => {
    const { container } = render(<BrandLoader label="Loading" />);

    expect(container.querySelector('[data-layer="shoe-fill"]')).toHaveAttribute(
      "d",
      "M48 288c0-28 20-52 54-65 57 0 98-8 136-34l37-26c16-11 39-8 50 9l29 40c9 13 22 22 37 25l61 18c25 8 39 24 39 47 0 24-19 42-46 42H114c-42 0-66-22-66-53Z",
    );
    expect(container.querySelector('[data-layer="shoe-grid"] path:first-child')).toHaveAttribute(
      "d",
      "M98 140v230M160 140v230M222 140v230M284 140v230M346 140v230M408 140v230",
    );
    expect(container.querySelector('[data-layer="shoe-grid"] path:last-child')).toHaveAttribute(
      "d",
      "M28 217h490M28 261h490M28 305h490",
    );
    expect(container.querySelector('[data-layer="sole"]')).toHaveAttribute("d", "M52 299h435");
    expect(container.querySelectorAll('[data-layer="eyelets"] circle')).toHaveLength(6);
    expect(container.querySelector('[data-layer="laces"]')).toHaveAttribute(
      "d",
      "M271 184l25 37M271 212l25-19M296 193l25 37M296 221l25-19",
    );
  });

  it("uses unique clip identifiers and matching references for every instance", () => {
    const { container } = render(
      <>
        <BrandLoader label="Loading first preview" />
        <BrandLoader label="Loading second preview" background="dark" />
      </>,
    );

    const clips = Array.from(container.querySelectorAll("clipPath"));
    const grids = Array.from(container.querySelectorAll('[data-layer="shoe-grid"]'));
    expect(clips).toHaveLength(2);
    expect(grids).toHaveLength(2);
    expect(clips[0]?.id).toBeTruthy();
    expect(clips[1]?.id).toBeTruthy();
    expect(clips[0]?.id).not.toBe(clips[1]?.id);
    expect(grids[0]).toHaveAttribute("clip-path", `url(#${clips[0]?.id})`);
    expect(grids[1]).toHaveAttribute("clip-path", `url(#${clips[1]?.id})`);
  });
});
