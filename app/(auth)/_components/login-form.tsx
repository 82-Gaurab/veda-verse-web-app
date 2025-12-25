import Link from "next/link";


export default function LoginForm() {
  return (
    <div className="mx-auto max-w-md-border m-2 p-4 rounded">
      <div className="m-1">
        <label className="block mb-2 font-semibold">Email:</label>
        <input className="p-1 border" />
      </div>

      <div className="m-1">
        <label className="block mb-2 font-semibold">Password:</label>
        <input className="p-1 border" />
      </div>
      <button className="bg-green-500 border rounded p-2 mt-2 text-white">Login</button>
      <div>
        Create an account. 
        <Link href= "/register" className="text-blue-500 underline"> Register</Link> 
      </div>
    </div>
  );
}

