/* eslint-disable @next/next/no-img-element */
// Next
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data } = useSession();

  return (
    <nav className="navbar fixed bg-base-300">
      <div className="flex-1">
        <Link href="/" className="btn-ghost btn text-xl normal-case">
          T3 List App
        </Link>
      </div>
      {data?.user && (
        <div className="flex-none gap-2">
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                <img src={data?.user.image || ""} alt={data?.user.name || ""} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-200 p-2 shadow"
            >
              <li>
                <a onClick={() => void signOut()}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
