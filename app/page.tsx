import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export default function Home() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <Button variant='outline' size='icon'>
        <Camera />
      </Button>
    </div>
  );
}
