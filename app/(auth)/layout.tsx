import Image from "next/image";


export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <section>
      <div className="flex flex-col border min-h-screen justify-center items-center bg-[url(/images/bg.jpg)] bg-cover bg-no-repeat bg-center" >
        <Image src="/icons/logo.png" height={150} width={150} alt="logo"/>
        {children}
      </div>
    </section>
  );
}