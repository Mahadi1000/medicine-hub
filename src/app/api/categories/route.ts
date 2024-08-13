import dbConnect from "@/lib/db";
import CategoryModel from "@/model/category.model";

import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { name, icon } = await req.json();
    console.log(name, icon);
    const category = await CategoryModel.create({ name, icon });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[Category ]", error);
    NextResponse.json({ error: "Internal server error." });
  }
}
export async function GET(req: Request) {
  await dbConnect();

  try {
     const categories = await CategoryModel.find({});
     console.log(categories)
     NextResponse.json({ success: true, data: categories });
    return NextResponse.json(categories);
  } catch (error) {
    console.log("[Category ]", error);
    NextResponse.json({ error: "Internal server error." });
  }
}

