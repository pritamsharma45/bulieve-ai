'use client';

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CarouselItem {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export function NewsCarousel({ items }: { items: CarouselItem[] }) {
  return (
    <Carousel className="w-full max-w-2xl">
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <Card className="border-0 shadow-md">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                    {item.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
