"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StarFilledIcon } from "@radix-ui/react-icons"
import { Journal } from "@/data/types";
import { formatTimestamp, truncateString } from "@/lib/utils";
import Link from "next/link";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { createJournal, deleteJournal, toggleFavorite } from "@/services/journals";

export default function JournalCard({ id, title, content, updatedAt, isFavorite }: Journal) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Link href={`/journals/${id}`}>
          <Card key={title} className="h-40 cursor-pointer">
            <CardHeader>
              <CardTitle className="text-xl flex items-center justify-between">
                {truncateString(title, 18)}
                {isFavorite && <StarFilledIcon />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {truncateString(content, 24)}
            </CardContent>
            <CardFooter>
              <p className="text-xs">{formatTimestamp(updatedAt)}</p>
            </CardFooter>
          </Card>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => toggleFavorite(id, !!isFavorite)}>
          {isFavorite ? "Unfavorite" : "Make as favorite"}
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => createJournal({ title, content })}>Duplicate</ContextMenuItem>
        <ContextMenuItem onSelect={() => deleteJournal(id)}>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
