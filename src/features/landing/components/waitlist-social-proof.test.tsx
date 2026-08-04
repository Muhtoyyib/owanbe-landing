import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { WaitlistSocialProof } from "./waitlist-social-proof"

/**
 * The component joins the number to its label with a non-breaking space so they
 * can't wrap apart, so assertions compare against normalized whitespace.
 */
const textOf = (element: HTMLElement) =>
  element.textContent.replace(/\u00a0/g, " ")

describe("WaitlistSocialProof", () => {
  it("shows a loading affordance and no number while the count is in flight", () => {
    const { container } = render(
      <WaitlistSocialProof count={{ status: "loading" }} />
    )

    expect(screen.getByText("Loading waitlist count")).toBeTruthy()
    // The whole point of the fix: no figure is shown before the real one.
    expect(container.textContent).not.toMatch(/\d/)
  })

  it("renders nothing readable when the count is unavailable", () => {
    const { container } = render(
      <WaitlistSocialProof count={{ status: "unavailable" }} />
    )

    expect(container.textContent).toBe("")
  })

  it("renders the real count, thousands-separated", () => {
    const { container } = render(
      <WaitlistSocialProof count={{ status: "ready", total: 2431 }} />
    )

    expect(textOf(container)).toContain("2,431 people already waiting")
  })

  it("uses the singular for a count of one", () => {
    const { container } = render(
      <WaitlistSocialProof count={{ status: "ready", total: 1 }} />
    )

    expect(textOf(container)).toContain("1 person already waiting")
  })

  it("keeps every state the same height so the line cannot shift layout", () => {
    const heightOf = (count: Parameters<typeof WaitlistSocialProof>[0]) =>
      render(<WaitlistSocialProof {...count} />).container.firstElementChild
        ?.className

    expect(heightOf({ count: { status: "loading" } })).toContain("h-5")
    expect(heightOf({ count: { status: "unavailable" } })).toContain("h-5")
    expect(heightOf({ count: { status: "ready", total: 12 } })).toContain("h-5")
  })
})
