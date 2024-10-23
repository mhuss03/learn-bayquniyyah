import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <h3>Please choose an option</h3>
        </div>
        <div className="flex flex-col gap-4">
          <Link
            to="/bayquniyyah"
            className="w-full py-4 text-lg bg-black rounded-md text-white text-center font-semibold"
          >
            Bayquniyyah
          </Link>
          <Link
            to="/arbaeen"
            className="w-full py-4 text-lg rounded-md font-semibold bg-white border-2 text-center"
          >
            Arba'een
          </Link>
        </div>
      </div>
    </div>
  );
}
