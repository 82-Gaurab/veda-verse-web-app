import Link from "next/link";

export default function RegisterForm() {
  return (
    <div className="mx-auto max-w-md-border m-2 p-4 rounded">
      <div className="m-1">
        <label className="block mb-2 font-semibold">Full Name:</label>
        <input className="p-1 border" />
      </div>
      <div className="m-1">
        <label className="block mb-2 font-semibold">Email:</label>
        <input className="p-1 border" />
      </div>

      <div className="m-1">
        <label className="block mb-2 font-semibold">Password:</label>
        <input className="p-1 border" />
      </div>
      <div className="m-1">
        <label className="block mb-2 font-semibold">Confirm Password:</label>
        <input className="p-1 border" />
      </div>
      <button className="bg-green-500 border rounded p-2 mt-2 text-white">Register</button>
      <div>
        Already have an account. 
        <Link href= "/login" className="text-blue-500 underline">Login</Link> 
      </div>
    </div>
  );
}