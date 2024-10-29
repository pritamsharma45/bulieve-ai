
import prisma from "../../lib/db";

import { unstable_noStore as noStore } from "next/cache";

async function getData(searchParam: string) {
  noStore();

}

export default function News({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4 mb-10">
News
    </div>
  );
}

