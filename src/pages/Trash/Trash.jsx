import {
  ArrowUpRightIcon,
  EyeIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Checkbox,
} from "@material-tailwind/react";
import useGetSecureData from "../../hooks/secure/useGetSecureData";
import { useEffect, useState } from "react";
import useXiosSecure from "../../hooks/secure/useXiosSecure";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { Modal } from "../../shared/Modal/Modal";
import { TaskCard } from "../../shared/TaskCard/TaskCard";
const Trash = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false);
  const axiosSecure = useXiosSecure()
  const apiUrl = "/isTrash";
  const key = "tasks";
  const { data: tasks ,refetch} = useGetSecureData(apiUrl, key);

  useEffect(() => {
    if (selectAll) {
      const ids = tasks?.map((task) => task._id);
      setSelected(ids);
    } else {
      setSelected([]);
    }
  }, [tasks, selectAll]);

  console.log(typeof selected);
  function handleSelect(e) {
    const isChecked = e.target.checked;
    const value = e.target.value;
    if (isChecked) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter((item) => item !== value));
    }
  }
  const handleDelete = async() => {

   try {
     let willDelete = await swal({
       title: "Are you sure?",
       text: "Once deleted, you will not be able to recover!",
       icon: "warning",
       buttons: true,
       dangerMode: true,
     });

     if (willDelete) {
          const res = await axiosSecure.delete("/deleteMultiple", {
            data: { ids: selected },
          });

       if (res.data.deletedCount > 0) {
  toast.success("Deleted Forever");
         await swal("Delete successful", {
           icon: "success",
         });
         refetch();
       }
     } else {
       await swal("Your Task is safe!");
     }
   } catch (error) {
     console.log(error);
     toast.error(error.message);
   }







  };
  const TABLE_HEAD = [
    {
      key: "checkbox",
      label: (
        <Checkbox
          color="red"
          checked={selectAll}
          onChange={() => setSelectAll(!selectAll)}
        />
      ),
    },
    "Title",
    "Deadline date",
    "Deadline time",
    "Action",
  ];


  const handleRestore=async(_id)=>{
    try {
      const res = await axiosSecure.put("/taskRestore", { id: _id });
      if (res.data.modifiedCount > 0) {
        toast.success("your tasks is successfully restore form trash");
        refetch();
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <Card className="h-full w-full my-5">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Todos list
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button className="flex items-center gap-3" size="sm">
              <PlusIcon strokeWidth={2} className="h-4 w-4" /> Recover
            </Button>
          </div>
        </div>

        <Button  onClick={handleDelete} size="sm" variant="outlined" className="flex items-center justify-center gap-1 disabled:cursor-not-allowed">
          <TrashIcon color="red" className="h-4 w-4" />
          Delete Forever
        </Button>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >

                    {head.label || head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks?.map((task, index) => {
              const isLast = index === tasks.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={task._id}>
                  <td className={classes}>
                    <Checkbox
                      value={task._id}
                      checked={selected.includes(task._id)}
                      onChange={handleSelect}
                      color="red"
                    />
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      {/* <Avatar src={img} alt={name} size="sm" /> */}

                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal flex items-center"
                        >
                          <TrashIcon color="gray" className="h-4 w-4" />
                          {task?.title}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {task?.createdBy}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {task?.deadline_date}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {task?.deadline_time}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Move">
                      <IconButton onClick={()=>handleRestore(task?._id)} variant="text">
                        <ArrowUpRightIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>

                  <Modal open={open} setOpen={setOpen}>
                    <TaskCard task={task} />
                  </Modal>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
export default Trash;
