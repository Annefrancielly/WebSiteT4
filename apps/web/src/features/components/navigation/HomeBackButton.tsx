import Link from 'next/link';

export function HomeBackButton() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-4 sm:px-6 lg:px-8">
      <div className="flex justify-center">
        <Link
          href="/"
          aria-label="Voltar para a home"
          className="
            inline-flex items-center justify-center
            rounded-full border border-white/15
            bg-white/5 px-5 py-2.5
            text-sm font-medium uppercase tracking-[0.16em]
            text-white/85 transition-all duration-200
            hover:border-white/30 hover:bg-white/10 hover:text-white
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-white/30
          "
        >
          home
        </Link>
      </div>
    </div>
  );
}