import { Link } from "react-router";

export function HomePage() {
  const routes = [
    {
      path: "/tuner",
      name: "Tuner",
      description: "Tune your flute with the built-in tuner",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
        >
          <path d="M9 2v6m6-6v6" />
          <path d="M9 16v6m6-6v6" />
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 10h6" />
        </svg>
      ),
    },
    {
      path: "/game",
      name: "Note Game",
      description: "Practice playing notes and improve your skills",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      ),
    },
    {
      path: "/fingerings",
      name: "Fingerings",
      description: "Interactive flute fingering chart",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
        >
          <path d="M12 2v20" />
          <path d="M2 12h20" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
  ];

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Flute Hero
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Learn and practice flute with interactive tools
          </p>
        </header>
        <div className="max-w-[500px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <p className="leading-6 text-gray-700 dark:text-gray-200 text-center font-semibold">
              Choose a tool:
            </p>
            <ul className="space-y-2">
              {routes.map(({ path, name, description, icon }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="group flex items-center gap-4 self-stretch p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex-shrink-0">{icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-500">
                        {name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {description}
                      </div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400 group-hover:text-blue-700 dark:group-hover:text-blue-500"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}
