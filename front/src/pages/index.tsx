export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-center">
          Welcome to <span className="text-blue-500">Next.js</span>
        </h1>
        <p className="text-2xl text-center mt-4">
          Get started by editing{" "}
          <code className="bg-gray-200 p-2 rounded-md">pages/index.tsx</code>
        </p>
      </div>
    </main>
  );
}
