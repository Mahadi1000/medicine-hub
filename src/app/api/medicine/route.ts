import dbConnect from "@/lib/db";
import { medicineModel } from "@/model/medicine.model";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
 
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  try { 
   const data = await req.json();
   const newMedicine = new medicineModel(data);
   await newMedicine.save();
   return NextResponse.json(newMedicine, { status: 201 });
  } catch (error) {
    console.log("[Sign up error]", error);
    NextResponse.json({ error: "Internal server error." });
  }
}
