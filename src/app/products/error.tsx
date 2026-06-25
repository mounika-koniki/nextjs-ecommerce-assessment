"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  return (
    <section className="error-container">
      <h1>Something went wrong</h1>

      <p>
        We could not load the products. Please try again.
      </p>

      <button
        type="button"
        className="primary-button"
        onClick={() => reset()}
      >
        Retry
      </button>
    </section>
  );
}