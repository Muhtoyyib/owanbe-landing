import {Accordion} from "@base-ui/react/accordion";

import {cn} from "cn";

import type {FaqItem as FaqItemData} from "../types";

interface FaqItemProps {
  item: FaqItemData;
}

/**
 * A single accordion entry. Open entries become a filled rounded card; closed
 * entries are plain rows separated by a divider. The divider is a straight
 * full-width rule drawn as an ::after pseudo-element (not a border on the
 * rounded item, which would curve at the corners). It is hidden after the last
 * row and on the open card. The panel height and the plus/minus icon both
 * animate. Single-open behaviour (opening one closes the others) is handled by
 * the parent <Accordion.Root> in faq-section.
 */
export function FaqItem({item}: FaqItemProps) {
  return (
    <Accordion.Item
      value={item.id}
      className={cn(
        "relative rounded-lg transition-colors duration-300 data-[open]:bg-muted",
        "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-border after:content-['']",
        "last:after:hidden data-[open]:after:hidden"
      )}
    >
      <Accordion.Header>
        <Accordion.Trigger className="group/faq flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left outline-none">
          <span
            className={cn(
              "text-base text-muted-foreground transition-colors duration-300",
              "group-data-[panel-open]/faq:font-medium group-data-[panel-open]/faq:text-foreground"
            )}
          >
            {item.question}
          </span>

          {/* Plus that morphs into a minus: the vertical bar collapses when open. */}
          <span className="relative size-5 shrink-0 text-muted-foreground">
            <span className="absolute top-1/2 left-1/2 h-0.5 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
            <span className="absolute top-1/2 left-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-transform duration-300 ease-out group-data-[panel-open]/faq:scale-y-0" />
          </span>
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Panel
        className={cn(
          "h-[var(--accordion-panel-height)] overflow-hidden transition-[height] duration-300 ease-out",
          "data-[starting-style]:h-0 data-[ending-style]:h-0"
        )}
      >
        <p className="px-6 pb-5 text-base leading-relaxed text-muted-foreground">{item.answer}</p>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
