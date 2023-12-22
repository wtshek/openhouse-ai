import { Card } from "@/components/Card";
import { Loading } from "@/components/Loading";
import { Error } from "@/components/Error";
import { useFetchData } from "@/hooks/useFetchData";

function App() {
  const { isLoading, hasError, data } = useFetchData();

  if (isLoading) return <Loading />;

  if (hasError) return <Error />;

  return (
    <div className="p-8">
      <h1 className="text-center pb-8 text-3xl">Communities</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data?.communities.map((community) => (
          <Card key={community.id} data={community} />
        ))}
      </div>
    </div>
  );
}

export default App;
