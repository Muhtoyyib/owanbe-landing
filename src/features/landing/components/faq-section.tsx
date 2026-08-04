import { Accordion } from "@base-ui/react/accordion"

import { Container } from "./container"
import { FaqItem } from "./faq-item"
import { SectionHeader } from "./section-header"
import { FAQS } from "../data"

/**
 * FAQ section: shared heading + a stacked list of collapsible entries.
 */
export function FaqSection() {
  return (
    <section id="faq" className="py-16 md:py-24">
      <Container>
        <SectionHeader
          eyebrow="COMMON QUESTIONS"
          title="Quick answers"
          align="center"
        />
        {/* No `multiple` prop → only one item open at a time; opening a new
            entry automatically closes the previously open one. */}
        <Accordion.Root className="mx-auto mt-10 flex max-w-3xl flex-col gap-1">
          {FAQS.map((item) => (
            <FaqItem key={item.id} item={item} />
          ))}
        </Accordion.Root>
      </Container>
    </section>
  )
}
