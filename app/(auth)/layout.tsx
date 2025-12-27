import Image from "next/image";


export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <section className="flex flex-col min-h-screen items-center bg-[url(/images/bg.jpg)] bg-cover bg-no-repeat bg-center">
      <div className="flex flex-col gap-1.5 items-center mt-10" >
        <Image src="/icons/logo.png" height={130} width={130} alt="logo"/>
        {children}
      </div>
    </section>
  );
}