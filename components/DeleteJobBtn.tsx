import { deleteJobAction } from "@/utils/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "./ui/button";

const DeleteJobBtn = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast.error("there was an error");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });
      toast.success("job deleted");
    },
  });

  return (
    <Button
      className='cursor-pointer'
      size='sm'
      disabled={isPending}
      onClick={() => {
        mutate(id);
      }}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteJobBtn;
