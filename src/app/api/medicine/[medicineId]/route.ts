import dbConnect from "@/lib/db";
import { medicineModel } from "@/model/medicine.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// update method 

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const { id } = params;

  if (!new mongoose.Schema.ObjectId(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const data = await request.json();
    const updatedMedicine = await medicineModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedMedicine) {
      return NextResponse.json(
        { error: "Medicine not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedMedicine, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update medicine" },
      { status: 500 }
    );
  }
}
// Delete method
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const { id } = params;

  if (! new mongoose.Schema.ObjectId(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const deletedMedicine = await medicineModel.findByIdAndDelete(id);
    if (!deletedMedicine) {
      return NextResponse.json(
        { error: "Medicine not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Medicine deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete medicine" },
      { status: 500 }
    );
  }
}
