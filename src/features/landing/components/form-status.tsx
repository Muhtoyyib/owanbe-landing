interface FormStatusProps {
  id: string;
  message: string | null;
  className?: string;
}

/**
 * aria-live announces the outcome without stealing focus. Only rendered once
 * there is something to say, so screen readers don't announce an empty node.
 */
export function FormStatus({id, message, className}: FormStatusProps) {
  if (!message) return null;
  return (
    <p id={id} role="status" aria-live="polite" className={className}>
      {message}
    </p>
  );
}
