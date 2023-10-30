import { StatsCard, Sidenav } from "@/components";

export default function Home() {
  return (
    <main>
      <Sidenav>
        <div className="grid grid-cols-3 gap-4 w-full ">
          <StatsCard title="Total Income" value={9700} net={-1.7} />
          <StatsCard title="Total Income" value={9700} net={1.7} />
          <StatsCard title="Total Income" value={9700} net={1.7} />
        </div>
      </Sidenav>
    </main>
  );
}
