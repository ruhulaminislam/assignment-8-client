 "use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { GetTokenFormClient } from "@/lib/GetTokenFormClient"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
const  StudioDlete = ({id}:{id:string}) => {
  const router = useRouter()
   const deleteStudio = async () => {
    const token = await GetTokenFormClient();
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/studios/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    if (response.ok) {
      toast .add({
            type: "success",
            description: "Studio has been deleted.",
          })
          router.refresh()
      
  }else{
      toast.add({
            type: "error",
            description: "Failed to delete the studio.",
          })
    }
  }
  return (
    <div>
      
        <AlertDialog>
      <AlertDialogTrigger render={<Button
                          type="button"
                          size="sm"
                          className="h-8 gap-1.5 border border-red-500/30 bg-red-500/10 px-3 text-red-500 hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 className="size-3.5" />
                           Delete
                        </Button>} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Studio from our servers.
          </AlertDialogDescription>

        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogCancel onClick={deleteStudio}> Continue</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
  )
}

export default  StudioDlete
