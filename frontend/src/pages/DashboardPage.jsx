import { weeklyActivity } from "../data/dashboardData";
import { useTasks } from "../context/TaskContext";
import RecentTasks from "../components/RecentTasks";
import StatCard from "../components/StatCard";
import TaskActivity from "../components/TaskActivity";
import TeamWorkload from "../components/TeamWorkload";

function DashboardPage() {
  const { stats, tasks, team } = useTasks();

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
        <TaskActivity tasks={tasks} weeklyActivity={weeklyActivity} />
        <TeamWorkload team={team} />
      </section>

      <RecentTasks tasks={tasks.slice(0, 4)} />
    </>
  );
}

export default DashboardPage;
