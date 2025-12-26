export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <section>
      <div className="flex border w-fit">
        {children}
      </div>
    </section>
  );
}