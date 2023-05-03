// React
import { useState, FormEvent } from "react";

// Next
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

// api
import { api } from "~/utils/api";

const ListPage = () => {
  const router = useRouter();
  const listId = router?.query?.listId as string | undefined;
  const [itemName, setItemName] = useState("");

  const { data: session, status } = useSession({
    required: true,
  });

  const addItem = api.list.addItem.useMutation({
    onSuccess: async () => {
      setItemName("");
      await itemQuery.refetch();
    },
  });

  const removeItem = api.list.removeItem.useMutation({
    onSuccess: async () => {
      await itemQuery.refetch();
    },
  });

  const itemQuery = api.list.getItems.useQuery(
    { listId: listId || "" },
    { enabled: !!listId, refetchOnWindowFocus: false }
  );

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    addItem.mutate({ name: itemName, listId: listId || "" });
  };

  const handleListDelete = (id: string) => {
    removeItem.mutate({ id });
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <main className="pt-10">
      <h1 className="mb-8 text-center text-5xl font-bold text-white">
        List Page
      </h1>
      <form className="container m-auto max-w-md" onSubmit={handleFormSubmit}>
        <input
          className="input-bordered input mb-4 w-full"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <div className="text-center">
          <button className="btn-primary btn mr-8" type="submit">
            Add Item
          </button>
          <button
            className="btn-secondary btn"
            type="button"
            onClick={() => setItemName("")}
          >
            Clear
          </button>
        </div>
      </form>

      <ul className="container m-auto mt-8 max-w-md">
        {itemQuery.data?.map((item) => {
          return (
            <li
              key={item.id}
              className="mb-4 flex items-center justify-between rounded-md bg-primary-content p-4"
            >
              <h2 className="font-bold">{item.name}</h2>
              <div className="flex items-center">
                <button
                  className="btn-outline btn-error btn"
                  onClick={() => handleListDelete(item.id)}
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

export default ListPage;
