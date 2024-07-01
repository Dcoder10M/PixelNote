import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="bg-indigo-900 relative overflow-hidden h-screen">
      <img
        src="https://external-preview.redd.it/4MddL-315mp40uH18BgGL2-5b6NIPHcDMBSWuN11ynM.jpg?width=960&crop=smart&auto=webp&s=b98d54a43b3dac555df398588a2c791e0f3076d9"
        className="absolute h-full w-full object-cover"
      />
      <div className="inset-0 bg-black opacity-25 absolute"></div>
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-center items-center h-full">
        <div className="font-mono text-center">
          <h1 className="font-extrabold text-5xl text-white leading-tight">
            You are all alone here
          </h1>
          <p className="font-extrabold text-8xl mt-6 text-white animate-bounce">
            404
          </p>
          <Link
            to="/"
            className="mt-8 h-16 inline-flex animate-shimmer items-center justify-center rounded-sm border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-0 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-64"
          >
            Get Back Home &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
