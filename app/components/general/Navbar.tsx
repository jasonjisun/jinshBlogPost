import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  let user = null;

  try {
    user = await getUser();
  } catch (err) {
    console.error("Failed to fetch Kinde user:", err);
  }

  return (
    <nav className="flex items-center justify-between py-5">
      <div className="flex items-center gap-6">
        <Link href="/">
          <h1 className="text-3xl font-semibold">
            blog<span className="text-blue-500">Marshal</span>
          </h1>
        </Link>
        <div className="hidden items-center gap-6 sm:flex">
          <Link className="text-sm font-medium transition-colors hover:text-blue-500" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium transition-colors hover:text-blue-500" href="/dashboard">
            Dashboard
          </Link>
        </div>
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          <p>{user.given_name}</p>
          <LogoutLink className={buttonVariants({ variant: "secondary" })}>
            Logout
          </LogoutLink>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <LoginLink className={buttonVariants()}>Login</LoginLink>
          <RegisterLink className={buttonVariants({ variant: "secondary" })}>
            Sign up
          </RegisterLink>
        </div>
      )}
    </nav>
  );
}
