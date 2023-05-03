// React
import { type FormEvent, useState } from "react";

// Next
import { useSession } from "next-auth/react";
import Link from "next/link";

// api
import { api } from "~/utils/api";

const Home = () => {
  const { data: session, status } = useSession({
    required: true,
  });

  const [listName, setListName] = useState("");

  const createList = api.list.create.useMutation({
    onSuccess: async () => {
      setListName("");
      await listQuery.refetch();
    },
  });

  const deleteList = api.list.deleteOne.useMutation({
    onSuccess: async () => {
      await listQuery.refetch();
    },
  });

  const listQuery = api.list.getAll.useQuery();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    createList.mutate({ name: listName });
  };

  const handleListDelete = (id: string) => {
    deleteList.mutate({ id });
  };

  return (
    <main className="min-h-screen pt-10">
      <h1 className="mb-8 text-center text-5xl font-bold text-white">
        My Lists
      </h1>
      <form className="container m-auto max-w-md" onSubmit={handleFormSubmit}>
        <input
          className="input-bordered input mb-4 w-full"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <div className="text-center">
          <button className="btn-primary btn mr-8" type="submit">
            Add List
          </button>
          <button
            className="btn-secondary btn"
            type="button"
            onClick={() => setListName("")}
          >
            Clear
          </button>
        </div>
      </form>

      <ul className="container m-auto mt-8 max-w-md">
        {listQuery.data?.map((list) => {
          return (
            <li
              key={list.id}
              className="mb-4 flex items-center justify-between rounded-md bg-primary-content p-4"
            >
              <h2 className="font-bold">{list.name}</h2>
              <div className="flex items-center">
                <Link
                  className="btn-outline btn mr-4"
                  href={`/list/${list.id}`}
                >
                  View
                </Link>

                <button
                  className="btn-outline btn-error btn"
                  onClick={() => handleListDelete(list.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Home;
