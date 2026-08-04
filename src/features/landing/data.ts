import {
  BadgePercent,
  MapPin,
  MessagesSquare,
  Rocket,
} from "lucide-react"

import type { Benefit, FaqItem, NavLink, Role, VenueCard } from "./types"
import Horizon from "@/components/assets/images/horizon-1.svg"
import Disk from "@/components/assets/images/disk.svg"
import Horizon2 from "@/components/assets/images/horizon-2.svg"
import Abj from "@/components/assets/images/abuj.svg"
import Food from "@/components/assets/images/food.svg"


export const NAV_LINKS: Array<NavLink> = [
  { label: "About", href: "#why" },
  { label: "FAQs", href: "#faq" },
  { label: "Reserve Spot", href: "#waitlist" },
]

export const HERO_VENUES: Array<VenueCard> = [
  {
    id: "horizon-hall-1",
    name: "Horizon Hall",
    location: "ABUJA",
    price: "₦420K",
    image: Horizon,
  },
  {
    id: "disk-jockey",
    name: "Disk Jockey",
    location: "IBADAN",
    image: Disk,
  },
  {
    id: "horizon-hall-2",
    name: "Horizon Hall",
    location: "ABUJA",
    price: "₦420K",
    image: Horizon2,
    featured: true,
  },
  {
    id: "red-carpet-hall",
    name: "Red Carpet Hall",
    location: "ABUJA",
    price: "₦420K",
    image: Abj,
  },
  {
    id: "food-caterer",
    name: "Food Caterer",
    location: "ABUJA",
    image: Food,
  },
]

export const BENEFITS: Array<Benefit> = [
  {
    id: "launch-benefits",
    icon: BadgePercent,
    title: "Exclusive launch benefits",
    description:
      "Early members unlock pricing and features not available to the public at launch.",
  },
  {
    id: "priority-onboarding",
    icon: Rocket,
    title: "Priority onboarding",
    description:
      "Skip the queue. You'll be among the first to access the platform when we launch.",
  },
  {
    id: "shape-product",
    icon: MessagesSquare,
    title: "Shape the product",
    description:
      "We'll reach out directly for feedback. Your ideas influence what we build next.",
  },
  {
    id: "first-in-city",
    icon: MapPin,
    title: "First in your city",
    description:
      "Help us understand which cities to launch in first. Your location matters.",
  },
]

/**
 * Ids are the API's `whoYouAre` enum values verbatim (snake_case) so they can be
 * submitted without translation — the endpoint 400s on anything else.
 */
export const ROLES: Array<Role> = [
  { id: "venue_owner", label: "Venue owner" },
  { id: "event_planner", label: "Event planner" },
  { id: "individual", label: "Individual" },
  { id: "couple", label: "Couple" },
  { id: "corporate", label: "Corporate" },
  { id: "others", label: "Others" },
]

export const FAQS: Array<FaqItem> = [
  {
    id: "when-launch",
    question: "When are you launching?",
    answer:
      "We're launching first in Lagos, Ibadan, Abuja, and Port Harcourt. Waitlist members will be the first to know the exact date.",
  },
  {
    id: "cost",
    question: "Is joining free?",
    answer:
      "Yes. Joining the waitlist is completely free and comes with no obligation.",
  },
  {
    id: "early-access",
    question: "How does early access work?",
    answer:
      "Waitlist members get priority onboarding, exclusive launch pricing, and a direct line to shape the product before it goes public.",
  },
  {
    id: "what-signup",
    question: "What should I sign up for?",
    answer:
      "Sign up with the role that best describes you so we can tailor your early access experience.",
  },
  {
    id: "data",
    question: "Can I book resources?",
    answer:
      "Once we launch in your city, you'll be able to discover, compare, and book venues and vendors all in one place.",
  },
]

export const CONTACT_EMAIL = "hello@owambespace.com"
export const BRAND_NAME = "Owambe Space"
export const LAUNCH_CITIES = "Lagos, Ibadan, Abuja, and Port Harcourt"
