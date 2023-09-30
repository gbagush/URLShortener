import connectMongoDB from "../../../../libs/mongodb";
import Url from "../../../../models/Url";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { unique } = params;

  try {
    await connectMongoDB();
    const url = await Url.findOne({ unique: unique });
    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed get details" },
      { status: 500 }
    );
  }
}
