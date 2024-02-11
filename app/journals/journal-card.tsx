import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Journal } from "@/data/types";
import { formatTimestamp, truncateString } from "@/lib/utils";

export default function JournalCard({ title, content, createdAt }: Journal) {
  return (
    <Card key={title} className="h-40 cursor-pointer">
      <CardHeader>
        <CardTitle className="text-xl">
          {truncateString(title, 18)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {truncateString(content, 24)}
      </CardContent>
      <CardFooter>
        <p className="text-xs">{formatTimestamp(createdAt)}</p>
      </CardFooter>
    </Card>
  )
}
