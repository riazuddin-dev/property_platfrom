import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center px-5">

      <div className="text-center">

        <h1 className="text-9xl font-black text-teal-600">
          404
        </h1>

        <h2 className="text-4xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="text-slate-500 mt-4 max-w-md mx-auto">
          Sorry, the page you are looking for
          doesn't exist or has been moved.
        </p>

        <Link
          href="/"
          className="
          inline-flex
          mt-8
          bg-teal-600
          hover:bg-teal-700
          text-white
          px-8
          py-3
          rounded-2xl
          font-semibold
          transition-all
          "
        >
          Back To Home
        </Link>

      </div>

    </div>
  );
}