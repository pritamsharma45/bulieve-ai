'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Take {
  title: string;
  user: string;
  likes: number;
  comments: number;
  description: string;
}

const ExpandableRow = ({ take }: { take: Take }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <TableRow 
        className="cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <TableCell className="font-medium">
          <div className="flex items-center space-x-2">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span>{take.title}</span>
          </div>
        </TableCell>
        <TableCell>{take.user}</TableCell>
        <TableCell>{take.likes}</TableCell>
        <TableCell>{take.comments}</TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell colSpan={4} className="bg-gray-50">
            <div className="p-4">
              <p className="text-gray-700 leading-relaxed">{take.description}</p>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  Like
                </Button>
                <Button variant="outline" size="sm">
                  Comment
                </Button>
                <Button variant="outline" size="sm">
                  Share
                </Button>
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export function ExpandableTable({ data }: { data: Take[] }) {
  return (
    <Table>
      <TableCaption>All the HOT Takes Today!</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Title</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Likes</TableHead>
          <TableHead>Comments</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((take, index) => (
          <ExpandableRow key={index} take={take} />
        ))}
      </TableBody>
    </Table>
  );
}
