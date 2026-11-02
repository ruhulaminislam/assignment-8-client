import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";

const CTFButton = () => {
  return (
    <TableRow>
      <TableCell colSpan={6} className="py-12 text-center">
        <p className="font-medium">No listings yet</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Studios you add will appear here.
        </p>

        <Button  className="mt-4">
          <Link href="/studios/add-studio">
            Add Studio
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CTFButton;