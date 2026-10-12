/** Title + reassurance copy at the top of the waitlist card. */
export function WaitlistCardHeader() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-strong font-display text-card-title leading-tight font-normal tracking-wide trim-cap">Join the waitlist</h3>
      <p className="text-sm text-soft">We'll reach out when your city goes live. No noise, only what matters.</p>
    </div>
  );
}
