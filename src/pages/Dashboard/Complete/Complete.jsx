import {
  Button,
  CardHeader,
  Tab,
  Tabs,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import { TaskCard } from "../../../shared/TaskCard/TaskCard";
import { PlusIcon } from "@heroicons/react/24/solid";
import useGetSecureData from "../../../hooks/secure/useGetSecureData";
import Loading from "../../../shared/Loading/Loading";
import { useState } from "react";
import { Modal } from "../../../shared/Modal/Modal";
import CreateTodo from "../CreateTodo/CreateTodo";

const Complete = () => {
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const apiUrl = `/tasks/complete`;
  const key = "tasks";
  const { data: tasks, isLoading, refetch } = useGetSecureData(apiUrl, key);

  if (isLoading) {
    return <Loading />;
  }

  console.log(status);
  return (
    <div>
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Completed Todo list
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              onClick={() => setOpen(true)}
              className="flex items-center gap-3"
              size="sm"
            >
              <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Todo
            </Button>
          </div>
        </div>
      </CardHeader>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {tasks?.map((task) => (
          <TaskCard
            refetch={refetch}
            setStatus={setStatus}
            key={task._id}
            task={task}
          />
        ))}
      </div>
      <Modal open={open} setOpen={setOpen}>
        <CreateTodo setOpen={setOpen} />
      </Modal>
    </div>
  );
};
export default Complete;
const TABS = [
  {
    label: "All",
    value: "all",
    status: "",
  },
  {
    label: "Ongoing",
    value: "ongoing",
    status: "ongoing",
  },
  {
    label: "Complete",
    value: "complete",
    status: "complete",
  },
];
