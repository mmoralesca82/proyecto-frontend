import LoginFormCredencials from "./components/LoginFormCredencials";

export default function Home() {
  return (
    <main className="container w-[400px] h-screen mx-auto space-y-4 flex flex-col justify-center">
      <div className="mx-auto flex w-full flex-col justify-center p-8">
        <LoginFormCredencials />
      </div>
    </main>
  );
}
