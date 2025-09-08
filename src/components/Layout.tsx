export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <h1>Pet Sanctuary</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
