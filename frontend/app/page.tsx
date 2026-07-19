import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="p-8 space-y-4">
      <Card className="p-4">
        <Input placeholder="Test task title" />
      </Card>
      <Button>Add Task</Button>
    </div>
  );
}