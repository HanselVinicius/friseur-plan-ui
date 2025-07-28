"use client";
import { useSession, signIn, signOut } from "next-auth/react"
import Logout from "./component/Logout";
import Login from "./component/Login";

export default function Home() {
  const { data: session } = useSession()

   if (session) {
    return <div>
      <div>Your name is {session.user?.name}</div>
      <div><Logout /> </div>
    </div>
  }
  return (
    <div>
      <Login />
    </div>
  )
}
