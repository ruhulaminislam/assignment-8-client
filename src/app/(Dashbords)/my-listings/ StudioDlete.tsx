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
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
const  StudioDlete = ({id}:{id:string}) => {
  const router = useRouter()
   const deleteStudio = async () => {
    const response = await fetch(`http://localhost:5000/studios/${id}`, {
      method: "DELETE",
    })
    if (response.ok) {
      toast .add({
            type: "success",
            description: "Studio has been deleted.",
          })
          router.refresh()
      
  }}
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
